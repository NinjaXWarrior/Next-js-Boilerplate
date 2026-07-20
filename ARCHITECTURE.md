# Architecture

A **bun + Turborepo** monorepo — a trimmed, frontend-only branch of the Next.js
Boilerplate (no auth, database, or i18n; the `main` branch carries the full SaaS
boilerplate).

## Workspaces

| Workspace | Path | Role |
| --- | --- | --- |
| `web` | `apps/web` | The Next.js 16 App Router application. |
| `@repo/ui` | `packages/ui` | Shared base-component library, reusable across projects. |

`apps/web` consumes `@repo/ui` via the `workspace:*` protocol. The package ships
as **raw TypeScript with no build step** — `apps/web` compiles it directly
through Next's `transpilePackages: ['@repo/ui']`.

## Layout

```
.
├── apps/
│   └── web/                      # workspace "web" — Next.js app
│       ├── src/
│       │   ├── app/              # App Router: layout, page, robots, sitemap, global-error
│       │   ├── components/       # app-specific, NON-reusable pieces (LocalCounter, Sponsors, DemoBadge)
│       │   ├── styles/global.css # Tailwind v4 entry point
│       │   └── utils/            # Helpers.ts (+ co-located Helpers.test.ts)
│       ├── public/               # static assets
│       ├── next.config.ts
│       ├── vitest.config.ts
│       └── tsconfig.json
│
├── packages/
│   └── ui/                       # workspace "@repo/ui" — shared components
│       ├── src/
│       │   ├── *.tsx             # flat, file-per-component (Button, Input, Card, Badge, ...)
│       │   ├── *.stories.tsx     # co-located Storybook story per component
│       │   ├── index.ts          # barrel export (package entry)
│       │   └── utils/cn.ts       # clsx + tailwind-merge
│       ├── .storybook/           # standalone Storybook config
│       └── tsconfig.json
│
├── turbo.json                    # task pipeline
├── tsconfig.base.json            # shared strict compiler options
├── oxfmt.config.ts               # formatter (Tailwind class sorting)
├── oxlint.config.ts              # linter rules
├── package.json                  # root scripts + shared devDependencies
└── AGENTS.md / CLAUDE.md         # contributor + agent conventions
```

## `apps/web`

- Standard App Router under `src/app`.
- `src/components` holds **app-specific, non-reusable** pieces only. Anything
  generic or reusable belongs in `packages/ui` instead.
- `src/styles/global.css` is the Tailwind v4 entry and includes
  `@source '../../../../packages/ui/src'`. This is **required**: Tailwind v4's
  automatic class scanning only covers the app's own directory, so without it,
  utility classes used only inside `packages/ui` components would never be
  generated.
- Imports use `@/*` → `./src/*` (see `apps/web/tsconfig.json` paths).

## `packages/ui` (`@repo/ui`)

- Flat, **file-per-component** under `src/` (no per-component subfolders), each
  with a co-located `*.stories.tsx`.
- `package.json` `main`/`types` point straight at `src/index.ts` — no
  `dist`/build output to keep in sync.
- Plain components: `Button`, `Input`, `Card`, `Badge`, `Avatar`, `Breadcrumb`,
  `ButtonGroup`, `Chip`, `InlineAlert`, `StickyAlert`, `Loader`, `ProgressBar`,
  `ProgressStep`, `Pagination`, `Rating`, `Slider` (native range input), `Stat`,
  `Title`, `VerificationInput`, `Checkbox`, `Radio` (native inputs), `Switch`.
  `Chart.tsx` wraps recharts (`LineChart`, `BarChart`, `PieChart`) with the
  token palette. `Dialog`, `DropdownMenu`, `Select`, `Tabs`,
  `Tooltip`, `Accordion` wrap `@radix-ui/react-*` primitives for accessible
  behavior (focus trap, positioning, portals).
- Styled from design tokens imported from the Shipfaster UI Figma file:
  `src/theme.css` defines the ramps (`primary`, `neutral`, `success`, `warning`,
  `destructive`), shadow scale, and font as CSS custom properties, mapped into
  Tailwind utilities via `@theme inline`. Both `packages/ui/src/global.css`
  (Storybook) and `apps/web/src/styles/global.css` import it. See
  `packages/ui/docs/component-inventory.md` for the audit and Figma node map.
- Components with variant/size props (`Button`, `Badge`, `Input`) define them
  with `class-variance-authority`: `const xVariants = cva(base, { variants,
  defaultVariants })`, applied as `cn(xVariants({ ... }), className)`. The
  variant-less components use plain token classes.
- `src/utils/cn.ts` combines `clsx` + `tailwind-merge` so `className` overrides
  on Radix-based components resolve conflicting utilities correctly.
- Ships its own Tailwind/PostCSS setup and `.storybook/` config so Storybook
  runs fully standalone (port 6006), independent of `apps/web`.

## Shared config

- **`tsconfig.base.json`** — strict compiler options shared by both workspaces;
  each workspace's own `tsconfig.json` extends it and adds `paths`/`jsx`/`include`.
- **`turbo.json`** — task pipeline: `build`, `dev`, `start`, `lint`, `lint:fix`,
  `check:types`, `test`, `storybook`, `storybook:test`, `build-storybook`, `clean`.
- **`oxfmt.config.ts`** — hardcodes `sortTailwindcss.stylesheet` to
  `apps/web/src/styles/global.css`. If a workspace's stylesheet path moves,
  update it here or Tailwind class sorting breaks with a confusing ENOENT.
- Lint/format/dep tooling (`ultracite`, `oxlint`, `oxfmt`, `knip`,
  `typescript`, `lefthook`, `commitlint`) are **root-only devDependencies**,
  shared across workspaces via bun's hoisting — don't add them to a workspace's
  own `package.json`.

## Commands

Run from the repo root; Turborepo fans each out to both workspaces.

| Command | Does |
| --- | --- |
| `bun install` | install / link workspaces |
| `bun run dev` | `apps/web` dev server |
| `bun run build` | production build |
| `bun run lint` / `lint:fix` | oxlint + oxfmt via ultracite, type-aware |
| `bun run check:types` | `tsc --noEmit` per workspace |
| `bun run check:deps` | knip, repo-wide |
| `bun run test` | vitest (both workspaces; `packages/ui` unit tests run in jsdom) |
| `bun run storybook` / `build-storybook` | Storybook for `packages/ui` (port 6006) |

Scope to one workspace with `--filter=web` / `--filter=@repo/ui`, or `cd` into
the workspace and run its script directly. Single test file:
`cd apps/web && bunx vitest run path/to/file.test.ts`.

## Tooling

bun 1.3 (package manager) · Turborepo 2 · Next.js 16 · React 19 · Tailwind v4 ·
oxlint + oxfmt (via ultracite) · knip · vitest · Storybook 10 · lefthook +
commitlint (Conventional Commits).
