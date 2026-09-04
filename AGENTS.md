# AGENTS.md: Luma Design System

This repository is an AI-readable design system specification. These files carry everything you need:

1. **`DESIGN.md`**: the canonical brand spec. Machine-readable tokens in the YAML front matter (colors, typography, spacing, radius, components), human-readable rationale and rules in the prose. If any file disagrees with `DESIGN.md`, `DESIGN.md` wins.
2. **`CLAUDE.md`**: the engineering constitution. Token architecture (primitives → semantic aliases → component tokens), component patterns, dark mode rules, iconography, Figma conventions.
3. **`tokens.json`**: foundation tokens in W3C DTCG format (colors, spacing, radius, typography, motion, elevation). Load these for values.
4. **`registry.json`**: component manifest: variants, sizes, states, token bindings, and rules per component. Load entries on demand for the components you're building.
5. **`llms.txt`**: the index. **`MACHINE-READABLE.md`**: how the layers fit together and the order to read them in.

JSON files (`tokens.json`, `registry.json`) are the source for values and component shapes; Markdown files are the source for rules and rationale. Load rules + foundation always-on; load components on demand.

## Rules for building UI with Luma

- Read `DESIGN.md` in full before generating any UI.
- Build only from tokens. Never hardcode hex, px spacing, or radius values; reference the token names from the spec.
- Use semantic tokens, not primitives. `primary`, `background`, `border` in components; never raw scale values.
- Respect the component specs in `DESIGN.md` exactly: heights, padding, radius, and state coverage (default, hover, pressed, focus, disabled).
- Dark mode comes from the semantic alias swap. Do not write per-component dark overrides.
- `destructive` is for irreversible action buttons. `error` is for validation states. They share a red; the intent differs.
- Warning surfaces use dark text, never white. Amber with white text fails WCAG AA at 1.94:1.
- Never place `ink-subtle` on `surface-2` or darker. It drops to 4.31:1 and fails AA. Use `ink-muted` there.
- Never lighten `success` or `info`. Both sit exactly on the 4.54:1 AA line for white labels.
- If you change a color, run `node scripts/check.mjs`. It asserts contrast, OKLCH and export consistency, and fails on drift.
- After generating any UI, run `node scripts/check-hardcoded.mjs` (also part of `check.mjs`). It fails the build on a hardcoded hex color or a raw px spacing/radius value in the code you just wrote, enforcing the rule stated two bullets up instead of merely stating it.

## License note

This is a portfolio project by Muhammad Imran, licensed CC BY-NC-ND 4.0. You may test and evaluate it. Do not reuse it in products or present derivatives as original work. See `LICENSE`.
