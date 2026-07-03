# Next.js Boilerplate — Frontend Edition

A trimmed, frontend-only branch of the [Next.js Boilerplate](https://nextjs-boilerplate.com): a bun + Turborepo monorepo for starting a Next.js 16 project fast, with no auth, database, or i18n baked in. If you need the full SaaS stack (auth, database, i18n, monitoring, etc.), see the `main` branch instead.

## Purpose

This branch exists for projects that just need a solid Next.js + Tailwind + TypeScript starting point, plus a shared, reusable UI component library — without pulling in a database, authentication provider, or any of the SaaS-specific scaffolding. It's meant to be cloned and built on directly.

## Repository structure

```
.
├── apps/
│   └── web/          # Next.js 16 App Router application (workspace `web`)
└── packages/
    └── ui/            # Shared component library (workspace `@repo/ui`)
```

- **`apps/web`** — the Next.js app. `src/app` holds routes, `src/components` holds app-specific (non-reusable) components, `src/utils` holds utilities, `src/styles/global.css` is the Tailwind v4 entry point.
- **`packages/ui`** (`@repo/ui`) — a flat, file-per-component library (`Button`, `Input`, `Card`, `Badge`), each with a co-located Storybook story. Ships as raw TypeScript (no build step) and is consumed by `apps/web` via the `workspace:*` protocol and Next's `transpilePackages`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org) in strict mode
- [Tailwind CSS 4](https://tailwindcss.com)
- [Bun](https://bun.sh) workspaces + [Turborepo](https://turborepo.com) for the monorepo
- [Vitest](https://vitest.dev) for unit tests
- [Storybook](https://storybook.js.org) for isolated UI component development (`packages/ui`)
- [Oxlint](https://oxc.rs) + [Oxfmt](https://oxc.rs) via [Ultracite](https://ultracite.dev) for linting/formatting
- [Knip](https://knip.dev) for unused file/dependency detection
- [Lefthook](https://github.com/evilmartians/lefthook) + [Commitlint](https://commitlint.js.org) for git hooks and Conventional Commits

## Requirements

- Node.js 24+
- [Bun](https://bun.sh) 1.3+

## Getting started

```shell
bun install
bun run dev
```

Open http://localhost:3000 to see the app.

## Commands

Run from the repo root — Turborepo fans each one out to both workspaces:

| Command | Description |
| --- | --- |
| `bun run dev` | Start the `apps/web` dev server |
| `bun run build` | Production build |
| `bun run lint` / `bun run lint:fix` | Lint (and auto-fix) with Oxlint/Oxfmt via Ultracite |
| `bun run check:types` | `tsc --noEmit` in each workspace |
| `bun run check:deps` | Unused files/dependencies check with Knip (repo-wide) |
| `bun run test` | Run Vitest (`apps/web` only) |
| `bun run storybook` | Storybook dev server for `packages/ui` (http://localhost:6006) |
| `bun run build-storybook` | Build a static Storybook |

Scope a command to one workspace with `--filter`, e.g. `bunx turbo run lint --filter=@repo/ui`, or run the workspace's own script directly with `cd apps/web` / `cd packages/ui`.

Run a single test file: `cd apps/web && bunx vitest run path/to/file.test.ts`.

## Contributing

Everyone is welcome to contribute. Feel free to open an issue if you have questions or find a bug — suggestions and improvements are welcome.

## License

Licensed under the MIT License. See [LICENSE](LICENSE) for details.
