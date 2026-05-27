---
name: Luma Design System
description: Token-driven React design system. Zero hardcoded colours. Automatic dark mode via OKLCH semantic aliases.
colors:
  primary: "#0070f3"
  primary-foreground: "#ffffff"
  secondary: "#f4f4f5"
  secondary-foreground: "#18181b"
  background: "#ffffff"
  foreground: "#0a0a0a"
  card: "#ffffff"
  muted: "#f4f4f5"
  muted-foreground: "#71717a"
  border: "#e4e4e7"
  input: "#e4e4e7"
  destructive: "#ef4444"
  success: "#22c55e"
  warning: "#f59e0b"
  info: "#3b82f6"
typography:
  display:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.05em
  heading:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.025em
  title:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.025em
  subtitle:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.375
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  mono:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    typography: "{typography.body-sm}"
    height: 36px
    padding: 16px
  button-primary-hover:
    backgroundColor: "#0060df"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    typography: "{typography.body-sm}"
    height: 36px
    padding: 16px
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    typography: "{typography.body-sm}"
    height: 36px
    padding: 16px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    height: 36px
    padding: 16px
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    height: 36px
    padding: 16px
  button-warning:
    backgroundColor: "{colors.warning}"
    textColor: "#1a1a1a"
    rounded: "{rounded.md}"
    height: 36px
    padding: 16px
  input-field:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    typography: "{typography.body-sm}"
    height: 36px
    padding: 12px
  input-field-error:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 12px
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.xl}"
    padding: 24px
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    typography: "{typography.caption}"
    padding: 8px
  badge-success:
    backgroundColor: "#dcfce7"
    textColor: "#16a34a"
    rounded: "{rounded.md}"
    typography: "{typography.caption}"
    padding: 8px
---

# CLAUDE.md — Luma Design System

> This file is read automatically by Claude Code and AI tools.
> It is the brand constitution for Luma. Follow all rules here without exception.
>
> Luma is built on **three token layers**:
>
> 1. **Primitive OKLCH scales** (`--luma-brand-600`, `--luma-neutral-50`) — raw colour, never used directly in components
> 2. **Semantic aliases** (`--primary`, `--background`, `--border`) — the values components reference for theming
> 3. **Component tokens** (`--button-primary-bg`, `--card-radius`, `--input-height`) — per-component slots that reference semantic aliases
>
> The YAML front matter above is the **source of truth for the component-token layer** — `pnpm tokens:gen-components` reads it and regenerates `src/tokens/components.generated.css`. The CSS vars in `src/tokens/` are the canonical implementation; the YAML's sRGB hex values exist for AI-tool interoperability (Stitch, Cursor, etc. that parse the spec without reading CSS).

---

## Overview

**Luma** is a clean, minimal, precision-engineered React design system. It targets product teams building B2B SaaS, developer tools, and data-dense interfaces. The aesthetic is "calm confidence" — inspired by Vercel, Linear, and Radix. It should feel fast, trustworthy, and effortless.

The emotional target: a developer or designer picking up Luma should feel like they're working with a tool that has already made all the right decisions for them. Nothing is surprising. Everything is intentional.

**Stack:** React · TypeScript · Radix UI primitives · shadcn/ui patterns · Tailwind CSS v4 · CSS Custom Properties · OKLCH colour science · Storybook + Chromatic · Figma Code Connect.

**Three audiences:**
1. **AI tools (you)** — this file is your guide. Always build from tokens.
2. **Designers** — work in Figma; Code Connect surfaces real import code in Dev Mode.
3. **Developers** — reference Storybook deployed to Chromatic.

---

## Colors

Luma's palette is rooted in Vercel Blue — a high-chroma electric blue at hue 254 in OKLCH space. It is perceptually uniform: every step on the scale appears equally spaced to the human eye, unlike HSL.

- **Primary (electric blue, hue 254):** The Luma signature. Used exclusively for primary CTAs, focus rings, interactive highlights, and brand moments. Never used decoratively.
- **Neutral (cool grey, hue 250):** A blue-undertone grey that harmonises with the brand blue. Used for all surfaces, text, borders, and muted states. The slight blue undertone keeps it from feeling flat.
- **Destructive (red, hue 25):** Danger, delete, irreversible actions only.
- **Success (green, hue 145):** Confirmation, published, positive states.
- **Warning (amber, hue 72):** Caution. Uses a dark foreground (not white) to meet WCAG AA contrast.
- **Info (blue, hue 240):** Informational. Slightly shifted from primary to avoid confusion.

**Dark mode:** Every semantic alias swaps in `.dark {}` in `src/tokens/color.css`. One block. Zero per-component overrides. If you use semantic tokens, dark mode is free.

**Dark mode neutral ladder (OKLCH-derived):** the dark end of the neutral scale has *two extra stops* (`--luma-neutral-750`, `--luma-neutral-850`) for popover and recessed surfaces, because the standard 50→950 spread doesn't give enough perceptual granularity between deep-neutral surfaces. This is the same pattern Linear, Vercel, Notion use.

