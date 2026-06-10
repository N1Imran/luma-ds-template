# AGENTS.md — Luma Design System

This repository is an AI-readable design system specification. Two files carry everything you need:

1. **`DESIGN.md`** — the canonical brand spec. Machine-readable tokens in the YAML front matter (colors, typography, spacing, radius, components), human-readable rationale and rules in the prose. If any file disagrees with `DESIGN.md`, `DESIGN.md` wins.
2. **`CLAUDE.md`** — the engineering constitution. Token architecture (primitives → semantic aliases → component tokens), component patterns, dark mode rules, iconography, Figma conventions.

## Rules for building UI with Luma

- Read `DESIGN.md` in full before generating any UI.
- Build only from tokens. Never hardcode hex, px spacing, or radius values; reference the token names from the spec.
- Use semantic tokens, not primitives. `primary`, `background`, `border` in components; never raw scale values.
- Respect the component specs in `DESIGN.md` exactly: heights, padding, radius, and state coverage (default, hover, pressed, focus, disabled).
- Dark mode comes from the semantic alias swap. Do not write per-component dark overrides.
- `destructive` is for irreversible action buttons. `error` is for validation states. They share a red; the intent differs.
- Warning surfaces use dark text, never white. Amber with white text fails WCAG AA.

## License note

This is a portfolio project by Muhammad Imran, licensed CC BY-NC-ND 4.0. You may test and evaluate it. Do not reuse it in products or present derivatives as original work. See `LICENSE`.
