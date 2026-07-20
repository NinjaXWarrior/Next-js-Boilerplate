# Shipfaster UI v2.7 — design audit

Source: Figma file `Td2LHq45Nz4oniFIALiSWX` (duplicate of `5Cot0NpFUpdMlA1eh33xLb`,
"Shipfaster UI - v2.7"; node IDs are identical across both). Tokens captured
2026-07-18; full component-schema sweep completed 2026-07-19 via a second
Starter-quota account. All variant schemas below are real Figma data; visual
styling for Inline Alert, Sticky Alert, Tabs, and Accordion was verified against
screenshots — other components' visuals are token-consistent extrapolation.
Note: the file's variables collection is empty — all tokens live as Figma *styles*
(380 paint, 106 text, 22 effect). Single theme only (no light/dark modes defined).

## Tokens

### Color (paint styles)

Custom ramps (need CSS variables — not stock Tailwind):

| Token | 50 | 100 | 200 | 300 | 400 | 500 (Main) | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| Primary | #E8F4FF | #D5EAFF | #B4D8FF | #87BDFF | #5795FF | #0234F8 | #0E43FF | #0234F8 | #0832CB | #11339E |

Tailwind-identical ramps (map, don't redefine):

- `Neutral/*` = Tailwind `gray`
- `Success/*` = Tailwind `green`
- `Warning/*` = Tailwind `amber`
- `Destructive/*` = Tailwind `red`
- `Secondary/{Slate,Gray,Zinc,Stone,Teal,Emerald,Lime,Cyan,Sky,Violet,Fuchsia,Pink,Rose}/*` = the same-named stock Tailwind palettes (decorative, not used by components)
- `Generic/White` #FFFFFF, `Generic/Black` #000000

Flags:

- Primary ramp is non-monotonic: 500 = 700 = #0234F8, 600 (#0E43FF) sits between them. Imported as-is.
- `Focus ring/*` effect styles use indigo (#6366F1 / #E0E7FF), which contradicts the Primary ramp. Treated as a file inconsistency; focus rings use `Primary` tokens in code.
- `Gradient/Linear/01–20`, `Gradient/Mesh/*`, `Avatar/*` paint styles are assets, not tokens — skipped.

### Typography (text styles)

All Inter (one stray "Nunito Sans" on `Display/Medium/Large` — file bug, ignored).
Weights: Regular 400 / Medium 500 / Semi Bold 600 / Bold 700 / Extra Bold 800.

| Ramp | size/line-height |
|---|---|
| Display Large / Small | 52/56, 44/48 (ls -2%) |
| H1 Desktop / Mobile | 40/48, 36/44 (ls -2%) |
| H2 / H3 / H4 / H5 | 36/44, 32/40, 28/36, 24/32 (ls -2%) |
| Paragraph Large / Medium / Small / XSmall | 18/28, 16/24, 14/20, 12/20 |
| Label Large / Medium / Small / XSmall | 16/18, 14/16, 12/14, 10/14 |
| Overline Large / Small | 14/20, 12/20 (ls +1px, semibold) |

Paragraph sizes = Tailwind `text-lg/base/sm/xs`. Label sizes differ from Tailwind only in tighter line-heights.

In code: the Label ramp is `text-label-{xs,sm,md,lg}` and the Heading ramp is
`text-h{1..5}` (see `src/theme.css`). Convention: interactive/label text uses
`text-label-*`, body copy uses the stock Paragraph sizes.

### Shadows (effect styles)

| Token | Value |
|---|---|
| Drop shadow/XSmall | 0 1 2 0 #101828/4% (×2) |
| Drop shadow/Small | 0 2 6 0 #101828/6% |
| Drop shadow/Medium | 0 6 15 -2 #101828/8% (×2) |
| Drop shadow/Large | 0 8 24 -3 #101828/10% + /5% |
| Drop shadow/XLarge | 0 20 40 -8 #101828/10% + /5% |
| Drop shadow/XXLarge | 0 25 60 -15 #101828/20% + /12% |

Focus rings: 2px and 4px spreads in `{Primary,Neutral,Success,Warning,Destructive}/100`.
Background blurs: 8 / 16 / 24 / 40 / 80 — near but not equal to Tailwind's backdrop-blur scale; only needed if a component uses them (none of ours do).

### Spacing / radius ⚠

Spacing page (`41:7382`) not yet read — every captured measurement so far sits on
Tailwind's 4px grid (button heights 24–64px), so stock Tailwind spacing is assumed.
No radius foundation page exists; radii come per-component (Button shapes
"Rounded"/"Circle", Badge "Pill"/"Rounded"). Exact px values still needed from
component reads.

## Component inventory

### Matches for our 10 existing components

| Ours | Figma page (node ID) | Captured schema |
|---|---|---|
| Button | ❖ Button (`6:20`) | `Button` set `2109:181491` (150: 6 sizes × 5 types × 5 states; variantGroupProperties empty — broken set, infer from Button/Icon). `Button / Icon` set `3768:8494`: Size XXLarge 64 / XLarge 56 / Large 48 / Medium 40 / Small 32 / XSmall 24; Type Filled / Accent / Outlined / Grayscale / Icon; State Default / Hovered / Pressed / Disabled / Focused; Shape Rounded / Circle |
| Input | ❖ Input Field (`6:24`) | `Input Field / Boxed` `2166:184649`, `/ Lined` `4680:12096`, `/ Outlined` `4682:12142` (each: 9 content types × 7 states); `Text Field` `3787:12282` (textarea: Boxed / Lined / Outlined × states × Destructive Yes/No) |
| Badge | ❖ Badge (`83:6566`) | `Badge` set `2179:185908` (540): Shape Pill / Rounded / Circle / Dot; Size Large / Medium / Small; Type Primary / Neutral / Success / Warning / Destructive; Style Filled / Accent / Outlined; State Default / Hover / Disabled |
| Dialog | ❖ Modal (`273:102034`) | ⚠ not read |
| DropdownMenu, Select | ❖ Dropdowns (`5158:756`) | ⚠ not read |
| Tabs | ❖ Tabs (`124:40957`) | ⚠ not read |
| Tooltip | ❖ Tooltip (`6:26`) | ⚠ not read |
| Accordion | ❖ Accordion (`124:40952`) | ⚠ not read |
| Card | — no dedicated page; closest is ❖ Data Display (`124:40960`, ⚠ not read) | keep ours, restyle with tokens |

### Net-new — built, schemas verified against Figma 2026-07-19

| Component | Figma schema (captured) | Implemented |
|---|---|---|
| Avatar (`268:115311`) | Shape Circle/Rounded/Square; sizes 24–96px; Status Online/Offline; Group 2x/4x/8x | `shape`, `size xs–xxxl`, `status`, `AvatarGroup` + `moreCount` |
| Breadcrumb (`124:40953`) | Indicators Chevron/Slash/Arrow/Indicator | `BreadcrumbSeparator indicator` |
| ButtonGroup (`6:21`) | Style Neutral/Primary × sizes | structural wrapper; style via child `Button` variants |
| Chip (`3836:66161`) | Color ×5; Style Filled/Outline; Size ×3; Selected; Show Close | full cva: `color` × `chipStyle` × `size` + `selected` + `onRemove` |
| InlineAlert (`124:40956`) | Style Accent/Outlined/Filled × State Default/Primary/Success/Warning/Destructive | `alertStyle` × `variant` (screenshot-verified) |
| StickyAlert (`131:39613`) | Type +White/Black; Style Accent/Filled; Position Left/Middle | `variant` × `alertStyle` × `align` (screenshot-verified) |
| Loader (`273:102036`) | 5 sizes; 6 spinner types | sizes sm–xxl; Circle type only (others deferred) |
| ProgressBar (`6:27`) | Size ×3; value 0–100 | matches |
| ProgressStep (`212:57577`) | Dot/Number/Icon; Lined/Boxed/Step; H/V; sizes | `indicator dot/number`, `direction`, `size` (Icon type + Boxed/Step styles deferred) |
| Pagination (`124:40955`) | Style Blanked/Filled/Outline; Overflow ellipsis | `paginationStyle` + windowing |
| Stat (`124:40962`) | Size ×3; 4 layout styles | `size`; Simple layout only (others deferred) |
| Title (`124:40961`) | Size ×4; Position Leading/Middle | `size` + `align` |
| Rating (`5158:757`) | half-star steps; Yellow/Neutral; sizes ×3 | halves + `color` + `size` |
| Slider (`5158:755`) | Single/Range; sizes | native range input, Single only (Range deferred) |
| VerificationInput (`5496:63493`) | Boxed/Lined/Floating; sizes ×3; 4/6 digits | `fieldStyle` + `size` + `length` |
| Form Control (`1603:182467`) | Switch, Radio, Checkbox (+shapes, indeterminate) | `Switch`, `Radio`, `Checkbox` (native; indeterminate/shapes deferred) |

Existing components updated from verified schemas: Tabs (`tabStyle` ×6 + `size` ×3,
screenshot-verified), Tooltip (`variant` neutral/primary/white), Accordion
(`accordionStyle` outlined/filled/rounded, screenshot-verified). Modal and
Dropdowns schemas are content templates — the Radix `Dialog`/`DropdownMenu`/
`Select` structure already covers them.

### Charts — built 2026-07-19 (recharts, screenshot-verified)

`Chart.tsx` wraps recharts: `LineChart` (straight/curved, multi-series),
`BarChart` (vertical/horizontal, negative values), `PieChart` (pie/donut/half
with center label) — Figma sets `5445:5630`, `5436:15810`, `3978:62253`.
Series colors are the design's monochrome Primary ramp; the first two slots pass
the dataviz palette validator, later (light-tint) slots carry the design's look
with relief always present: legend for 2+ series, tooltips, white pie-cell gaps.

### Still not built (app-pattern-sized builds)

Date Picker (`273:102033`), Time Picker (`3920:13550`), File Upload (`273:102037`),
List Field (`124:40958`), Table (`149:27019`), Sidebar Navigation (`234:52698`),
Video Player (`3918:2501`), Data Display (`124:40960`).
Full schemas for all of these are captured and valid.

Marketing sections (Hero, Pricing, FAQ, …) are page patterns, not components — out of scope for packages/ui.

## Variant mapping (Figma → code)

Figma `State` values (Hovered/Pressed/Focused/Disabled) are CSS pseudo-classes, not cva variants.
Input `Type` values (Password, Credit Card, …) are the HTML `type`/content concern, not variants.

- Button: `variant: filled | accent | outlined | grayscale` × `size: xs | sm | md | lg | xl | xxl` (24–64px)
- Badge: `variant: primary | neutral | success | warning | destructive` × `style: filled | accent | outlined` × `size: sm | md | lg` × `shape: pill | rounded` (Circle/Dot are icon-only/indicator uses)
- Input: `fieldStyle: boxed | lined | outlined`, error state via existing `error` prop