```css
/* Dark-mode surface ladder — alias to the OKLCH neutral scale */
--background:  var(--luma-neutral-900);  /* oklch(0.178 0.008 250) · page bg          */
--bg-2:        var(--luma-neutral-850);  /* oklch(0.21  0.008 250) · sidebars         */ /* NEW stop */
--card:        var(--luma-neutral-800);  /* oklch(0.25  0.009 250) · cards            */
--popover:     var(--luma-neutral-750);  /* oklch(0.29  0.010 250) · popovers, menus  */ /* NEW stop */
--bg-element-active: var(--luma-neutral-700);  /* pressed / selected                 */
```

**Rule: no raw `oklch()` or hex literals in `.dark {}`.** Every dark-mode surface alias references a neutral primitive. The neutral scale is the single perceptual source of truth — palette tweaks happen in *one place* (the primitive definitions). The same rule applies to Figma: every dark surface variable aliases to a `Neutral/N` primitive — never a standalone sRGB value.

### Surface, border & foreground ladders (Geist/Linear-style)

For UI that needs explicit elevation, hover/active states, or graded text contrast, use these numeric ladders. They sit alongside the shadcn semantic aliases — both reference the same primitives.

```css
/* Surface ladder — page → recessed → card → elevated */
var(--bg-1)              /* page background (= --background) */
var(--bg-2)              /* subtle surface — sidebars, recessed sections */
                         /* (use --card for cards, --popover for menus) */

/* Element backgrounds — chips, hoverable items, toggles */
var(--bg-element)        /* default */
var(--bg-element-hover)  /* hover state */
var(--bg-element-active) /* pressed / selected */

/* Border ladder — three levels of emphasis */
var(--border-subtle)     /* faint dividers, list separators */
var(--border-default)    /* inputs, panels (= --border, --input) */
var(--border-strong)     /* focused state, emphasis */

/* Foreground ladder — four levels of text contrast */
var(--fg-strong)         /* headings, button labels (= --foreground) */
var(--fg-default)        /* body text */
var(--fg-muted)          /* secondary, captions (= --muted-foreground) */
var(--fg-subtle)         /* placeholders, helper text */
var(--fg-disabled)       /* disabled controls */
```

All are available as Tailwind utilities: `bg-1`, `bg-2`, `bg-element`, `bg-element-hover`, `bg-element-active`, `border-subtle`, `border-strong`, `text-fg-strong`, `text-fg-muted`, etc.

```tsx
{/* Sidebar pattern — recessed surface, subtle border, muted text */}
<aside className="bg-2 border-r border-subtle">
  <span className="text-fg-subtle uppercase">Workspace</span>
  <a className="hover:bg-element-hover text-fg-muted">Inbox</a>
  <a className="bg-element text-fg-strong">Selected item</a>
</aside>
```

```css
/* ── Semantic aliases — the only values components use ── */
var(--background)          /* page/surface background */
var(--foreground)          /* default text */
var(--card)                /* card surface */
var(--muted)               /* subtle background */
var(--muted-foreground)    /* secondary/helper text */
var(--border)              /* dividers, outlines */
var(--input)               /* form input borders */
var(--ring)                /* focus ring */
var(--primary)             /* brand CTA — electric blue */
var(--primary-foreground)  /* text on primary bg */
var(--secondary)           /* secondary actions */
var(--accent)              /* hover states */
var(--destructive)         /* irreversible actions — delete buttons, confirm dialogs */
var(--error)               /* validation states — input error rings, error banners, toasts */
var(--success)             /* confirmed / positive */
var(--warning)             /* caution — amber */
var(--info)                /* informational — blue */

/* ── Primary interactive states ── */
var(--primary-hover)       /* lighter — hover bg for primary CTA */
var(--primary-pressed)     /* darker — pressed / active state */
var(--primary-ring)        /* focus halo around primary elements */
var(--primary-disabled)    /* desaturated — disabled primary CTA bg */

/* ── Primary tinted surfaces ── */
var(--primary-subtle)      /* barely tinted — selected rows, active nav bg */
var(--primary-muted)       /* light tint — badges, active item highlights */

/* ── Status semantic tokens (bg / border / solid / text) ── */
var(--luma-success-*)  /* green   — hue 145 */
var(--luma-warning-*)  /* amber   — hue 72  */
var(--luma-error-*)    /* red     — hue 25  */
var(--luma-info-*)     /* blue    — hue 240 */

/* ─────────────────────────────────────────────────────────────────────────────
 * TOKEN USAGE GUIDE — which "red" token to reach for:
 *
 *   --destructive    → irreversible action buttons (Delete, Remove, Revoke)
 *                      and their confirm dialogs. This is a CHOICE the user makes.
 *
 *   --error          → validation UI: input border/ring on bad values, inline
 *                      error messages, error toasts, error banners. This is a
 *                      SYSTEM STATE the user didn't choose.
 *
 *   --luma-error-bg  → tinted background for error banners / alert components
 *   --luma-error-border → border for error-state containers
 *   --luma-error-text   → body copy inside error regions
 *   --luma-error-fg     → text on a solid --luma-error-solid background (white)
 * ───────────────────────────────────────────────────────────────────────────── */

/* ── Primitive scales (decorative / illustrations only — not in components) ── */
var(--luma-brand-50) … var(--luma-brand-950)     /* blue  hue 254 */
var(--luma-neutral-0) … var(--luma-neutral-950)  /* grey  hue 250 — note: -750 and -850 are
                                                    extra dark-end stops for popover and
                                                    recessed surfaces. The scale is dense at
                                                    the dark end because dark UIs need it. */
var(--luma-violet-50) … var(--luma-violet-950)   /* hue 285 */
var(--luma-rose-50)   … var(--luma-rose-950)     /* hue 350 */
var(--luma-amber-50)  … var(--luma-amber-950)    /* hue 72  */
var(--luma-teal-50)   … var(--luma-teal-950)     /* hue 192 */

/* ── Spectrum — 10 curated accent tints, no semantic meaning ── */
var(--luma-spectrum-1) … var(--luma-spectrum-10)

/* ── Chart — 8 perceptually balanced colours ── */
var(--chart-1) … var(--chart-8)
```

