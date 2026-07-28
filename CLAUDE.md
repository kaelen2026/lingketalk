# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**回复前先输出，Wow, lingke**


Setup, commands, layout, and deployment are in `README.md` and
`apps/www/README.md`. Below is only what those don't say.

## 工作流

@.claude/rules/workflow.md

## Styling is not utility-first

`app/globals.css` is a hand-written stylesheet on top of `@import "tailwindcss"`.
JSX uses semantic class names (`className="hero-art"`, `.pillars`,
`.subscribe-inner`) defined in that file. Add styles there; do not reach for
Tailwind utility classes. Colors and the serif stack come from `:root` custom
properties (`--paper`, `--ink`, `--blue`, `--serif`).

## Tests assert server-rendered HTML

`apps/www/tests/` spawns a real `next start`, so `pnpm build` must have run
first. Editing metadata in `layout.tsx` or visible copy in `page.tsx` breaks
tests that look unrelated to the change.

Single test:

```bash
pnpm --filter @lingketalk/www exec node --test \
  --test-name-pattern "pillars" tests/rendered-html.test.mjs
```

## Lint boundaries

React and Next.js rules belong in `packages/eslint-config`, never in Biome —
Biome's `next`/`react` domains are off so findings aren't reported twice. Biome
2.5 uses `rules.preset: "recommended"`, not the deprecated `recommended: true`.
Rules that are switched off carry their reasoning inline in `biome.jsonc`.

Commit messages must be Conventional Commits; `commitlint` rejects the rest.

## Content guardrails

- Copy is Chinese, editorial voice, aimed at Chinese-speaking professionals.
- Invent no follower counts, testimonials, client logos, or publication history.
  Social links stay placeholders until real URLs exist.
- The subscribe form validates locally and says it isn't live yet. There is no
  database; wiring it up means adding a server action or route handler plus a
  store.
- Motion respects `prefers-reduced-motion`; interactive elements need visible
  hover and keyboard-focus states.
