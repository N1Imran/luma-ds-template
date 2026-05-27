# LumaUI

A production-ready React design system template. Fork it, edit the tokens, and ship your brand — or use it as-is for B2B SaaS, developer tools, and data-dense interfaces.

**Stack:** React · TypeScript · Radix UI · shadcn/ui · Tailwind CSS v4 · OKLCH color science · Storybook + Chromatic · Figma Code Connect

---

## What makes this different

Most design system templates give you components. LumaUI gives you components *and* an AI workflow layer.

The repo ships two specification files:

- **`DESIGN.md`** — the complete design specification. Every color, surface, spacing value, typography scale, component token, and usage rule, written as structured YAML with human-readable rationale. It's the single source of truth for what Luma looks like and why.
- **`CLAUDE.md`** — the AI brand constitution. Claude Code reads this automatically at the start of every session. It instructs any AI tool to build strictly from tokens, never hardcode values, use Radix primitives for interactive elements, and maintain the three-layer architecture. The YAML front matter in CLAUDE.md is specifically structured for AI-tool interoperability (Cursor, Stitch, and similar tools that parse specs without reading CSS).

Together, these two files mean a developer can open a new Claude Code session and say *"add a data table component"* — and get back a component that already uses the right tokens, the right Radix primitive, the correct dark-mode behaviour, and no hardcoded values. No back-and-forth. No style corrections.

---

## Token architecture

LumaUI uses a strict three-layer token model:

```
Primitive layer    --luma-brand-600, --luma-neutral-50
        ↓
Semantic layer     --primary, --background, --border, --muted
        ↓
Component layer    --button-primary-bg, --card-radius, --input-height
```

**Primitive layer** — raw OKLCH-derived color scales. Never referenced directly in components. The source of perceptual uniformity across the palette.

**Semantic layer** — the values components actually use. When you flip to dark mode, only this layer changes — in a single `.dark {}` block in `src/tokens/color.css`. Zero per-component dark mode overrides, ever.

**Component layer** — per-component token slots that alias to semantic values. This is what makes rebranding possible without touching component code: swap `--button-primary-bg` from `var(--primary)` to `var(--success)` and the button turns green everywhere, correctly, without a search-and-replace.

---

## Color system

The palette is rooted in a single electric blue accent (hue 254 in OKLCH) — used exclusively for primary CTAs, focus rings, and selected states. Never decoratively.

Neutral surfaces use a cool-tinted grey (hue 250) that harmonises with the blue, keeping muted backgrounds from reading as warm or flat.

Dark mode uses an OKLCH-derived neutral ladder with **two extra stops** (`--luma-neutral-750`, `--luma-neutral-850`) at the dark end of the scale. This gives five perceptually distinct surface levels — page, sidebar, card, popover, active — so layered UI stays readable without relying on shadow alone. The same pattern used by Linear, Vercel, and Notion.

```
Light                          Dark
canvas      #ffffff            #0f1115   page bg
surface-1   #f9f9fb            #16191c   sidebars, recessed
surface-2   #f2f2f5            #1e2226   cards, elements
hover       #e8e8ed            #282c30   popovers, hover
active      #d5d5dc            #32373b   pressed, selected
```

---

## Typography

Set in **Geist** (Inter fallback) at a product-software cadence:

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Display | 40px | 700 | −0.05em |
| Heading | 32px | 700 | −0.025em |
| Title | 24px | 600 | −0.025em |
| Body | 16px | 400 | 0 |
| Body SM | 14px | 400/500 | 0 |
| Eyebrow | 12px | 500 | +0.08em uppercase |
| Mono | 13px | 400 | 0 |

`body-sm-strong` (14px/500) is the default for component labels — Button, Badge, Input. `body-sm` (14px/400) is for data content — table cells, timestamps, descriptions.

---

## Component density

Controls sit at the **Linear end of the density spectrum**:

- Default control height: 36px
- Default radius: 6px (`--rounded-md`)
- Internal padding: 12–16px
- Card radius: 12px (`--rounded-xl`)
- Minimum touch target: 44×44px

---

## Customizing LumaUI for your project

1. **Fork the repo**
2. **Edit `DESIGN.md`** — change the color values, typography scale, spacing, radius, or component tokens in the YAML front matter to match your brand
3. **Run `pnpm tokens:gen-components`** — regenerates `src/tokens/components.generated.css` from the updated YAML
4. **Open Claude Code** — it reads `CLAUDE.md` automatically and will build new components using your updated tokens from the first message

The YAML in `DESIGN.md` is structured so that any AI tool that reads the file can understand the full token system — hex values are included alongside OKLCH definitions for tools that don't parse raw CSS. You don't need to prompt the AI about your color system; it's already in the file.

---

## What's included

| Category | Contents |
|---|---|
| **Tokens** | Color (OKLCH primitives + semantic aliases), typography, spacing, radius, shadow, motion, z-index |
| **Foundations** | Dark mode surface ladder, focus ring spec, reduced-motion handling, responsive grid |
| **Components** | Button (6 variants + all states), Input, Checkbox, Radio, Select, Combobox, Card, Badge, Alert, Toast, Dialog, Dropdown, Tooltip, Popover, Tabs, Skeleton, Spinner, StatusDot, Kbd, EmptyState, Note, CodeBlock, DataTable, Sidebar |
| **Storybook** | Deployed to Chromatic — all components documented with variants, states, and usage notes |
| **Figma** | Code Connect mappings — real import code surfaces in Dev Mode for every component |
| **CI** | Chromatic visual regression on every PR |

---

## File locations

| What | Where |
|---|---|
| Token CSS vars | `src/tokens/*.css` |
| Tailwind wiring | `src/styles/globals.css` |
| UI components | `src/components/ui/` |
| Figma Code Connect | `src/components/ui/*.figma.tsx` |
| Storybook stories | `src/stories/` |
| CI workflow | `.github/workflows/chromatic.yml` |

---

## Design principles

**One accent, used with intention.** The electric blue touches primary CTAs, focus rings, active states, and selected rows. That's it. No decorative blue.

**Dark mode is architectural, not cosmetic.** Semantic tokens swap in a single `.dark {}` block. Components are never aware of dark mode — they just use `--primary` and `--background`, and those values change underneath.

**Every decision is already made.** 36px controls, 6px radius, a single accent that never appears decoratively. Luma doesn't ask you to configure your way to a good UI — it ships with opinions baked in, so you spend your time building product, not resolving design questions.

**AI-first authoring.** `CLAUDE.md` exists so that any team member can generate new components using Claude Code and get output that is already correct — right tokens, right primitives, right dark-mode behavior. No cleanup required.

---

## Quick start

```bash
git clone https://github.com/N1Imran/luma-ds-template
cd luma-ds-template
pnpm install
pnpm dev          # dev server
pnpm storybook    # component explorer
```

---

## About

LumaUI was designed and built by [Imran](https://yourportfolio.com) — a Senior Product Designer with a focus on design systems, B2B SaaS, and AI-assisted workflows. The `CLAUDE.md` + `DESIGN.md` pairing came out of real production work: using a structured brand constitution as the AI context layer so that generated components are correct by default, not by iteration.

The goal was to build a system that a small team could adopt and maintain with confidence — and that a solo developer could onboard into in under an hour using Claude Code.
