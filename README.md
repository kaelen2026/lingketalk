# Lingke Talk

Monorepo for [lingketalk.com](https://lingketalk.com) — 灵客关于科技、AI 与人的独立观察。

Turborepo + pnpm workspace, deployed to Vercel.

## Prerequisites

- Node.js `>=24.0.0`
- pnpm `10.33.1` (pinned via `packageManager`; run `corepack enable` to get it)

## Quick Start

```bash
pnpm install
pnpm dev
```

## Layout

```
apps/
  www/                     Next.js 16 App Router site (the deployed app)
packages/
  eslint-config/           Shared flat ESLint config (base + next presets)
  typescript-config/       Shared tsconfig bases (base + nextjs)
```

Workspace members reference the shared packages with `workspace:*`, so they
resolve from source with no build or publish step.

## Commands

Every command runs from the repo root and fans out through Turborepo.

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `pnpm dev`          | Start the dev server (`next dev`)                        |
| `pnpm build`        | Production build of every app                            |
| `pnpm start`        | Serve the production build (builds first)                |
| `pnpm lint`         | Biome check across the repo, then ESLint per package     |
| `pnpm lint:fix`     | Apply Biome's safe fixes                                 |
| `pnpm format`       | Format the repo with Biome                               |
| `pnpm check-types`  | `tsc --noEmit` per package                               |
| `pnpm test`         | Build, then run each package's tests                     |

To target a single package, use pnpm's filter — `pnpm --filter @lingketalk/www dev`.

## Dependency versions

Versions shared by more than one package live in the `catalog:` block of
`pnpm-workspace.yaml`. Members declare `"react": "catalog:"` rather than a
literal version, so a bump lands everywhere at once. Package-specific
dependencies stay pinned in that package's `package.json`.

## Linting split

Two linters, non-overlapping on purpose:

- **Biome** owns formatting and language-agnostic lint rules. It runs once from
  the repo root over every file, so it sits outside the Turborepo `lint` task.
- **ESLint** owns the Next.js and React rules via `eslint-config-next`, scoped
  to `apps/www`. Biome's `next`/`react` domains are switched off so findings are
  not reported twice.

`husky` + `lint-staged` run both over staged files pre-commit, and `commitlint`
enforces Conventional Commits on the message.

## Deploying to Vercel

Import the repo and set **Root Directory** to `apps/www`. Vercel detects the
pnpm workspace and Turborepo automatically; the framework preset, build command,
and output directory need no overrides.

Leave "Include files outside the root directory" enabled so the shared
`packages/*` configs are available at install time.