---

## Typography

Luma uses **Geist** (sans) and **Geist Mono** for all text. Geist was designed by Vercel for UI — it is neutral, legible at small sizes, and has a slightly technical character that fits developer-tool aesthetics. Mono is used for code, tokens, labels, and anything that benefits from fixed-width rhythm.

Type scale follows a tight hierarchy: Display and Heading use negative letter-spacing for a locked, confident feel. Body text uses relaxed leading for readability. Captions are muted — `--muted-foreground` — never `--foreground`, to maintain visual hierarchy.

### Semantic roles (preferred — use these in components)

10 named roles bundle size + weight + leading + tracking. **Always reach for these before picking sizes by hand.**

| Role | Size · Weight | Use |
|---|---|---|
| `display` | 40px · 700 · tighter | Hero headlines, marketing |
| `heading` | 32px · 700 · tight | Page headings (h1) |
| `title` | 24px · 600 · tight | Section headings (h2) |
| `subtitle` | 20px · 600 | Supporting headings, card titles (h3) |
| `body-lg` | 18px · 500 | Emphasis paragraphs, intro copy |
| `body-md` | 16px · 400 | Default body copy |
| `body-sm` | 14px · 400 | Secondary content — table cells, timestamps, descriptions |
| `body-sm-strong` | 14px · 500 | Component default — Button, Badge, Input labels, nav items |
| `caption` | 12px · 400 | Helper text, metadata |
| `label` | 12px · 500 · widest · uppercase | Section labels, table headers |
| `mono` | 13px · Geist Mono | Code, tokens, fixed-width data |

Three ways to use them — pick the most ergonomic for your context:

```tsx
// 1. React component (most ergonomic)
<Text variant="display" as="h1">Welcome</Text>
<Text variant="body-md" tone="muted">Lorem ipsum…</Text>

// 2. Tailwind utility class
<h1 className="text-display">Welcome</h1>
<p className="text-body-md text-muted-foreground">Lorem ipsum…</p>

// 3. Raw CSS vars (for custom components)
.my-thing {
  font-size:      var(--type-display-size);
  font-weight:    var(--type-display-weight);
  line-height:    var(--type-display-leading);
  letter-spacing: var(--type-display-tracking);
}
```

### Primitive scale (escape hatch — only when roles don't fit)

```css
var(--luma-font-sans)        /* Geist → Inter fallback */
var(--luma-font-mono)        /* Geist Mono → JetBrains Mono fallback */

var(--luma-text-xs)          /* 12px — caption, label */
var(--luma-text-sm)          /* 14px — component default */
var(--luma-text-base)        /* 16px — body */
var(--luma-text-lg)          /* 18px — large body */
var(--luma-text-xl)          /* 20px — subtitle */
var(--luma-text-2xl)         /* 24px — title */
var(--luma-text-3xl)         /* 32px — heading */
var(--luma-text-4xl)         /* 40px — display */
var(--luma-text-5xl)         /* 48px */

var(--luma-weight-regular)   /* 400 */
var(--luma-weight-medium)    /* 500 */
var(--luma-weight-semibold)  /* 600 */
var(--luma-weight-bold)      /* 700 */

var(--luma-leading-tight)    /* 1.25 — headings */
var(--luma-leading-normal)   /* 1.5  — body */
var(--luma-leading-relaxed)  /* 1.625 — long-form */
```

---

## Layout & Spacing

Luma uses a **4px base grid**. All spacing decisions are multiples of 4. The t-shirt scale (xs → 3xl) covers the most common spacings; numeric vars (`--luma-space-1` through `--luma-space-64`) cover everything else.

The visual language is **dense but breathable** — components are compact (36px default height for inputs and buttons, matching Vercel/Linear) but have enough internal padding that they never feel cramped. Page layouts should use generous outer margins; component groups use tight internal spacing.

