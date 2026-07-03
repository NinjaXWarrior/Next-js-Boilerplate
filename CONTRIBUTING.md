# Contributing

A working guide to the bun + Turborepo monorepo: what's installed and where, how to build a component, the day-to-day contribution loop, testing in Storybook, and using `@repo/ui` outside this repo.

For code style/conventions (props shape, JSDoc, commit format, i18n, etc.) see [AGENTS.md](./AGENTS.md) — this file is about the monorepo mechanics, not code style.

## Repository layout

```
apps/
  web/          Next.js 16 App Router app (workspace "web")
packages/
  ui/           Shared base-component library (workspace "@repo/ui")
```

`apps/web` depends on `packages/ui` via `workspace:*` and Next's `transpilePackages`, so `@repo/ui` ships as raw `.tsx` with no build step — Next compiles it directly.

## What's installed, and where

Dependencies live where they're used. Shared lint/format/git tooling stays root-only and reaches every workspace through bun's hoisting — don't re-add it to a workspace's own `package.json`.

**Root** (`package.json`) — cross-cutting dev tooling only, no app code:

| Package | Purpose |
| --- | --- |
| `turbo` | Task runner — caches and parallelizes `dev`/`build`/`lint`/`test`/`storybook` across workspaces |
| `oxlint` + `oxlint-tsgolint` | Linter (type-aware via tsgolint) |
| `oxfmt` | Formatter, including Tailwind class sorting |
| `ultracite` | Bundles opinionated oxlint/oxfmt presets — `ultracite check`/`fix` is what the scripts call |
| `typescript` | Compiler, one shared version across workspaces |
| `lefthook` | Git hooks — runs ultracite on staged files pre-commit |
| `@commitlint/*` | Enforces Conventional Commits on commit-msg |

**`apps/web`** (`web`) — the Next.js app, everything a browser actually ships:

| Package | Purpose |
| --- | --- |
| `next`, `react`, `react-dom` | Next.js 16, React 19 |
| `@repo/ui` | `workspace:*` — the shared components |
| `lucide-react` | Icons |
| `tailwindcss` + `@tailwindcss/postcss` | Styling |
| `vitest` + friends | Unit tests (no `*.test.ts` files exist yet) |

**`packages/ui`** (`@repo/ui`) — framework-agnostic base components, no Next.js imports allowed in here:

| Package | Purpose |
| --- | --- |
| `react`, `react-dom` | Peer dependencies, not bundled |
| `storybook` + `@storybook/nextjs-vite` | Isolated dev/preview |
| `@storybook/addon-a11y` / `addon-docs` / `addon-vitest` | Accessibility checks, autodocs, story-as-test |
| `tailwindcss` + `@tailwindcss/postcss` | Its own copy — runs Storybook fully standalone |

Rule of thumb: if a dependency is only for linting, formatting, or git hooks, it goes in the root. If it's rendered or bundled, it goes in the workspace that renders it.

## Building a new component

Four components exist today — `Button`, `Input`, `Card`, `Badge` — all flat files in `packages/ui/src`, no per-component folders.

**Decide where it belongs first.** Something with no knowledge of routes, data-fetching, or this product's copy → `packages/ui/src`. Anything that imports `next/navigation`, fetches data, or only makes sense on this one homepage → `apps/web/src/components` (where `LocalCounter` and `Sponsors` already live).

1. **Create `packages/ui/src/ComponentName.tsx`.** Named export, single inline-typed `props` param accessed as `props.foo` (no destructuring), no default export. Reuse `cn()` from `./utils/cn` for conditional classes.
2. **Add `ComponentName.stories.tsx` next to it.** CSF3 format — one `Meta`, one story per meaningful variant. This is also the manual test.
3. **Export it from `packages/ui/src/index.ts`.** The barrel is the package's entire public surface — nothing outside `src` should be imported directly by consumers.
4. **Check it.** `bun run storybook` to eyeball it and let addon-a11y flag issues, then `bun run lint` and `bun run check:types` from the root.

Minimal shape to copy from:

```tsx
// packages/ui/src/Example.tsx
import { cn } from './utils/cn';

export const Example = (props: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('rounded-lg p-4', props.className)}>
    {props.children}
  </div>
);
```

