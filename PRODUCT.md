# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro with Tailwind CSS.

## Users

Developers and AI-agent users who install agent skills (Claude Code, Codex, Cursor and other agents) and are tired of re-installing the same skills by hand in every project. They arrive to understand what Skillset is and to install it.

## Product Purpose

This is the marketing site for Skillset (`@itsmeyaw/skillset`, MIT, by itsmeyaw), a CLI that curates agent skills into a pinned, shareable list and installs that list into any project in one step. It exists to cut the manual work of installing skills from many sources into every project. Success is a visitor who gets the idea quickly and runs the install or get-started command.

## Positioning

Skillset wraps Vercel's Skills CLI (skills.sh). Skills land in the same agent directories and the same `skills-lock.json` that `npx skills` uses. On top of that it adds a named or committed list (a "Skillset") of skills, mixed from several sources and pinned to exact Git commits, so one install reproduces exactly what you reviewed.

## Operating Context

- Installed with `npm install -g @itsmeyaw/skillset`, or run with `npx @itsmeyaw/skillset`. Needs Node.js 22.20+ and Git.
- Core flow: `skillset add --set my-set` builds a list, then `skillset install my-set` installs it in any project. `skillset update` moves pins to the latest commits.
- A Skillset is a JSON file: either a named User Skillset kept in the home directory, or `./skillset.json` committed so a team shares it. `install` also accepts an HTTPS URL.
- Commands: `add`, `remove`, `update`, `list`, `install`.
- Source of truth for facts and terminology: the sibling repo `../skillpacker` (README.md, GLOSSARY.md, docs/).

## Capabilities and Constraints

- Pinned to commits; `install` only adds skills and never removes ones that aren't in the Skillset.
- Sources: `owner/repo`, `#branch`, `@tag` or `@sha`, GitHub tree URLs, other Git URLs. Local paths can't be pinned.
- Installs for Universal agents (`.agents/skills`), Claude Code, and any detected agent by default, or for any agent the user picks. Scope is project or global. Install mode is symlink or copy.
- Interactive prompts by default; `-y` for scripted use.
- Terminology to keep consistent: Skillset, Entry, Source, Pin, User Skillset, Project Skillset (see GLOSSARY.md).

## Brand Commitments

- Name: Skillset.
- Logo: the SVG banner at `../skillpacker/assets/skillset.svg`. The user says it is subject to change, so don't treat it as final or build the visual identity around it.

## Evidence on Hand

- A real CLI (v0.3.0) on npm, a README, a terminal demo GIF (`assets/demo.gif` in the skillpacker repo) and docs.
- No testimonials, customer logos, usage stats or benchmarks are confirmed. Don't invent any. GitHub or npm numbers may be shown only if read from the real source.

## Product Principles

- Show the product honestly: real commands and real output, not mock-ups of features that don't exist.
- Reproducibility is the claim: one list, pinned commits, every project.
- Get the visitor to a working install in the fewest steps. The install command is the primary action.
- Respect the skills ecosystem: Skillset builds on Vercel's Skills CLI and says so.

## Accessibility & Inclusion

No product-specific standard established. Code blocks and install commands must be keyboard-reachable and easy to copy.