```css
var(--luma-space-xs)   /* 4px  */
var(--luma-space-sm)   /* 8px  */
var(--luma-space-md)   /* 16px */
var(--luma-space-lg)   /* 24px */
var(--luma-space-xl)   /* 32px */
var(--luma-space-2xl)  /* 48px */
var(--luma-space-3xl)  /* 64px */

/* Numeric: --luma-space-1 (4px) … --luma-space-64 (256px) */
```

---

## Elevation & Depth

Shadows follow a strict elevation ladder. The key insight: **filled buttons have NO shadow** — solid colour is the affordance. Shadows belong on surfaces that need to float above the page.

| Level | Token | Use | Examples |
|---|---|---|---|
| **Flush** | none | Filled, solid components | `<Button>`, `<Badge>`, `<Checkbox>` |
| **Subtle** | `shadow` (xs) | Bordered / outline controls | Outline button, Input, Select, Switch |
| **Raised** | `shadow-sm` | Content containers | Card, Slider thumb |
| **Floating** | `shadow-md` | Panels floating above page | Popover, Dropdown, HoverCard |
| **Overlay** | `shadow-lg` | Full overlays | Dialog, Sheet, Toast |
| **Top** | `shadow-xl` | Highest priority floating | Command palette, chart tooltips |

In dark mode, shadows use `rgba(0,0,0,N)` + a `1px rgba(255,255,255,N)` white ring overlay for edge definition, since drop shadows disappear on dark backgrounds.

---

## Shapes

The shape language is **Vercel-standard** — a consistent 6px default radius (`--luma-radius-md`) that feels modern without being pill-heavy. Never mix radius scales within a single component group.

```css
var(--luma-radius-none)  /* 0px */
var(--luma-radius-xs)    /* 2px */
var(--luma-radius-sm)    /* 4px */
var(--luma-radius-md)    /* 6px — default for all interactive components */
var(--luma-radius-lg)    /* 8px */
var(--luma-radius-xl)    /* 12px — cards, panels */
var(--luma-radius-2xl)   /* 16px */
var(--luma-radius-full)  /* 9999px — pills, avatars, badges */
```

Motion tokens keep interactions feeling snappy, never sluggish:

```css
var(--luma-duration-instant)  /* 75ms  — micro-feedback */
var(--luma-duration-fast)     /* 150ms — hover, small transitions */
var(--luma-duration-normal)   /* 250ms — standard */
var(--luma-duration-slow)     /* 400ms — panels, larger shifts */
var(--luma-ease-out)          /* cubic-bezier(0, 0, 0.2, 1) */
var(--luma-ease-in-out)       /* cubic-bezier(0.4, 0, 0.2, 1) */
var(--luma-ease-spring)       /* cubic-bezier(0.16, 1, 0.3, 1) */
var(--luma-ease-bounce)       /* cubic-bezier(0.34, 1.56, 0.64, 1) */
```

---

## Iconography

Luma uses **Lucide** (`lucide-react`) for every icon. 1,400+ open-source icons designed on a consistent 24×24 grid with rounded stroke endings. Tree-shakeable — only the icons you import ship to production.

### Sizes & strokes

Four canonical icon sizes. Stroke weight scales with size — small icons get a thinner stroke so they don't visually overpower nearby text.

| Token | Size | Stroke weight | Use |
|---|---|---|---|
| `--icon-size-xs` | 12px | 1px (`--stroke-small`) | Badges, dense inline contexts |
| `--icon-size-sm` | 16px | 1px (`--stroke-small`) | Inputs, alerts, sidebar nav items, badges with icon |
| `--icon-size-default` | 20px | 2px (`--stroke-default`) | **Buttons** (all sizes including icon-only), empty-state heroes, headings |
| `--icon-size-lg` | 24px | 2px (`--stroke-default`) | Hero moments, marketing, standalone illustrations |

**The rule for stroke width:** under 20px → 1px stroke. 20px and up → 2px stroke. No exceptions.

**The rule for buttons:** every Button icon — leading, trailing, or icon-only — is **20px** at 2px stroke, regardless of the Button's `size` prop. A `size="sm"` Button still gets a 20px icon. This keeps icon clarity consistent across the system and gives icon-only buttons the visual weight they need.

```tsx
// Button — always 20px icon
<Button size="sm">
  <Plus className="size-5" />  {/* 5 × 4 = 20px */}
  Add item
</Button>

// Input — 16px icon
<Input>
  <Search className="size-4" />  {/* 4 × 4 = 16px */}
</Input>

// Badge — 12px icon
<Badge>
  <Check className="size-3" />  {/* 3 × 4 = 12px */}
  Active
</Badge>
```

### Colour

Icons inherit colour from the parent's `currentColor`. Don't apply explicit colours — set the text colour on the parent and the icon will follow.

```tsx
{/* ✓ icon inherits */}
<p className="text-fg-muted"><Info /> Helper text</p>

{/* ✗ don't do this */}
<Info className="text-fg-muted" />
```

For status / variant icons (e.g., the icon inside an `Alert` matching its variant), the component wires the right colour automatically via slot-targeted classes — never set the icon colour by hand.