## Day-to-day contribution loop

Same loop regardless of which workspace you're touching — Turborepo just decides how wide each command fans out.

| Command | What it does |
| --- | --- |
| `bun install` | Once, from the root — links both workspaces |
| `bun run dev` | Starts `apps/web` |
| `bun run lint` / `lint:fix` | oxlint + oxfmt, type-aware, both workspaces |
| `bun run check:types` | `tsc --noEmit` in both workspaces |
| `bun run check:deps` | knip — unused files/exports/deps, repo-wide |
| `bun run test` | vitest, currently `apps/web` only |
| `bun run build` | Production build, both workspaces |

**Scoping to one workspace** — use whichever reads clearer in the moment:

```sh
# from anywhere, via turbo's filter
bunx turbo run lint --filter=@repo/ui

# or just cd in and run the workspace's own script
cd packages/ui && bun run storybook
```

**Adding a new app or package** — drop a folder with a `package.json` under `apps/` or `packages/`. The root's `"workspaces": ["apps/*", "packages/*"]` glob picks it up automatically on the next `bun install`. No registration step beyond that.

**Before you commit** — Lefthook runs `ultracite fix --type-aware --type-check` on staged files automatically on `pre-commit`, and commitlint checks the message on `commit-msg`. Commit messages follow Conventional Commits: `type: summary`, no scope (see AGENTS.md for the full type list and the rest of the code conventions).

## Testing components in Storybook

Storybook lives entirely inside `packages/ui` and only ever looks at that package — it has no idea `apps/web` exists.

```sh
# dev server, hot reload, port 6006
bun run storybook

# story-as-test: renders every story headlessly through Vitest
cd packages/ui && bun run storybook:test

# static export — what CI/deploys would serve
bun run build-storybook
```

What to look at while it's running:

- **Canvas** — the component alone, no app chrome around it, so you're seeing exactly what a consumer gets.
- **Controls** — every prop from your `Meta`/story args, live-editable, no code changes needed to try a variant.
- **Accessibility tab** — addon-a11y flags issues (missing labels, contrast) as you go; it's set to `test: 'todo'`, so it warns rather than blocking.
- **Docs** — autogenerated from your stories' `args` and prop types, no separate docs file to maintain.

**Why it's isolated:** `packages/ui/.storybook/preview.ts` imports the package's own `src/global.css`, and its `package.json` carries its own Tailwind/PostCSS setup. Nothing from `apps/web` is on the classpath, so if a component only looks right inside the app, that's a real bug — it means the component secretly depends on something the app provides.

## Using these components in another project

Right now `@repo/ui` is `"private": true` with no build step — it ships raw `.tsx` and leans on Next's `transpilePackages` to compile it. That's ideal inside this repo and doesn't travel outside it as-is. Pick based on how far "elsewhere" is:

**Another app in this same monorepo** *(already works)* — add a new folder under `apps/`, add `"@repo/ui": "workspace:*"` to its `package.json`, set `transpilePackages: ['@repo/ui']` in its `next.config.ts` if it's Next, and add the same `@source` line `apps/web` uses so Tailwind scans the package's classes.

**A quick, separate project** *(fastest)* — just copy the files: `Button.tsx`, `Input.tsx`, `Card.tsx`, `Badge.tsx`, `utils/cn.ts`. It's four small components with zero dependencies beyond React and Tailwind — there's no package machinery to fight, and no version to keep in sync.

**Real reuse across several separate repos** *(when it's earned)* — turn it into an actual publishable package. This is more than a rename — do it once you're maintaining the same components in two or more places and feeling the drift:

1. Rename the scope to one you own (`@repo` isn't yours on the public registry) and drop `"private": true`.
2. Add a real build (`tsup` is the common lazy choice) that emits compiled JS + `.d.ts` into `dist/` — external consumers don't get `transpilePackages`, so raw `.tsx` won't resolve for them.
3. `npm publish` (public, or a private registry/GitHub Packages if it shouldn't be public).
4. In the consuming project: install it normally, and point that project's own Tailwind `@source` at `node_modules/<package>` so its utility classes still get generated.
