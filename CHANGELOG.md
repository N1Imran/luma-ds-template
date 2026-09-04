# Changelog

All notable changes to the Luma specification. Versions follow the `version` field
in `DESIGN.md`, which `tokens.json` and `registry.json` mirror.

## [1.4.0] / 2026-09-04

The theme of this release is that the spec now proves its own claims. Every number
it publishes about itself (contrast ratios, OKLCH coordinates, component counts,
version strings) is computed and asserted by a check rather than written by hand.
Three of those claims turned out to be wrong, including two real accessibility
failures.

### Fixed: accessibility

- **`--success` darkened from `#169a45` to `#008935`.** White labels on the solid
  success fill were at **3.66:1**, below the 4.5:1 the spec claims for AA. Now 4.54:1.
  Hue and chroma are preserved; only lightness moved.
- **`--info` darkened from `#3b7ef4` to `#2f71e6`.** Same failure at **3.83:1**.
  Now 4.54:1.
- **Documented the `--ink-subtle` surface ceiling.** It clears AA on `--canvas`
  (4.81:1) and `--surface-1` (4.57:1) and fails everywhere darker (4.31:1 on
  `--surface-2`). This was never stated, and the token's own description invited
  exactly the unsafe usage. Now stated, and asserted by a check.

### Fixed: claims that did not match the values

- **Every published contrast ratio was wrong.** The three hand-written numbers in
  the accessibility section (`~2.3:1`, `~8.5:1`, `~5.3:1`) computed to 1.94, 9.74
  and 5.79. Replaced with a generated table covering 34 asserted pairs.
- **Every OKLCH coordinate in the primary scale was wrong.** Not one of the eleven
  rows matched the hex beside it; the dark end was furthest off (step 950 claimed
  `L=0.16`, measures `L=0.229`). The scale is now published with coordinates
  measured from the shipped hex, and the direction of truth is stated explicitly:
  hex is canonical, OKLCH is derived.
- **Every stated hue was wrong.** Primary was published as 254 and measures 258;
  info was published as 240 and measures **261**. Corrected across `DESIGN.md`,
  `CLAUDE.md` and `tokens.json`.
- **The dark-mode ladder contradicted itself.** The prose in `DESIGN.md` documented
  a flat-grey ladder (`#0a0a0a`, `#101010`, `#181818`, `#202020`) while the YAML
  front matter, `CLAUDE.md` and Figma all used the cool-tinted OKLCH neutral ladder
  (`#0f1115` → `#32373b`). An agent reading the prose built the wrong dark mode.
  The prose now matches the canonical ladder in all three places it appeared.
- **The dark-mode surface table in `CLAUDE.md` published luminance figures**
  (`~7%`, `~10%`, …) that matched neither WCAG luminance nor OKLCH lightness.
  Replaced with the real OKLCH L values.
- **Component counts disagreed across four files.** The repo simultaneously claimed
  45 (`README.md`, `llms.txt`, `DESIGN.md`), 52 (`registry.json`) and 56 (elsewhere).
  The real specification count is **52**, and it is now asserted.
- **`--primary-pressed` and `--primary-subtle` disagreed with the primary scale
  table** (`#004fb8` vs `#004db8`, `#eef2ff` vs `#f0f4ff`). Reconciled to the
  front-matter values, which are what ships.

### Added

- **Dark-mode ink scale**: `--ink-dark`, `--ink-body-dark`, `--ink-muted-dark`,
  `--ink-subtle-dark`, `--ink-disabled-dark`. Dark text colors were previously only
  described in prose, and two of them as approximations (`~#8888a0`). Each stop is
  solved to match its light-mode counterpart's contrast ratio against the canvas.
- **Dark-mode hairlines**: `--hairline-dark`, `--hairline-dark-strong`,
  `--hairline-dark-subtle` as translucent white, matching the rule `CLAUDE.md`
  already stated but never tokenised.
- **11 component specs** that `registry.json` listed but `DESIGN.md` never
  specified: `IconButton`, `Toggle`, `ScrollArea`, `Collapsible`, `Text`, `Label`,
  `Container`, `Stack`, `Inline`, `Grid`, `Icon`. `ScrollArea` and `Collapsible`
  had appeared in no Markdown file at all. Coverage is now 52/52.
- **`scripts/check-contrast.mjs`**: computes WCAG ratios from the real hex values,
  asserts 34 pairs, reports exempt pairs and documented deviations, and enforces the
  two surface ceilings. `--table` regenerates the table in `DESIGN.md`.
- **`scripts/check-oklch.mjs`**: recomputes every published OKLCH coordinate from
  its hex and asserts the hue map against the shipped values. Skips hue assertions
  below the chroma floor, where sRGB quantization makes measured hue meaningless.
- **`scripts/check.mjs`**: runs all three checks.
- **`CHANGELOG.md`**: this file.

### Changed

- `scripts/check-tokens.mjs` now also asserts that every `registry.json` component
  has a spec entry in `DESIGN.md`, that the prose component counts match the real
  count, and that the version agrees across all three files. Each of those three
  checks was added because that exact thing had already drifted.
- Borders are now recorded as a **documented deviation** rather than an implied
  pass. `--hairline` is 1.22:1 against the canvas and does not meet WCAG 1.4.11.
  The check reports it on every run instead of asserting a threshold it was never
  designed to meet.
- The accessibility section no longer promises AAA. AA is the floor and the only
  guarantee; AAA is noted where it happens to be reached.

## [1.3.0] / 2026-06-23

- Added the machine-readable layer: `tokens.json` (W3C DTCG), `registry.json`
  (52-component manifest), `llms.txt`, `MACHINE-READABLE.md`, and
  `scripts/check-tokens.mjs`.
- Completed component documentation for production AI use: decision tables for
  overlapping components, full state coverage, navigation map.
- Repositioned as a portfolio specification: CC BY-NC-ND 4.0, `AGENTS.md`,
  DESIGN.md ↔ CLAUDE.md token sync rule.