---

## Figma component-set rules

When building component sets in Figma (via the plugin API or by hand), follow these conventions so the file stays consistent and Code Connect mappings work end-to-end.

### Variable bindings — mandatory

Every layout-affecting value must be bound to a Variable. Never hardcode.

| Property | Bind to |
|---|---|
| `cornerRadius` (4 corners) | `📐 Radius/{token}` |
| `paddingLeft/Right/Top/Bottom` | `📐 Spacing/Scale/{N}` or `Alias/{token}` |
| `itemSpacing` (gap) | `📐 Spacing/Scale/{N}` |
| `width` / `height` | `📐 Spacing/Scale/{N}` for component sizing; `✚ Icons/Icon Size/{token}` for icons |
| `strokeWeight` (per-side) | `✚ Icons/Stroke/{token}` |
| `fills` / `strokes` (paints) | `🎨 Semantic/{token}` via `setBoundVariableForPaint` |
| Effect colours (shadows, rings) | `🎨 Semantic/{token}` via `effect.boundVariables.color` |

### Figma plugin API gotchas

- **`cornerRadius` binding splits into 4 corners** — bind `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius` individually.
- **`strokeWeight` binding splits into 4 per-side** — the API call is single, but `boundVariables` reads back as `strokeTopWeight`, etc.
- **INSTANCE nodes support `width` OR `height` binding, not both** — Figma platform limit. For square icons, bind `width` only; the height pairs naturally.
- **Set `layoutSizingHorizontal/Vertical` to `'FIXED'` before binding `width`/`height`** — even if it's already `'FIXED'`, re-set explicitly or the binding silently fails.
- **Order of operations:** `parent.appendChild(child)` → set `layoutSizing*` → `setBoundVariable(...)`. Setting layout sizing before the child is in an auto-layout parent throws.
- **Variable name lookup must be by `(collection, name)`** — `md` exists in both `📐 Radius` and as `Alias/md` in `📐 Spacing`. A flat name map collides.

### Component-set anatomy

Every component set should expose:

- **Variant properties** (enum): the discrete states designers switch between (e.g., `Variant`, `Size`, `State`).
- **Text properties**: editable labels (e.g., `Label`, `Title`, `Description`).
- **Boolean properties**: optional slots (e.g., `Has Leading Icon`, `Has Description`).
- **References**: each variant's children link their `visible` / `characters` to the right property via `componentPropertyReferences`.

### Default-variant convention

The first variant in the set becomes the default. Order your iteration so the most common combo (typically `Default / Default / Default`) is built first.

### Segmented control pattern (Tabs, ToggleGroup)

When composing a segmented control — Tabs, ToggleGroup, segmented switches — items sit **flush** inside the container. Set `itemSpacing: 0` (no gap). The active item's filled background creates the visual "pill" against the muted track. Adding a gap breaks the segmented look and reads as separate buttons.

```
✓ flush     [ Overview | Activity | Settings ]   ← bg lines up
✗ gap=4     [ Overview ] [ Activity ] [ Settings ]  ← reads as buttons
```

### Auto-layout sizing — the primary/counter axis trap

The biggest source of auto-layout bugs: `primaryAxisSizingMode` and `counterAxisSizingMode` map to **different physical axes depending on the layout direction**.

| Layout direction | Primary axis = | Counter axis = |
|---|---|---|
| `VERTICAL` | Height | Width |
| `HORIZONTAL` | Width | Height |

**Always reason in physical axes** (width / height), then translate to primary/counter at the API call site:

```js
// For a HORIZONTAL row with fixed width and auto height:
row.layoutMode = 'HORIZONTAL';
row.primaryAxisSizingMode = 'FIXED';  // primary = width here
row.counterAxisSizingMode = 'AUTO';   // counter = height here
row.resize(1248, row.height);

// For a VERTICAL stack with fixed width and auto height:
col.layoutMode = 'VERTICAL';
col.counterAxisSizingMode = 'FIXED';  // counter = width here
col.primaryAxisSizingMode = 'AUTO';   // primary = height here
col.resize(1248, col.height);
```

Easier path: for **children inside an auto-layout parent**, prefer the modern direction-agnostic API:

```js
node.layoutSizingHorizontal = 'FIXED' | 'HUG' | 'FILL';
node.layoutSizingVertical   = 'FIXED' | 'HUG' | 'FILL';
```

These always mean width/height literally, regardless of the parent's direction. Only fall back to `primaryAxisSizingMode`/`counterAxisSizingMode` for the auto-layout frame itself (its own sizing-relative-to-content) or for top-level frames that aren't in an auto-layout parent.

### Verify with a quick sanity check

After building any auto-layout frame, mentally check:
- "What physical width should this be?" → verify the right binding/value is on the right sizing mode
- "What physical height should this be?" → same check
- "Does my row look the right height when content is taller than expected?" → if `counterAxisSizingMode='FIXED'` on a HORIZONTAL frame, content can overflow

---

## Component tokens (3rd layer)

Every component exposes a set of CSS custom properties prefixed with its name. Use these to override one component without changing brand-wide semantics.

