// Renders dist/og/index.html to dist/og.png in headless Chrome, then removes the page so it isn't deployed.
// Runs after `astro build`. Set CHROME_PATH to use a browser other than the default install.
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

// Async, so this process can still serve the page Chrome is requesting.
const run = promisify(execFile);

const dist = new URL("../dist/", import.meta.url).pathname;
const [width, height] = [1200, 630];
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const chrome =
  process.env.CHROME_PATH ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find(existsSync);
if (!chrome) throw new Error("og: no Chrome found. Set CHROME_PATH.");
if (!existsSync(join(dist, "og/index.html"))) throw new Error("og: run astro build first.");

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = join(dist, path.endsWith("/") ? `${path}index.html` : path);
  try {
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

const shot = join(tmpdir(), `skillset-og-${process.pid}.png`);
try {
  await run(
    chrome,
    [
      "--headless",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=5000",
      `--screenshot=${shot}`,
      // GitHub's Ubuntu runners block Chrome's sandbox; the page is our own build on localhost.
      ...(process.env.CI ? ["--no-sandbox"] : []),
      `http://127.0.0.1:${server.address().port}/og/`,
    ],
    { timeout: 60_000 },
  );
} finally {
  server.close();
}

const image = sharp(shot);
const [meta, { size: raw }] = await Promise.all([image.metadata(), stat(shot)]);
if (meta.width !== width || meta.height !== height) {
  throw new Error(`og: expected ${width}×${height}, got ${meta.width}×${meta.height}.`);
}
// Lossless: full-colour PNG at maximum zlib effort, no palette quantising.
const { size } = await image
  .png({ compressionLevel: 9, palette: false })
  .toFile(join(dist, "og.png"));
await Promise.all([rm(shot), rm(join(dist, "og"), { recursive: true })]);
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
console.log(`og: wrote dist/og.png (${kb(raw)} from Chrome, ${kb(size)} compressed)`);
