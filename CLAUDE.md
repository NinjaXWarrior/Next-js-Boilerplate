# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Repository structure

This is a bun + Turborepo monorepo — a trimmed, frontend-only branch of the Next.js Boilerplate (no auth, database, or i18n; see the `main` branch for the full SaaS boilerplate).

- `apps/web` (workspace `web`) — the Next.js 16 App Router application.
- `packages/ui` (workspace `@repo/ui`) — shared base-component library (`Button`, `Input`, `Card`, `Badge`, plus Radix-based `Dialog`, `DropdownMenu`, `Select`, `Tabs`, `Tooltip`, `Accordion`), meant to be reusable across projects. Consumed by `apps/web` via the `workspace:*` protocol and Next's `transpilePackages`; it ships as raw TypeScript with no build step.

## Commands

Run from the repo root; Turborepo fans each one out to both workspaces:
- `bun install` — install/link workspaces
- `bun run dev` — `apps/web` dev server
- `bun run build` — production build
- `bun run lint` / `bun run lint:fix` — oxlint + oxfmt via ultracite, type-aware
- `bun run check:types` — `tsc --noEmit` in each workspace
- `bun run check:deps` — knip, repo-wide
- `bun run test` — vitest (`apps/web` only; `packages/ui` has no test script)
- `bun run storybook` / `bun run build-storybook` — Storybook for `packages/ui` (port 6006)

Scope a command to one workspace with `--filter`, e.g. `bunx turbo run lint --filter=@repo/ui`, or `cd apps/web` / `cd packages/ui` and run the workspace's own script directly. Single test file: `cd apps/web && bunx vitest run path/to/file.test.ts`.

Lint/format/dep tooling (`ultracite`, `oxlint`, `oxfmt`, `knip`, `typescript`, `lefthook`, `commitlint`) are root-only devDependencies, shared across workspaces via bun's hoisting — don't add them to a workspace's own `package.json`.

## Architecture

**`apps/web`**
- Standard App Router layout under `src/app`. `src/components` holds app-specific, non-reusable pieces (e.g. `LocalCounter`, `Sponsors`) — generic/reusable UI belongs in `packages/ui` instead.
- `src/styles/global.css` is the Tailwind v4 entry point and includes `@source '../../../../packages/ui/src'`. This is required: Tailwind v4's automatic class scanning only covers the app's own directory, so without it, utility classes used only inside `packages/ui` components would never be generated into the app's CSS.
- `next.config.ts` sets `transpilePackages: ['@repo/ui']` so Next compiles the workspace package's TS source directly.

**`packages/ui` (`@repo/ui`)**
- Flat file-per-component under `src/` (`Button.tsx`, `Input.tsx`, etc.), each with a co-located `*.stories.tsx` — no per-component subfolders.
- `package.json` `main`/`types` point straight at `src/index.ts` (the barrel export); there is no `dist`/build output to keep in sync.
- Ships its own Tailwind/PostCSS setup and `.storybook/` config so Storybook runs fully standalone, independent of `apps/web`.
- `src/utils/cn.ts` combines `clsx` + `tailwind-merge` (needed so `className` overrides on Radix-based components resolve conflicting utilities correctly).
- `Dialog`, `DropdownMenu`, `Select`, `Tabs`, `Tooltip`, `Accordion` wrap `@radix-ui/react-*` primitives for accessible behavior (focus trap, positioning, portals); styled with the same hardcoded slate palette as `Button`/`Card`/`Input`/`Badge`, not a CSS-variable theme. They don't use `class-variance-authority` — none of them need variant styling beyond what plain conditional classes already cover.

**Shared config**
- `tsconfig.base.json` holds the strict compiler options shared by both workspaces; each workspace's own `tsconfig.json` extends it and adds its own `paths`/`jsx`/`include`.
- `turbo.json` defines the task pipeline (`build`, `dev`, `lint`, `check:types`, `test`, `storybook`, `build-storybook`, `clean`).
- `oxfmt.config.ts` (root) hardcodes `sortTailwindcss.stylesheet` to `apps/web/src/styles/global.css` — if a workspace's stylesheet path ever moves, update it there or Tailwind class sorting breaks with a confusing ENOENT.