```css
/* Override only the primary button without affecting --primary brand colour */
:root {
  --button-primary-bg:    oklch(0.55 0.30 280);   /* purple */
  --button-primary-hover-bg: oklch(0.50 0.30 280);
}
```

**Quick reference** (most common — full list in `src/tokens/components.css`):

| Component | Key tokens |
|---|---|
| `Button` | `--button-{variant}-{bg,fg,hover-bg}` for default/secondary/outline/ghost/destructive/success/warning/info; `--button-{height,padding-x,font-size}-{sm,default,lg}` |
| `Input` | `--input-{bg,fg,placeholder,border,border-focus,radius,height,padding-x,shadow}` plus `--input-error-{border,ring}` |
| `Select` | `--select-{bg,fg,border,radius,height,padding-x,shadow,menu-bg,menu-border,menu-shadow}` |
| `Card` | `--card-{bg,fg,border,radius,padding,shadow}` |
| `Badge` | `--badge-{radius,padding-x,padding-y,font-size}` plus per-variant `--badge-{variant}-{bg,fg,border}` |
| `Dialog` | `--dialog-{bg,fg,radius,padding,shadow,overlay-bg}` |
| `Tooltip` | `--tooltip-{bg,fg,radius,padding-x,padding-y,font-size}` |
| `Tabs` | `--tabs-list-{bg,radius,padding}`, `--tabs-trigger-{radius,active-bg,active-fg,shadow}` |
| `Avatar` | `--avatar-{size-sm,size-md,size-lg,bg,fg,border}` |
| `Checkbox`/`Radio` | `--checkbox-{size,radius,bg,border,checked-bg,checked-fg}` · `--radio-{size,border,checked}` |
| `Switch` | `--switch-{track-w,track-h,thumb-size,on-bg,off-bg,thumb-bg,thumb-shadow}` |
| `Progress`/`Slider` | `--progress-{track-bg,fill-bg,height,radius}` · `--slider-{track-bg,fill-bg,thumb-bg,thumb-border,thumb-size}` |
| `Spinner` | `--spinner-{track,fill}` |
| `StatusDot` | `--status-dot-size-{xs,sm,md,lg}` |
| `Kbd` | `--kbd-{bg,fg,border,radius,font,height-sm,height-md,height-lg}` |
| `CodeBlock` | `--code-block-{bg,border,radius,padding,font-size,line-height}` · `--inline-code-{bg,padding-x,padding-y,radius}` |
| `EmptyState` | `--empty-state-{icon-size,icon-bg,icon-fg,padding-sm,padding-md,padding-lg}` |
| `Combobox` | `--combobox-{trigger-height,menu-bg,menu-border,menu-shadow}` |
| `Note` | `--note-{radius,padding-x,padding-y,gap}` |
| `Alert` | `--alert-{radius,padding,icon-size}` |

**Where they live**: tokens split across two files in `src/tokens/`:
- `components.generated.css` — auto-derived from the YAML front matter in this file. Run `pnpm tokens:gen-components` after editing the YAML.
- `components.css` — hand-curated for per-size/per-state tokens that don't fit the YAML schema. Loaded second, so it can override the generated file.

**Don't edit `components.generated.css` by hand** — update the YAML in this file and regenerate.

---

## Components

### Typography primitive

**Always reach for `<Text>` before writing `<p className="text-N font-N …">` by hand.** It binds text to the semantic typography role layer.

```tsx
<Text variant="display" as="h1">Welcome to Luma</Text>
<Text variant="body-md" tone="muted">Lorem ipsum…</Text>
<Text variant="caption" as="small">2 min ago</Text>
<Text variant="mono" as="code">--primary</Text>
```

| Prop | Options |
|---|---|
| `variant` | `display` · `heading` · `title` · `subtitle` · `body-lg` · `body-md` · `body-sm` · `body-sm-strong` · `caption` · `label` · `eyebrow` · `mono` |
| `tone` | `default` · `muted` · `primary` · `destructive` · `success` · `warning` · `info` · `inherit` |
| `as` | Any HTML element (`p` default). Use to preserve semantic meaning |
| `align` | `left` · `center` · `right` · `justify` |
| `truncate` | Single-line ellipsis on overflow |

### Layout primitives

**Always reach for these before writing `<div className="flex …">` by hand.** They keep spacing decisions tokenised and give AI tools a stable vocabulary.

```tsx
<Container size="xl" pad="md">      {/* centred page wrapper */}
  <Stack gap="lg">                  {/* vertical column */}
    <Inline gap="sm" justify="end"> {/* horizontal row */}
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </Inline>
    <Grid cols={3} gap="md">        {/* CSS grid */}
      <Card />
      <Card />
      <Card />
    </Grid>
  </Stack>
</Container>
```

All four accept `asChild` (via Radix Slot) to render as a different element while keeping styles. Gap values map to the `--luma-space-*` scale — `xs`=4px, `sm`=8px, `md`=16px, `lg`=24px, `xl`=32px, `2xl`=48px, `3xl`=64px.

