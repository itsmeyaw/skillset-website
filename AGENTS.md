## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Product.md

Always read PRODUCT.md when designing.

## Development

Load the skills for implementation and design:

- `animation-vocabulary`
- `design-taste-frontend`
- `interaction-design`
- `animate`
- `better-layout`
- `better-interface`
- `better-writing`
- `better-typography`

After implementation, review using subagent (sonnet-5.5 or terra-6.1) with the skills:

- `animation-performance`
- `review-animation`
- `unslop`

Development note:

- Always use Tailwind CSS for styling
- Always use `motion` library for animation instead of Tailwind CSS

## Deployment

Use CI/CD pipeline for automated deployment to Cloudflare Worker static page.
Domain is `use-skillset.dev`.

## Documentation

Full documentation: <https://docs.astro.build>

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