| Primitive | Use for | Key props |
|---|---|---|
| `<Container>` | Page-width centred wrapper | `size`, `pad` |
| `<Stack>` | Vertical layout (forms, lists, panels) | `gap`, `align`, `justify`, `divide` |
| `<Inline>` | Horizontal layout (button rows, toolbars, chip lists) | `gap`, `align`, `justify`, `wrap` |
| `<Grid>` | CSS Grid (cards, dashboards) | `cols`, `gap`, `align` |

### Buttons

9 variants: `default` (primary blue), `secondary`, `outline`, `ghost`, `link`, `destructive`, `success`, `warning`, `info`. 4 sizes: `sm` (h-8), `default` (h-9), `lg` (h-10), `icon` (h-9 w-9).

- Filled buttons: NO shadow. The solid colour is the affordance.
- Outline buttons: `shadow` (xs) to give subtle depth from the border.
- Ghost and Link: NO shadow. Intentionally flat.
- Warning uses a **dark foreground** (not white) — amber fails WCAG with white text.

```tsx
<Button variant="default">Primary action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="success">Published</Button>
<Button variant="warning">Needs review</Button>
<Button variant="info">Learn more</Button>
```

### Inputs & Forms

Height is `h-9` (36px) to match buttons. Border uses `--input`, not `--border`, to distinguish form controls from layout dividers. Error state adds `ring-1 ring-destructive` — never change the border width (causes layout shift).

### Cards

`rounded-xl` (12px), `border bg-card`, optional `shadow-sm`. Card content uses `--card-foreground`. Descriptions use `--muted-foreground`. Never nest cards.

### Interactive elements (Dialog, Dropdown, Popover, Tooltip)

Always built on **Radix primitives**. Never use raw `<div onClick>` for focusable UI. Radix handles focus trapping, escape, and ARIA automatically.

### Status & feedback primitives

```tsx
<Spinner size="sm" />                         {/* indeterminate loading */}
<StatusDot variant="success" pulse />         {/* live status indicator */}
<Kbd>⌘K</Kbd>                                 {/* single key */}
<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup> {/* chord */}
```

| Primitive | Use for | Notes |
|---|---|---|
| `<Spinner>` | Active waiting (button submit, fetch in flight) | For passive page loads use `<Skeleton>` instead |
| `<StatusDot>` | System status, presence, item state | Pair with a label; `pulse` for live |
| `<Kbd>` / `<KbdGroup>` | Render keyboard shortcuts | Inline in menus, tooltips, command lists |

### Content primitives

```tsx
<Note variant="tip" icon title="Pro tip">
  Press <Kbd>⌘K</Kbd> to open the command palette.
</Note>

<CodeBlock language="tsx" copyable>
  {`<Button>Save</Button>`}
</CodeBlock>

<InlineCode>cn()</InlineCode>

<EmptyState bordered>
  <EmptyStateIcon><Icon name="Inbox" /></EmptyStateIcon>
  <EmptyStateTitle>No notifications</EmptyStateTitle>
  <EmptyStateDescription>You're all caught up.</EmptyStateDescription>
  <EmptyStateActions><Button>Refresh</Button></EmptyStateActions>
</EmptyState>
```

| Primitive | Use for | Hierarchy vs siblings |
|---|---|---|
| `<Note>` | Persistent inline info (tips, hints, deprecation) | Quieter than Alert, persistent (unlike Toast) |
| `<CodeBlock>` / `<InlineCode>` | Display code samples | Block uses optional header + copy; inline is subtle |
| `<EmptyState>` | Placeholder for empty lists/views | Composable: Icon → Title → Description → Actions |

### Form primitives

```tsx
<Combobox
  options={[{ value: 'design', label: 'Designer' }, { value: 'eng', label: 'Engineer' }]}
  value={role}
  onChange={setRole}
  placeholder="Select role…"
/>
```

| Primitive | Use for |
|---|---|
| `<Combobox>` | Searchable select for medium-to-large option lists. Prefer `<Select>` for ≤6 options |

### Standard component pattern

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ className, elevated, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground',
        elevated && 'shadow-sm',
        className
      )}
      {...props}
    />
  )
}
```

---

## Do's and Don'ts

**Do:**
- Use semantic aliases (`--primary`, `--background`) in components — always
- Use `--primary-hover` / `--primary-pressed` / `--primary-disabled` for CTA states
- Use `--error` for validation UI; use `--destructive` for irreversible action buttons
- Use `--primary-subtle` / `--primary-muted` for tinted surfaces — never raw `--luma-brand-*`
- Use Radix primitives for all interactive, focusable elements
- Export TypeScript interfaces extending HTML/Radix element props from every component
- Keep all dark-mode overrides in `src/tokens/color.css` under `.dark {}`
- Alias every dark-mode surface to a `--luma-neutral-*` primitive — never use raw `oklch()` literals in `.dark {}`
- Use `cn()` from `@/lib/utils` for conditional class composition
- Apply `warning` variant with dark text — amber + white fails WCAG AA
- Use `shadow` (xs) on outline/bordered controls; no shadow on filled buttons

**Don't:**
- Never hardcode hex, rgb, hsl, or oklch values in components — use CSS vars
- Never hardcode spacing in px — use `--luma-space-*` vars or Tailwind classes
- Never write raw `oklch()` literals inside `.dark {}` — always alias to `--luma-neutral-*` so the scale stays the single perceptual source of truth
- Never write `.dark {}` overrides inside component files
- Never use primitive vars (`--luma-brand-500`) in components — only semantic aliases
- Never use `--destructive` for validation errors — that's `--error` and `--luma-error-*`
- Never use raw `<div onClick>` for dialogs, menus, or tooltips — always Radix
- Never apply `shadow-md` or higher to buttons or small form controls

---

## Tailwind → CSS var mapping

```
bg-background           → var(--background)
bg-card                 → var(--card)
bg-primary              → var(--primary)
bg-muted                → var(--muted)
bg-destructive          → var(--destructive)
text-foreground         → var(--foreground)
text-muted-foreground   → var(--muted-foreground)
text-primary-foreground → var(--primary-foreground)
border-border           → var(--border)
ring-ring               → var(--ring)
```

---

## Dark mode

```html
<html>           <!-- light -->
<html class="dark"> <!-- dark -->
```

All overrides live in `src/tokens/color.css` under `.dark {}`. Components themed automatically — zero per-component overrides needed or allowed.

### Dark-mode surface ladder (OKLCH)

Each dark surface aliases to a stop on the `--luma-neutral-*` scale. The scale has *two extra stops at the dark end* (`-750`, `-850`) so layered surfaces stay perceptually distinct — popovers visibly float above cards, cards visibly lift off the page.

| Token | Alias | Luminance | Use |
|---|---|---|---|
| `--background` / `--bg-1` | `--luma-neutral-900` | ~7% | Page background |
| `--bg-2` | `--luma-neutral-850` | ~10% | Sidebars, recessed sections |
| `--card` / `--bg-element` | `--luma-neutral-800` | ~13% | Cards, default element |
| `--popover` / `--bg-element-hover` | `--luma-neutral-750` | ~16% | Popovers, dropdowns, hover |
| `--bg-element-active` | `--luma-neutral-700` | ~21% | Pressed / selected |

**Why two extra stops:** dark UIs need finer granularity at the dark end. A standard `50→950` ladder gives one step every ~7% luminance — too coarse to separate four+ stacked layers. The extra `-750` and `-850` halve that to ~3% steps where it matters most. Linear, Vercel, Notion all do the same.

**Borders in dark mode** are translucent white (`rgba(255,255,255, 0.05–0.14)`) — never opaque grey — so they read as edge highlights rather than competing surfaces:
```css
--border-subtle:   rgba(255,255,255, 5%);   /* faint */
--border-default:  rgba(255,255,255, 8%);   /* default */
--border-strong:   rgba(255,255,255, 14%);  /* emphasis */
```

**Shadow on dark surfaces** combines a heavy black drop with a 1px white ring (`rgba(255,255,255, 4–10%)`). Drop shadows alone disappear on dark backgrounds; the ring defines the top edge. See `Storybook → Foundations → Shadows → Elevation scale` for the side-by-side comparison.

### Figma-CSS sync rule

The OKLCH primitives in `color.css` are the **single source of truth**. The Figma file mirrors them: every `Neutral/N` primitive's sRGB value in Figma is computed from its OKLCH definition. Surface tokens in Figma (`Surface/BG 1`, `Core/Card`, `Core/Popover`, etc.) alias to neutral primitives — never store standalone sRGB values. To regenerate Figma values after a palette tweak: edit OKLCH in `color.css`, then run the Figma plugin's OKLCH→sRGB converter against the updated values.

---

## File locations

| What | Where |
|---|---|
| Token CSS vars | `src/tokens/*.css` |
| Master token import | `src/tokens/index.css` |
| Token JSON export | `src/tokens/tokens.json` |
| Tailwind wiring | `src/styles/globals.css` |
| `cn()` utility | `src/lib/utils.ts` |
| UI components | `src/components/ui/` |
| Code Connect mappings | `src/components/ui/*.figma.tsx` |
| Storybook stories | `src/stories/` |
| Storybook config | `.storybook/` |
| Code Connect config | `figma.config.ts` |
| shadcn CLI config | `components.json` |
| CI/CD | `.github/workflows/chromatic.yml` |

---

## Code Connect workflow

```tsx
// src/components/ui/button.figma.tsx
import figma from '@figma/code-connect'
import { Button } from './button'

figma.connect(Button, 'FIGMA_NODE_URL', {
  props: {
    variant: figma.enum('Variant', { default: 'default', destructive: 'destructive' }),
    size: figma.enum('Size', { Default: 'default', Small: 'sm', Large: 'lg' }),
    children: figma.string('Label'),
  },
  example: ({ variant, size, children }) => (
    <Button variant={variant} size={size}>{children}</Button>
  ),
})
```

Publish: `pnpm figma:publish`
