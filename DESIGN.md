---
version: "1.3.0"
name: Luma
description: |
  Luma is a light-first, product-software design system built on OKLCH color science and a Geist-inspired
  typographic scale. The canvas is pure white, cut through by a single electric blue accent (hue 254) that
  carries every primary CTA, focus ring, and selected state — never used decoratively. Surfaces step through
  a Geist-style lift ladder (canvas → subtle → element) rather than relying on shadow alone; in dark mode
  the ladder reverses so panels grow brighter as they elevate, following the Linear/Supabase convention.
  The dark-mode neutral ladder is OKLCH-derived with five discrete stops (--luma-neutral-700 through -950)
  including two extra stops (-750, -850) for popover and recessed surfaces — finer-grained granularity at
  the dark end so layered surfaces stay perceptually distinct.
  Typography is set in Geist (Inter fallback) at a dense product-software cadence: display headlines carry
  −0.05em tracking, body text stays at 0, and column headers use a 0.08em uppercase eyebrow pattern.
  Component density sits at the Linear end of the spectrum — 36px default controls, 6px radius throughout,
  12–16px internal padding. Dark mode is a first-class citizen: all semantic aliases swap in a single
  .dark {} block, surfaces alias to the OKLCH neutral scale (never raw oklch() literals), and shadows in
  dark add a white hairline ring for edge definition on deep canvases.

colors:
  # ── Canvas & surfaces — light mode ────────────────────────────────────────
  canvas:          "#ffffff"
  surface-1:       "#f9f9fb"        # subtle — sidebars, recessed sections
  surface-2:       "#f2f2f5"        # UI element default background
  surface-hover:   "#e8e8ed"        # UI element hover
  surface-active:  "#d5d5dc"        # UI element pressed / selected

  # ── Canvas & surfaces — dark mode ─────────────────────────────────────────
  # OKLCH-derived neutral ladder. Each step is a discrete stop on the
  # --luma-neutral-* scale (hue 250, cool-tinted). Page → card → popover
  # gives ~7% perceptual luminance lift per step, so cards visibly elevate
  # from the page without relying on shadow alone.
  canvas-dark:          "#0f1115"   # --luma-neutral-900 · oklch(0.178 0.008 250) · page bg
  surface-dark-1:       "#16191c"   # --luma-neutral-850 · oklch(0.21  0.008 250) · subtle (sidebars, recessed)
  surface-dark-2:       "#1e2226"   # --luma-neutral-800 · oklch(0.25  0.009 250) · card / default element
  surface-dark-hover:   "#282c30"   # --luma-neutral-750 · oklch(0.29  0.010 250) · hover / popover
  surface-dark-active:  "#32373b"   # --luma-neutral-700 · oklch(0.333 0.010 250) · pressed / selected

  # ── Ink scale ──────────────────────────────────────────────────────────────
  ink:          "#0f0f16"           # highest contrast (--fg-strong)
  ink-body:     "#181820"           # default body text
  ink-muted:    "#55556b"           # secondary / helper text (--fg-muted)
  ink-subtle:   "#71717e"           # placeholders, tertiary (--fg-subtle)
  ink-disabled: "#a4a4b0"           # disabled controls (--fg-disabled)

  # ── Hairlines — never reuse ink for borders ────────────────────────────────
  hairline:        "#e8e8ed"        # default dividers and outlines
  hairline-strong: "#d5d5dc"        # emphasis borders, active state
  hairline-subtle: "#f2f2f5"        # faint separators

  # ── Primary — electric blue hue 254 ───────────────────────────────────────
  # One accent. Reserved for: primary CTA, focus ring, active nav,
  # selected rows. Never used decoratively.
  primary:          "#0060d4"       # light mode — brand-600 · oklch(0.46 0.24 254)
  primary-hover:    "#1472e8"       # lighter — hover state
  primary-pressed:  "#004fb8"       # darker — pressed / active
  primary-disabled: "#8db8ef"       # desaturated — disabled CTA bg
  primary-ring:     "rgba(0,96,212,0.30)"  # focus halo
  on-primary:       "#ffffff"       # text on primary background
  primary-subtle:   "#eef2ff"       # barely tinted surface (selected rows, active nav)
  primary-muted:    "#dce8ff"       # light tint (badges, active item highlights)

  # Dark mode primary (brand-400 — lighter to read on dark canvas)
  primary-dark:    "#5393f5"        # oklch(0.66 0.19 254)
  on-primary-dark: "#0f0f16"

  # ── Semantic status ────────────────────────────────────────────────────────
  success:        "#169a45"         # vibrant green — hue 145
  success-bg:     "#edfcf2"
  success-border: "#6ed49a"
  success-text:   "#155c2b"
  on-success:     "#ffffff"

  warning:        "#f4ad0a"         # vibrant amber — hue 72
  warning-bg:     "#fffbeb"
  warning-border: "#fcd35a"
  warning-text:   "#854d0e"
  on-warning:     "#111111"         # amber is light — near-black text

  error:          "#e03131"         # vibrant red — hue 25
  error-bg:       "#fff0f0"
  error-border:   "#f5a0a0"
  error-text:     "#8b1b1b"
  on-error:       "#ffffff"

  info:           "#3b7ef4"         # vivid blue — hue 240
  info-bg:        "#eff6ff"
  info-border:    "#93bbfc"
  info-text:      "#1d4db5"
  on-info:        "#ffffff"

  # ── Destructive vs error ───────────────────────────────────────────────────
  # destructive = irreversible action buttons (delete, revoke dialogs)
  # error       = validation states (input rings, error banners, toasts)
  # Both resolve to the same red solid. The distinction is semantic intent.
  destructive:       "#e03131"
  destructive-hover: "#c02020"     # oklch(0.44 0.22 25), darker red
  on-destructive:    "#ffffff"

  # ── Inverse & overlay ──────────────────────────────────────────────────────
  inverse-canvas: "#0a0a0a"         # dark panel on a light page
  inverse-ink:    "#f9f9fb"         # text on inverse canvas
  overlay-bg:     "rgba(0,0,0,0.50)"  # shared backdrop — Dialog, Sheet, Drawer
                                    # dark mode: rgba(0,0,0,0.65)

layout:
  # Responsive grid — columns / gutter / margin change per breakpoint.
  # CSS custom properties in layout.css update via media queries.
  grid:
    xs:  { columns: 4,  gutter: "16px", margin: "16px",  use: "Mobile portrait" }
    sm:  { columns: 4,  gutter: "16px", margin: "24px",  use: "Mobile landscape" }
    md:  { columns: 8,  gutter: "24px", margin: "32px",  use: "Tablet portrait" }
    lg:  { columns: 12, gutter: "24px", margin: "40px",  use: "Desktop" }
    xl:  { columns: 12, gutter: "32px", margin: "48px",  use: "Wide desktop" }
    2xl: { columns: 12, gutter: "32px", margin: "auto",  use: "Ultra-wide (content centred)" }

  container:
    xs:  "480px"                    # narrow modal / form
    sm:  "640px"                    # single-column content
    md:  "768px"                    # two-up cards
    lg:  "1024px"                   # standard app content width
    xl:  "1280px"                   # wide dashboards
    2xl: "1536px"                   # ultra-wide / marketing

  breakpoints:
    sm:  "640px"
    md:  "768px"
    lg:  "1024px"
    xl:  "1280px"
    2xl: "1536px"

  sidebar:
    width:           "240px"        # expanded — matches shadcn sidebar default
    collapsed-width: "52px"         # icon-only rail

  panel:
    width: "320px"                  # detail / settings side panel

typography:
  display:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.05em"

  heading:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"

  title:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"

  subtitle:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "0"

  body-lg:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"

  body:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"

  body-sm:
    # Regular weight — secondary content (table cells, timestamps, descriptions)
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"

  body-sm-strong:
    # Medium weight — component default (Button, Badge, Input labels, nav items)
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"

  caption:
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"

  label:
    # Standard section label — wide tracking, no uppercase enforcement
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.1em"

  eyebrow:
    # Uppercase pattern — table column headers, eyebrow labels, category tags
    fontFamily: "Geist, Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.08em"
    textTransform: "uppercase"

  mono:
    # Code, token names, IDs, keyboard shortcuts, fixed-width data
    fontFamily: "Geist Mono, JetBrains Mono, Fira Code, Cascadia Code, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"

rounded:
  none: "0"
  xs:   "2px"
  sm:   "4px"
  md:   "6px"     # default — Button, Input, Badge, Select, Combobox, Checkbox
  lg:   "8px"     # Alert, Note, dropdown menus, Skeleton, Toast
  xl:   "12px"    # Card, Dialog, Sheet
  2xl:  "16px"
  3xl:  "24px"
  pill: "9999px"  # Avatar, StatusDot, pill badges, toggle thumbs

spacing:
  # Aliases match the CSS implementation scale (--luma-space-*) one to one.
  # 12px has no t-shirt alias by design; use the numeric scale (--luma-space-3).
  xs:      "4px"
  sm:      "8px"
  md:      "16px"
  lg:      "24px"
  xl:      "32px"
  2xl:     "48px"
  3xl:     "64px"
  section: "96px"  # page-level vertical rhythm, between major sections

components:
  # ── Button ────────────────────────────────────────────────────────────────
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"

  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"

  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.on-primary}"
    opacity: 0.6

  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.ink}"

  button-secondary-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-disabled}"
    opacity: 0.6

  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
    border: "1px solid {colors.hairline}"

  button-outline-hover:
    backgroundColor: "{colors.surface-1}"
    border: "1px solid {colors.hairline-strong}"

  button-outline-disabled:
    textColor: "{colors.ink-disabled}"
    border: "1px solid {colors.hairline-subtle}"
    opacity: 0.6

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-ghost-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"

  button-ghost-disabled:
    textColor: "{colors.ink-disabled}"
    opacity: 0.6

  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.on-destructive}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-destructive-hover:
    backgroundColor: "{colors.destructive-hover}"
    textColor: "{colors.on-destructive}"

  button-destructive-disabled:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-text}"
    opacity: 0.6

  # Status buttons: rare, never a substitute for primary. See the variant table.
  button-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-success}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-warning}"   # dark text: amber + white fails WCAG AA
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  button-info:
    backgroundColor: "{colors.info}"
    textColor: "{colors.on-info}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"

  # ── Input ─────────────────────────────────────────────────────────────────
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 12px"
    border: "1px solid {colors.hairline}"

  input-focus:
    border: "1px solid {colors.primary}"
    ring: "{colors.primary-ring}"

  input-error:
    # Uses --error, not --destructive — validation state, not destructive action
    border: "1px solid {colors.error}"
    ring: "{colors.error}"

  input-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-disabled}"
    border: "1px solid {colors.hairline-subtle}"
    opacity: 0.6

  # ── Textarea ──────────────────────────────────────────────────────────────
  # Focus, error, and disabled states mirror input-* exactly.
  textarea:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    minHeight: "72px"
    padding: "8px 12px"
    border: "1px solid {colors.hairline}"

  # ── Checkbox ──────────────────────────────────────────────────────────────
  checkbox-default:
    size: "16px"
    rounded: "{rounded.sm}"
    backgroundColor: "transparent"
    border: "1px solid {colors.hairline-strong}"

  checkbox-checked:
    backgroundColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    iconColor: "{colors.on-primary}"

  checkbox-indeterminate:
    backgroundColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    iconColor: "{colors.on-primary}"
    opacity: 0.75

  checkbox-disabled:
    backgroundColor: "{colors.surface-2}"
    border: "1px solid {colors.hairline-subtle}"
    opacity: 0.5

  # ── Radio ─────────────────────────────────────────────────────────────────
  radio-default:
    size: "16px"
    rounded: "{rounded.pill}"
    backgroundColor: "transparent"
    border: "1px solid {colors.hairline-strong}"

  radio-checked:
    border: "1px solid {colors.primary}"
    dotColor: "{colors.primary}"
    dotSize: "8px"

  radio-disabled:
    backgroundColor: "{colors.surface-2}"
    border: "1px solid {colors.hairline-subtle}"
    opacity: 0.5

  # ── Select ────────────────────────────────────────────────────────────────
  select-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 12px"
    border: "1px solid {colors.hairline}"

  select-trigger-open:
    border: "1px solid {colors.primary}"
    ring: "{colors.primary-ring}"

  select-trigger-disabled:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-disabled}"
    opacity: 0.6

  select-menu:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "4px"
    shadow: "md"

  select-item:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "6px 8px"

  select-item-active:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"

  select-item-disabled:
    textColor: "{colors.ink-disabled}"
    opacity: 0.5

  # ── Combobox ──────────────────────────────────────────────────────────────
  # Searchable select for 7+ options. Trigger, menu, and items mirror Select;
  # adds a search input pinned to the top of the menu.
  combobox-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    height: "36px"
    padding: "0 12px"
    border: "1px solid {colors.hairline}"

  combobox-search:
    height: "32px"
    padding: "0 8px"
    typography: "{typography.body-sm}"
    borderBottom: "1px solid {colors.hairline-subtle}"

  combobox-menu:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "4px"
    shadow: "md"
    maxHeight: "300px"

  # ── Switch / Toggle ───────────────────────────────────────────────────────
  switch-off:
    trackColor: "{colors.surface-active}"
    trackWidth: "36px"
    trackHeight: "20px"
    trackRounded: "{rounded.pill}"
    thumbColor: "{colors.canvas}"
    thumbSize: "16px"
    thumbShadow: "xs"

  switch-on:
    trackColor: "{colors.primary}"
    thumbColor: "{colors.canvas}"

  switch-disabled:
    trackColor: "{colors.surface-2}"
    opacity: 0.5

  # ── Tabs ──────────────────────────────────────────────────────────────────
  tabs-list:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.lg}"
    padding: "4px"

  tabs-trigger:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "6px 12px"

  tabs-trigger-active:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    shadow: "xs"

  tabs-trigger-disabled:
    textColor: "{colors.ink-disabled}"
    opacity: 0.5

  # ── Accordion ─────────────────────────────────────────────────────────────
  accordion-item:
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"

  accordion-trigger:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    padding: "12px 16px"

  accordion-trigger-open:
    textColor: "{colors.primary}"

  accordion-content:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    padding: "0 16px 16px"

  # ── Dropdown Menu ─────────────────────────────────────────────────────────
  dropdown-menu:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "4px"
    shadow: "md"

  dropdown-item:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "6px 8px"

  dropdown-item-hover:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"

  dropdown-item-destructive:
    textColor: "{colors.destructive}"

  dropdown-item-destructive-hover:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-text}"

  dropdown-separator:
    color: "{colors.hairline}"
    margin: "4px 0"

  # ── Breadcrumb ────────────────────────────────────────────────────────────
  breadcrumb-item:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm-strong}"

  breadcrumb-item-current:
    textColor: "{colors.ink}"

  breadcrumb-separator:
    textColor: "{colors.ink-subtle}"

  # ── Pagination ────────────────────────────────────────────────────────────
  pagination-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    size: "32px"
    border: "1px solid {colors.hairline}"

  pagination-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    border: "1px solid {colors.primary}"

  pagination-item-disabled:
    textColor: "{colors.ink-disabled}"
    opacity: 0.5

  # ── Progress ──────────────────────────────────────────────────────────────
  progress-track:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.pill}"
    height: "8px"

  progress-fill:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.pill}"

  progress-fill-success:
    backgroundColor: "{colors.success}"

  progress-fill-warning:
    backgroundColor: "{colors.warning}"

  progress-fill-error:
    backgroundColor: "{colors.error}"

  # ── Slider ────────────────────────────────────────────────────────────────
  slider-track:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.pill}"
    height: "6px"

  slider-fill:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.pill}"

  slider-thumb:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline-strong}"
    rounded: "{rounded.pill}"
    size: "16px"
    shadow: "sm"

  slider-thumb-focus:
    ring: "{colors.primary-ring}"

  # ── Spinner ───────────────────────────────────────────────────────────────
  spinner:
    trackColor: "{colors.surface-active}"
    fillColor: "{colors.primary}"
    size: "16px"
    duration: "600ms"

  # ── Avatar ────────────────────────────────────────────────────────────────
  avatar-sm:
    size: "24px"
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.caption}"
    border: "2px solid {colors.canvas}"

  avatar-md:
    size: "32px"
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm-strong}"
    border: "2px solid {colors.canvas}"

  avatar-lg:
    size: "40px"
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
    typography: "{typography.body-sm-strong}"
    border: "2px solid {colors.canvas}"

  # ── Alert / Callout ───────────────────────────────────────────────────────
  alert-info:
    backgroundColor: "{colors.info-bg}"
    textColor: "{colors.info-text}"
    border: "1px solid {colors.info-border}"
    iconColor: "{colors.info}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"

  alert-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success-text}"
    border: "1px solid {colors.success-border}"
    iconColor: "{colors.success}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"

  alert-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning-text}"
    border: "1px solid {colors.warning-border}"
    iconColor: "{colors.warning}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"

  alert-error:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-text}"
    border: "1px solid {colors.error-border}"
    iconColor: "{colors.error}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"

  # ── Empty State ───────────────────────────────────────────────────────────
  empty-state:
    iconSize: "48px"
    iconBackgroundColor: "{colors.surface-2}"
    iconColor: "{colors.ink-muted}"
    rounded: "{rounded.lg}"
    padding: "48px 24px"

  empty-state-sm:
    iconSize: "32px"
    padding: "24px 16px"

  # ── Form Field Layout ─────────────────────────────────────────────────────
  form-label:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    marginBottom: "6px"

  form-helper:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    marginTop: "6px"

  form-error-message:
    textColor: "{colors.error-text}"
    typography: "{typography.body-sm}"
    marginTop: "6px"

  # ── Card ──────────────────────────────────────────────────────────────────
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.hairline}"
    padding: "24px"

  card-elevated:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.hairline}"
    padding: "24px"
    shadow: "md"

  # ── Badge ─────────────────────────────────────────────────────────────────
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.md}"
    padding: "2px 10px"

  badge-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success-text}"
    border: "1px solid {colors.success-border}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.md}"
    padding: "2px 10px"

  badge-error:
    backgroundColor: "{colors.error-bg}"
    textColor: "{colors.error-text}"
    border: "1px solid {colors.error-border}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.md}"
    padding: "2px 10px"

  badge-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning-text}"
    border: "1px solid {colors.warning-border}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.md}"
    padding: "2px 10px"

  # ── Navigation ────────────────────────────────────────────────────────────
  nav-item:
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "6px 12px"

  nav-item-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-body}"

  nav-item-active:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"
    # Left-border indicator: 2px solid {colors.primary}

  # ── Table ─────────────────────────────────────────────────────────────────
  table-header:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"
    border: "1px solid {colors.hairline}"
    padding: "8px 12px"

  table-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    border: "1px solid {colors.hairline-subtle}"
    padding: "10px 12px"

  table-row-hover:
    backgroundColor: "{colors.surface-2}"

  table-row-selected:
    backgroundColor: "{colors.primary-subtle}"
    border: "1px solid {colors.primary}"

  table-row-zebra:
    backgroundColor: "{colors.surface-1}"

  # ── Toast ─────────────────────────────────────────────────────────────────
  # Sits above dialogs in z-index (z-toast: 500 > z-modal: 400)
  toast:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: "12px 16px"
    maxWidth: "360px"
    shadow: "xl"     # higher than dialog's lg — signals it's above everything

  # ── Dialog ────────────────────────────────────────────────────────────────
  dialog:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
    shadow: "lg"
    overlayBackground: "{colors.overlay-bg}"

  # ── Sheet / Drawer ────────────────────────────────────────────────────────
  # Slides in from an edge and keeps page context. Use for complex editing
  # flows that would overload a Dialog.
  sheet:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"     # on the floating edge only
    padding: "24px"
    width: "400px"              # left/right sheets; top/bottom hug content
    shadow: "lg"
    overlayBackground: "{colors.overlay-bg}"

  # ── Popover ───────────────────────────────────────────────────────────────
  popover:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "16px"
    shadow: "md"
    maxWidth: "320px"

  # ── Hover Card ────────────────────────────────────────────────────────────
  # Rich preview on hover (user cards, link previews). Content is read-only.
  hover-card:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "16px"
    shadow: "md"
    maxWidth: "320px"
    openDelay: "300ms"

  # ── Command Palette ───────────────────────────────────────────────────────
  command:
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.xl}"
    shadow: "xl"
    maxWidth: "560px"
    overlayBackground: "{colors.overlay-bg}"

  command-input:
    height: "44px"
    padding: "0 16px"
    typography: "{typography.body}"
    borderBottom: "1px solid {colors.hairline-subtle}"

  command-item:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.md}"
    padding: "8px"

  command-item-active:
    backgroundColor: "{colors.primary-subtle}"
    textColor: "{colors.primary}"

  # ── Tooltip ───────────────────────────────────────────────────────────────
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "4px 8px"

  # ── Skeleton ──────────────────────────────────────────────────────────────
  skeleton:
    backgroundColor: "{colors.surface-2}"
    shimmerColor: "{colors.surface-hover}"
    rounded: "{rounded.md}"
    # Shimmer animation: 600ms ease-in-out infinite

  # ── Chip / Tag ────────────────────────────────────────────────────────────
  chip:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
    border: "1px solid {colors.hairline}"

  # ── Kbd ───────────────────────────────────────────────────────────────────
  kbd:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "0 6px"
    height: "20px"
    border: "1px solid {colors.hairline}"
    borderBottomWidth: "2px"    # key-cap depth

  # ── Code ──────────────────────────────────────────────────────────────────
  code-block:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.lg}"
    padding: "16px"
    border: "1px solid {colors.hairline}"

  inline-code:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "2px 6px"

  # ── Note ──────────────────────────────────────────────────────────────────
  # Persistent inline guidance, quieter than Alert: neutral surface, no status
  # tint except the icon. Variants: tip, info, warning.
  note:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
    border: "1px solid {colors.hairline}"
    gap: "12px"

  # ── Status Dot ────────────────────────────────────────────────────────────
  # Always pair with a text label. Solid status colors; pulse for live states.
  status-dot:
    rounded: "{rounded.pill}"
    size-xs: "6px"
    size-sm: "8px"      # default
    size-md: "10px"
    size-lg: "12px"
    # Colors: solid status tokens (success / warning / error / info);
    # neutral state uses {colors.ink-subtle}

  # ── Link ──────────────────────────────────────────────────────────────────
  link-default:
    textColor: "{colors.primary}"
    typography: "{typography.body}"

  link-hover:
    textColor: "{colors.primary-hover}"

  # ── Panel / Sidebar ───────────────────────────────────────────────────────
  panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"

  # ── Separator ─────────────────────────────────────────────────────────────
  separator:
    backgroundColor: "{colors.hairline}"
    thickness: "1px"

icons:
  library: "Lucide"
  style: "line"
  strokeLinecap: "round"
  strokeLinejoin: "round"
  sizes:
    xs: "12px"        # badges, dense inline contexts
    sm: "16px"        # inputs, alerts, sidebar nav items
    md: "20px"        # buttons (all sizes, including icon-only), headings
    lg: "24px"        # hero moments, standalone illustration
  strokeWidth:
    small: "1px"      # icons under 20px
    default: "2px"    # icons 20px and up
  note: "1,500+ icons. Stroke scales with size: under 20px gets 1px, 20px and up gets 2px, no exceptions. Button icons are always 20px regardless of the button's size prop. Empty-state hero icons are 48px. Icons inherit color from the parent's currentColor; never set icon color directly."

motion:
  instant:
    duration: "75ms"
    easing: "cubic-bezier(0, 0, 0.2, 1)"
    use: "Micro-feedback — checkbox tick, ripple"

  fast:
    duration: "150ms"
    easing: "cubic-bezier(0, 0, 0.2, 1)"
    use: "Hover states, small transitions"

  normal:
    duration: "250ms"
    easing: "cubic-bezier(0, 0, 0.2, 1)"
    use: "Standard default — most UI state changes"

  slow:
    duration: "400ms"
    easing: "cubic-bezier(0, 0, 0.2, 1)"
    use: "Panels, sidebars, larger layout shifts"

  slower:
    duration: "600ms"
    easing: "cubic-bezier(0, 0, 0.2, 1)"
    use: "Page-level transitions, skeleton shimmer"

  spring:
    duration: "300ms"
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
    use: "Snappy enter — dialogs, drawers, dropdowns"

  bounce:
    duration: "400ms"
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    use: "Playful elements — badges, status dots"

  reduced-motion:
    duration: "0ms"
    note: "All six durations collapse to 0ms via @media (prefers-reduced-motion: reduce) in motion.css — handled once at the token layer, not per-component."

elevation:
  # Light mode — progressive drop shadow
  none:  "none"
  xs:    "0 1px 2px rgba(0,0,0,0.05)"
  sm:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)"
  md:    "0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)"
  lg:    "0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.05)"
  xl:    "0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)"
  2xl:   "0 24px 64px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)"
  # Dark mode — white hairline ring stacked on dimmed blur
  # xs-dark: "0 0 0 1px rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.40)"
  # Ring opacity scales with elevation: 4% → 6% → 8% → 10%
  dark-note: "Shadows replace blur with a white-ring edge definition technique (rgba(255,255,255,0.04–0.10)) since drop shadows disappear on dark canvases."

z-index:
  base:     0       # normal document flow
  raised:   10      # sticky headers, floating action buttons
  dropdown: 100     # menus, popovers, combobox lists
  sticky:   200     # sticky nav bar, sticky table headers
  overlay:  300     # dialog / sheet / drawer backdrop
  modal:    400     # dialogs, sheets, drawers
  toast:    500     # always above modals — dismiss feedback must be visible
  tooltip:  600     # always topmost

imagery:
  treatment: "Product UI screenshots in context — components shown on realistic dashboard layouts rather than isolated on white. Dark-panel product shots for Storybook story backgrounds where light-mode components need contrast. No stock photography. No abstract gradient heroes. The OKLCH Spectrum tints (10 curated hues) serve as the illustration and empty-state palette — sky blue, lavender, rose blush, peach, honey, mint, seafoam, periwinkle, sand, lilac."
  examples: "Dashboard mockups with real data patterns (tables, charts, form flows). Storybook Autodocs canvases as primary documentation imagery. Lucide icon at 48px in --muted background for empty states. StatusDot + Badge combinations for live status indicators."

voice:
  tone: "Direct and precise. Engineering-literate without jargon. Addresses designers and engineers as peers — no hand-holding, no marketing superlatives. Error messages state what went wrong and what to do next. Documentation is example-first, prose-second. Token names over English descriptions wherever possible. Sentence case throughout — never Title Case For Emphasis."
  examples:
    - "Use --error for validation states. Use --destructive for irreversible actions."
    - "36px default height. 6px radius. 16px horizontal padding."
    - "Always pair an Input with a visible Label — placeholder is a hint, not a label."
    - "One primary CTA per surface. Everything else is secondary or ghost."
    - "Dark mode is free if you use semantic aliases."
    - "Don't hardcode hex values in components. Don't write .dark overrides in component files."
---

> **Map of this file** — the YAML front matter above is the machine-readable token source (colors, layout, typography, rounded, spacing, ~45 component specs, icons, motion, elevation, z-index, imagery, voice). The prose below explains the reasoning and the rules:
>
> [Overview](#overview) · [Colors](#colors) (OKLCH derivation, semantic aliases) · [Dark Mode](#dark-mode) (surface ladder, border strategy) · [Typography](#typography) (11 roles) · [Layout](#layout) (grid, containers, breakpoints, spacing) · [Elevation & Depth](#elevation--depth) · [Shapes](#shapes) (radius rules) · [Components](#components) (state coverage, **choosing the right component**, per-component notes) · [Accessibility](#accessibility) · [Do's & Don'ts](#dos--donts) · [Agent Usage](#agent-usage)
>
> If you read only three things: the semantic alias reference in Colors, the "Choosing the right component" tables, and Do's & Don'ts.

## Overview

Luma targets product teams building B2B SaaS, developer tools, and data-dense interfaces. The aesthetic is "calm confidence" — Linear density, Vercel precision, Radix accessibility. It should feel fast, trustworthy, and effortless.

The emotional target: a developer or designer picking up Luma should feel like they're working with a tool that has already made all the right decisions for them. Nothing is surprising. Everything is intentional.

**Three layers every AI tool must understand:**

1. **Primitives** — raw OKLCH scales (`--luma-brand-600`, `--luma-neutral-50`). Never used directly in components.
2. **Semantic aliases** — themed values components reference (`--primary`, `--background`, `--border`). The only layer components should touch.
3. **Component tokens** — per-component slots (`--button-primary-bg`, `--input-height`). Override one component without changing the brand.

---

## Colors

### OKLCH palette derivation

All Luma colors are computed in **OKLCH** (Lightness, Chroma, Hue) — a perceptually uniform color space where equal numeric steps look equally spaced to the human eye. Unlike HSL, OKLCH produces consistent relative contrast across hues, making it possible to build a multi-hue system where every status color at `L=0.46` appears equally prominent.

The hex values in this DESIGN.md file are sRGB approximations for AI-tool interoperability. The canonical values are the OKLCH coordinates in `src/tokens/color.css`.

#### Hue map

| Role | Hue | Rationale |
|---|---|---|
| Primary (brand blue) | 254 | Electric, high-chroma. Never decorative — reserved for CTAs, focus, selection. |
| Neutral (cool grey) | 250 | Slight blue undertone harmonises with primary without competing. |
| Destructive / Error (red) | 25 | High-saturation warm red — universally understood as danger. |
| Success (green) | 145 | Vivid leaf green — confidence, completion. |
| Warning (amber) | 72 | Saturated amber — caution without panic. **Requires dark foreground text.** |
| Info (blue) | 240 | Slightly shifted from primary (254) to avoid confusion in mixed contexts. |

#### Primary scale (hue 254)

| Step | OKLCH | Hex approx | Semantic use |
|---|---|---|---|
| 50  | `oklch(0.97 0.02 254)` | `#f0f4ff` | — |
| 100 | `oklch(0.94 0.04 254)` | `#dce8ff` | `--primary-muted` (light) |
| 200 | `oklch(0.87 0.08 254)` | `#b8d0f8` | — |
| 300 | `oklch(0.76 0.13 254)` | `#87b0f0` | — |
| 400 | `oklch(0.66 0.19 254)` | `#5393f5` | `--primary` (dark mode) |
| 500 | `oklch(0.57 0.22 254)` | `#2a7af0` | — |
| 600 | `oklch(0.46 0.24 254)` | `#0060d4` | `--primary` (light mode) |
| 700 | `oklch(0.38 0.22 254)` | `#004db8` | `--primary-pressed` |
| 800 | `oklch(0.30 0.18 254)` | `#003a9a` | — |
| 900 | `oklch(0.22 0.13 254)` | `#00267a` | — |
| 950 | `oklch(0.16 0.08 254)` | `#001450` | `--primary-subtle` (dark) |

#### Extending the palette

To add a new hue to the system, define a 11-step OKLCH scale at the same lightness breakpoints (0.97, 0.94, 0.87, 0.76, 0.66, 0.57, 0.46, 0.38, 0.30, 0.22, 0.16) with your target hue. Chroma should peak at step 500–600 and fall off at both ends. Register the scale in `src/tokens/color.css` under the primitives block.

### Semantic alias reference

```css
/* Page / surface */
--background        /* canvas — #ffffff light / #0a0a0a dark */
--card              /* card panel — #ffffff light / #101010 dark */
--muted             /* subtle bg — #f2f2f5 light / #181818 dark */

/* Brand */
--primary           /* #0060d4 light / #5393f5 dark */
--primary-foreground/* #ffffff light / #0f0f16 dark */
--primary-hover     /* lighter for hover states */
--primary-pressed   /* darker for pressed states */
--primary-disabled  /* desaturated for disabled CTA */
--primary-ring      /* 30% opacity focus halo */
--primary-subtle    /* barely tinted — selected rows, active nav */
--primary-muted     /* light tint — badges, highlights */

/* Text */
--foreground        /* #0f0f16 light / #f9f9fb dark */
--muted-foreground  /* #55556b light / ~#8888a0 dark */

/* Borders */
--border            /* #e8e8ed light / ~#2a2a35 dark */
--ring              /* focus ring — = --primary in Luma */

/* Status */
--destructive       /* irreversible actions — delete, revoke */
--error             /* validation states — input rings, error banners */
--success / --warning / --info   /* semantic status colors */
```

---

## Dark Mode

### How the swap works

Dark mode is a single `.dark {}` class on `<html>`. All semantic aliases are redefined inside that block in `src/tokens/color.css`. Components reference semantic aliases exclusively — so adding `class="dark"` to the root element swaps the entire visual system with no component-level changes.

```html
<html>             <!-- light mode -->
<html class="dark"> <!-- dark mode — all semantic aliases swap automatically -->
```

**Zero per-component overrides are needed or permitted.** If you find yourself writing `.dark .my-component { … }` in a component file, you're doing it wrong — the token is missing.

### Key alias light/dark table

| Alias | Light | Dark | Notes |
|---|---|---|---|
| `--background` | `#ffffff` | `#0a0a0a` | Near-black canvas |
| `--card` | `#ffffff` | `#101010` | Slightly lifted from bg |
| `--muted` | `#f2f2f5` | `#181818` | UI element default bg |
| `--foreground` | `#0f0f16` | `#f9f9fb` | Primary text |
| `--muted-foreground` | `#55556b` | `~#8888a0` | Secondary text |
| `--border` | `#e8e8ed` | `~#2a2a35` | Dividers and outlines |
| `--primary` | `#0060d4` | `#5393f5` | brand-600 → brand-400 |
| `--primary-foreground` | `#ffffff` | `#0f0f16` | Text on primary bg |
| `--primary-subtle` | `#eef2ff` | brand-950 | Selected row bg |
| `--overlay-bg` | `rgba(0,0,0,0.50)` | `rgba(0,0,0,0.65)` | Denser in dark — compensates for lower contrast |

### Surface lift in dark mode (Geist/Linear convention)

In dark mode, surfaces get **lighter** as they elevate — the opposite of light mode. This keeps modals and floating panels visually separated from the near-black canvas:

```
Canvas:    #0a0a0a   (--background)
Sidebar:   #101010   (--card / subtle)
Card:      #181818   (--muted)
Popover:   #202020   (--bg-element-hover)
```

Shadows supplement this with a white-ring technique: each shadow level adds `0 0 0 1px rgba(255,255,255,N)` where N scales from 4% (xs) to 10% (xl), providing edge definition that's invisible on white canvases.

---

## Typography

### Scale rationale

Luma's type scale is tuned for dense product UI, not marketing sites. The decisions:

- **Negative tracking on display/heading** (`−0.05em`, `−0.025em`) locks large type together and gives it authority. Vercel and Linear both do this.
- **Body text at 0 tracking** — at 14–16px, adding tracking makes text harder to read, not more refined.
- **Weight split at 14px**: `body-sm` (400) for data content that should recede; `body-sm-strong` (500) for interactive labels that need to read clearly. The distinction matters — table cell data vs button label should feel different.
- **Eyebrow / label-uppercase** for table headers and section labels. The 0.08em tracking + uppercase creates visual separation without requiring a larger font size.
- **Geist Mono** for everything fixed-width. Token names, keyboard shortcuts, code, IDs — anything that benefits from alignment rhythm.

### Role reference

| Role | Size · Weight | Leading | Tracking | Use |
|---|---|---|---|---|
| `display` | 40px · 700 | 1.25 | −0.05em | Hero headlines |
| `heading` | 32px · 700 | 1.25 | −0.025em | Page h1 |
| `title` | 24px · 600 | 1.25 | −0.025em | Section h2 |
| `subtitle` | 20px · 600 | 1.375 | 0 | Card titles, h3 |
| `body-lg` | 18px · 500 | 1.5 | 0 | Emphasis paragraphs |
| `body` | 16px · 400 | 1.5 | 0 | Default copy |
| `body-sm` | 14px · 400 | 1.5 | 0 | Table cells, timestamps |
| `body-sm-strong` | 14px · 500 | 1.5 | 0 | Button, Badge, Input labels |
| `caption` | 12px · 400 | 1.5 | 0 | Helper text, metadata |
| `label` | 12px · 500 | 1.25 | 0.1em | Section labels |
| `eyebrow` | 12px · 500 | 1.25 | 0.08em | Table headers, category tags — **+ uppercase** |
| `mono` | 13px · 400 | 1.5 | 0 | Code, tokens, keyboard shortcuts |

Naming bridge: the spec role `body` is exposed as `body-md` in the React `<Text>` API (`<Text variant="body-md">`). All other role names match 1:1.

---

## Layout

### Responsive grid

The grid scales columns, gutters, and margins across breakpoints. The CSS tokens in `layout.css` update via media queries so `--layout-grid-columns`, `--layout-grid-gutter`, and `--layout-grid-margin` always reflect the current viewport.

| Breakpoint | Min-width | Columns | Gutter | Margin | Use case |
|---|---|---|---|---|---|
| xs | — | 4 | 16px | 16px | Mobile portrait |
| sm | 640px | 4 | 16px | 24px | Mobile landscape |
| md | 768px | 8 | 24px | 32px | Tablet portrait |
| lg | 1024px | 12 | 24px | 40px | Desktop |
| xl | 1280px | 12 | 32px | 48px | Wide desktop |
| 2xl | 1536px | 12 | 32px | auto | Ultra-wide (centred) |

Common column spans at 12-col desktop: full-width (12), two-thirds (8), half (6), one-third (4), one-quarter (3), centered narrow (2+8+2).

### Containers

| Name | Max-width | Use |
|---|---|---|
| `xs` | 480px | Narrow forms, auth screens |
| `sm` | 640px | Single-column content pages |
| `md` | 768px | Two-up card layouts |
| `lg` | 1024px | Standard app content area |
| `xl` | 1280px | Wide dashboards, data tables |
| `2xl` | 1440px | Ultra-wide / marketing |

### Responsive breakpoints

| Name | Min-width | Design guidance |
|---|---|---|
| `sm` | 640px | Switch from 1 column to 2 |
| `md` | 768px | Show sidebar |
| `lg` | 1024px | Full desktop layout |
| `xl` | 1280px | Expanded data tables |
| `2xl` | 1536px | Maximum content width |

### Sidebar & panel widths

| Element | Width | Collapsed |
|---|---|---|
| Navigation sidebar | 240px | 52px (icon rail) |
| Detail / settings panel | 320px | — |

The sidebar at 240px is the shadcn default and matches Linear and Vercel's dashboard sidebars. Don't deviate without a strong reason — users have muscle memory for this width.

### Spacing

4px base grid. All spacing is a multiple of 4. The t-shirt aliases are the preferred API and match the CSS `--luma-space-*` scale one to one:

```
xs: 4px    sm: 8px    md: 16px   lg: 24px
xl: 32px   2xl: 48px  3xl: 64px  section: 96px
```

12px has no t-shirt alias by design; reach for the numeric scale (`--luma-space-3`) when a component needs it. Internal component padding (8–16px) uses the lower half of the scale. Page-level white space (32–96px) uses the upper half.

---

## Elevation & Depth

| Level | Shadow | Use | Examples |
|---|---|---|---|
| Flush | none | Filled solid components | Button, Badge, Checkbox |
| Subtle (xs) | 1px soft drop | Bordered / outline controls | Outline button, Input, Select |
| Raised (sm) | 3px drop | Content containers | Card, Slider thumb |
| Floating (md) | 8px drop | Panels floating above page | Dropdown, Popover, HoverCard |
| Overlay (lg) | 24px drop | Full overlays | Dialog, Sheet |
| High (xl) | 48px drop | Toast, command palette | Toast sits above Dialog |
| Highest (2xl) | 64px drop | Extreme elevation (rare) | Command palette on overlay |

Key rule: **filled buttons have no shadow.** The solid colour is the affordance. Adding shadow to a `<Button variant="default">` is a signal the component is miscategorised.

In dark mode, replace drop shadows with the white-ring technique:

```css
/* Example: dark mode Card */
box-shadow:
  0 0 0 1px rgba(255,255,255,0.06),   /* edge ring */
  0 4px 8px rgba(0,0,0,0.40);         /* depth */
```

Ring opacity by elevation level: xs → 4%, sm → 5%, md → 6%, lg → 8%, xl → 10%.

---

## Shapes

Vercel-standard radius language: one consistent 6px default that feels modern without being pill-heavy. Never mix radius scales within a single component group.

| Token | Value | Use |
|---|---|---|
| `rounded.none` | 0 | Tables, full-bleed surfaces |
| `rounded.xs` | 2px | Dense inline elements |
| `rounded.sm` | 4px | Checkbox, small chips |
| `rounded.md` | 6px | Default: Button, Input, Badge, Select, Combobox |
| `rounded.lg` | 8px | Alert, Note, dropdown menus, Skeleton, Toast |
| `rounded.xl` | 12px | Card, Dialog, Sheet |
| `rounded.2xl` | 16px | Large panels, marketing surfaces |
| `rounded.3xl` | 24px | Hero containers (rare) |
| `rounded.pill` | 9999px | Avatar, StatusDot, pill badges, toggle thumbs |

Rules:

- The same component family always shares one radius. All buttons are `md`; all cards are `xl`.
- Pill shapes are reserved for elements that are circular or capsule by nature (avatars, status dots, toggle thumbs). Buttons are never pills.
- Nested radii step down: a `xl` card containing an interactive control uses `md` inside, never the same value.

---

## Components

### State coverage every interactive component must have

Every interactive component needs all five states modeled:

| State | CSS trigger | Visual signal |
|---|---|---|
| **Default** | — | Base appearance |
| **Hover** | `:hover` | Background lift or tint |
| **Focus** | `:focus-visible` | 2px ring, 2px offset, primary color |
| **Pressed / Active** | `:active` | Darker background or scale |
| **Disabled** | `[disabled]` / `aria-disabled` | 0.5–0.6 opacity, no pointer-events |

### Choosing the right component

Overlapping components are the place AI tools (and humans) most often pick wrong. These tables are the tie-breakers; follow them exactly.

**Overlays** — anything that floats above the page:

| Need | Use | Never |
|---|---|---|
| Blocking decision or confirmation the user must answer | Dialog | Toast for confirmations |
| Complex editing or detail view that keeps page context | Sheet | Dialog for long forms |
| Small contextual content anchored to a trigger | Popover | Dialog for a date picker |
| A list of actions on an element | Dropdown Menu | Popover with hand-rolled buttons |
| Label or hint on hover, no interaction inside | Tooltip | Interactive content in a Tooltip |

**Feedback and status:**

| Need | Use |
|---|---|
| Result of an action just performed, transient | Toast |
| Persistent condition of a page or section, status-colored | Alert |
| Persistent inline tip or guidance, quieter than Alert | Note |
| Count or category on an item in lists and tables | Badge |
| Live presence or system state, paired with a label | StatusDot |
| Removable filter or input value | Chip |
| Active waiting after a user action (submit, fetch) | Spinner |
| Passive loading of page or section content | Skeleton |
| Determinate long-running operation | Progress |
| Nothing to display yet | Empty State |

**Button variants** — emphasis is a ladder, not a palette:

| Variant | Use when |
|---|---|
| `default` (primary) | The single most important action on the surface. One per view, no exceptions. |
| `secondary` | The action sitting next to a primary (Cancel beside Save) |
| `outline` | Standalone medium-emphasis actions, toolbars, filters |
| `ghost` | Low-emphasis or repeated actions in dense UI (table rows, list items) |
| `link` | Navigation styled as text, inline with content |
| `destructive` | Irreversible actions only (delete, revoke). Always confirm via Dialog. |
| `success` / `warning` / `info` | Status-tinted actions, rare. Never a substitute for primary. |

**Selection controls:**

| Situation | Use |
|---|---|
| 2–5 options, all visible at once aids the decision | Radio group |
| Up to 6 options, compact space | Select |
| 7+ options, or users know what they're typing | Combobox |
| Multiple independent choices | Checkbox group |
| Binary setting that applies instantly, no Save button | Switch |
| Binary choice submitted with a form | Checkbox |

### Component notes

**Button** — 9 variants. No shadow on filled variants; `shadow-xs` on outline. Warning uses `on-warning: #111111` — white text on amber fails WCAG AA. Icon-only buttons require `aria-label`.

**Input** — Always pair with a visible `<Label>`. Placeholder is a hint, never the only label. Error state uses `--error` ring (not `--destructive`). Never change border-width on error — use a ring to avoid layout shift.

**Checkbox / Radio** — 16×16px. Checkbox gets 4px radius (not pill). Radio gets pill. Both use `--primary` for checked state, 50% opacity for disabled.

**Select / Combobox** — Same trigger height as Input (36px). Menu uses `shadow-md` — above the page but below Dialog. Use Select for ≤6 options, Combobox for ≥7 (adds search).

**Switch** — 36×20px track, 16×16px thumb. Off state uses `--surface-active` (neutral grey), not red — red implies error, not just "off."

**Tabs** — List has a subtle `--surface-2` background with 4px inner padding. Active trigger gets a white background + `shadow-xs`. This is the shadcn "pill tabs" pattern — avoid underline tabs for product UI.

**Accordion** — Triggers should be `<button>` elements (Radix handles this). Open state tints the trigger to `--primary`. Content padding collapses the top padding to zero — the trigger provides top spacing.

**Toast** — Always above Dialog in z-index (500 > 400). Max-width 360px. Use Sonner (`<Sonner>`) not a custom Toast for most cases — it handles stacking and dismiss automatically.

**Avatar** — Always `border-radius: pill`. Fallback (initials) uses `--primary-subtle` background + `--primary` text. Border `2px solid --canvas` creates stacking separation in avatar groups.

**Alert / Callout** — Use the status color's bg/border/text triple — never mix tokens across status groups. Icon color uses the solid status color (e.g., `--success`, not `--success-text`).

**Empty State** — Icon at 48px on a `--surface-2` rounded background. Title in `body-sm-strong`, description in `body-sm` tone muted. Actions use standard `<Button>` — primary CTA if there's one action, outline if secondary.

**Progress** — Track is `--surface-2`, fill defaults to `--primary`. Status variants (success/warning/error) use their solid colors, not the bg/border/text tokens.

**Textarea** — Mirrors Input for focus, error, and disabled states. Min-height 72px (three lines of `body-sm`). Resize vertical only — horizontal resize breaks layouts.

**Sheet** — Same surface treatment as Dialog (canvas bg, `xl` radius on the floating edge, `shadow-lg`, shared overlay). 400px wide from left or right. Use for editing flows that need more room than a Dialog; never for confirmations.

**Popover / HoverCard** — Same visual recipe (canvas, hairline border, `lg` radius, `shadow-md`, 320px max). The difference is the trigger: Popover opens on click and can contain interactive controls; HoverCard opens on hover (300ms delay) and is read-only. Never put a button inside a HoverCard.

**Command palette** — The highest-elevation surface (`shadow-xl`), 560px max. Input row is 44px — taller than a standard Input to signal it's the primary act on this surface. Items follow the select-item pattern: `primary-subtle` background + `primary` text when active. Always show a `<Kbd>` hint for the shortcut that opened it.

**Slider** — Track matches Progress (6px, `--surface-2`, pill). Thumb is a 16px canvas circle with `hairline-strong` border and `shadow-sm` — the one filled control that gets a shadow, because the thumb must read as grabbable.

**Kbd** — Mono 13px on `--surface-1` with a 2px bottom border for key-cap depth. Use for every keyboard shortcut mention: menus, tooltips, command items. Chords render as separate Kbds, not one wide one.

**Note** — Persistent inline guidance. Neutral surface (`--surface-1` + hairline), never status-tinted backgrounds — that's Alert's job. Only the optional icon takes a status color.

**CodeBlock / InlineCode** — Block code on `--surface-1` with hairline border and copy button; inline code on `--surface-2` with `sm` radius. Both always mono. Never style inline code with backticks-as-text.

**StatusDot** — Never appears without a text label within the same flex row. `pulse` is reserved for genuinely live states (deploying, recording, online) — a static "active" status gets a static dot.

**Separator** — 1px `--hairline`, full width or height. Use between list sections and toolbar groups; don't stack a Separator against a bordered element (double line).

---

## Accessibility

### Contrast requirements

Luma targets **WCAG 2.1 AA** as minimum, **AAA** for body text.

| Content type | Minimum ratio | Target |
|---|---|---|
| Body text (< 18pt / 14pt bold) | 4.5 : 1 | 7 : 1 (AAA) |
| Large text (≥ 18pt or 14pt bold) | 3 : 1 | 4.5 : 1 |
| UI components and graphical objects | 3 : 1 | 4.5 : 1 |
| Disabled controls | No requirement | Exempt — conveys unavailability |

**Warning buttons require dark foreground.** `--warning` (#f4ad0a) against white is ~2.3:1. Against `#111111`, it passes AA at ~8.5:1. This is non-negotiable — amber + white text always fails.

Primary blue `#0060d4` against white: ~5.3:1 (passes AA for normal text, AAA for large text).

### Focus ring specification

Every interactive element must show a visible focus indicator on `:focus-visible`. Luma's spec:

```css
:focus-visible {
  outline: 2px solid var(--ring);        /* --ring = --primary */
  outline-offset: 2px;
  box-shadow: 0 0 0 4px                  /* ring-width + ring-offset */
    color-mix(in oklch, var(--ring) 20%, transparent);
}
```

The outer halo (20% opacity primary) helps the ring stand out against both light and dark backgrounds. Never remove `:focus-visible` styling. Never use `outline: none` without a replacement visible indicator.

Geometry is tokenized:
- `--ring-width: 2px`
- `--ring-offset: 2px`
- `--ring: var(--primary)` (semantic alias — swaps automatically in dark mode)

### Touch targets

Minimum 44×44px interactive target (Apple HIG / WCAG 2.5.5 Level AAA). Luma's 36px default component height means icon buttons and small controls must use padding or a larger invisible click area (`min-h-11 min-w-11`) to meet this.

Practical rules:
- Icon buttons: wrap in a 44px container or add `p-2` to expand to 40×40px minimum
- Checkbox / Radio: extend click target via `<label>` — the label expands the target area
- Table row actions: keep action icons at minimum 32×32px with 6px padding (→ 44×44px target)

### Screen reader guidance

- Use Radix primitives for all interactive, focusable elements. Radix sets `role`, `aria-modal`, `aria-labelledby`, `aria-describedby`, and manages focus trapping automatically.
- Every `<Input>` must have a programmatically associated `<Label>` (via `htmlFor`/`id` pairing or wrapping).
- Icon-only buttons require `aria-label`. `<IconButton aria-label="Close" />` — never rely on a tooltip alone.
- Error messages must be wired via `aria-describedby` pointing to the error element's `id`.
- For dialog destructive actions, write the title as a question ("Delete project?") and the confirm button as the verb ("Delete").
- Loading states: use `aria-busy="true"` on the container and `aria-live="polite"` for status updates.

### Reduced motion

All duration tokens collapse to `0ms` at the token layer via:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --luma-duration-instant: 0ms;
    --luma-duration-fast:    0ms;
    --luma-duration-normal:  0ms;
    --luma-duration-slow:    0ms;
    --luma-duration-slower:  0ms;
    --luma-duration-spring:  0ms;
    --luma-duration-bounce:  0ms;
  }
}
```

This is handled once in `src/tokens/motion.css`. Zero per-component `@media` blocks are needed. The skeleton shimmer animation should also stop — the `--skeleton-duration` token becomes `0ms`, which CSS animations respect automatically.

---

## Do's & Don'ts

### Do

1. **Use semantic aliases in every component.** `--primary`, `--background`, `--border` — never a raw OKLCH or hex value.
2. **Use `--primary-hover` / `--primary-pressed` / `--primary-disabled`** for button and interactive element states. These are authored tokens, not inline `color-mix()` — rebrand-safe.
3. **Use `--error` for validation UI.** Input border on bad value, error banner, error toast — all `--error`. Reserve `--destructive` for irreversible action buttons (Delete, Remove, Revoke).
4. **Use `--primary-subtle` / `--primary-muted`** for tinted surfaces — selected rows, active nav, highlighted badges. Never use raw `--luma-brand-*` primitives in components.
5. **Pair every `<Input>` with a visible `<Label>`.** Placeholder disappears on type. It's a hint, not a label.
6. **One primary CTA per surface.** Everything else is `secondary`, `outline`, or `ghost`. Never two `variant="default"` buttons side by side.
7. **Keep all dark-mode overrides in `src/tokens/color.css` under `.dark {}`.** One block, no exceptions.
8. **Use `warning` variant with the built-in dark foreground.** Amber + white text fails WCAG AA.
9. **Add `shadow-xs` to bordered controls (outline button, Input, Select).** No shadow on filled buttons — the solid colour is the affordance.
10. **Set `type` and `autoComplete` on every Input.** Browsers and password managers depend on this. `type="email" autoComplete="email"` beats `type="text"` for every email field.
11. **Use `body-sm-strong` (14px/500) for component labels** — Button, Badge, Input, Nav items. Use `body-sm` (14px/400) for data content — table cells, timestamps, descriptions.
12. **Use `eyebrow` / `label-uppercase` for table headers and section labels.** The 0.08em tracking + uppercase creates hierarchy without requiring a size increase.
13. **Use Radix primitives for all interactive, focusable elements.** Dialog, DropdownMenu, Select, Tooltip, Popover, Tabs — Radix handles ARIA, focus trapping, and keyboard navigation.
14. **Apply `aria-label` to icon-only buttons.** Screen readers announce "button" with no context otherwise.

### Don't

15. **Never hardcode hex, rgb, hsl, or oklch values in component code.** Not even `#ffffff`. Always `var(--background)` or equivalent.
16. **Never hardcode spacing in `px` inline.** Use `--luma-space-*` vars or Tailwind spacing classes (`gap-4`, `p-6`, etc.).
17. **Never write `.dark { … }` overrides inside component files.** All dark mode logic lives in `src/tokens/color.css`. Full stop.
18. **Never use primitive vars (`--luma-brand-500`) in components.** Primitives are for decoration and illustration only. Components touch semantic aliases.
19. **Never change border-width on error state.** It shifts layout. Use a coloured ring (`ring-1 ring-[--error]`) on the existing 1px border instead.
20. **Never use `<div onClick>` for dialogs, menus, tooltips, or dropdowns.** Always Radix. Raw divs break keyboard navigation and screen readers.
21. **Never stack multiple primary buttons in one row.** If you feel the pull, reconsider the information architecture — one action should be primary.
22. **Never open a Dialog on top of another Dialog.** Close the first, or use a nested Popover for inline detail. Stacked modals disorient users.
23. **Never apply `shadow-md` or higher to buttons or small form controls.** That elevation level belongs to floating panels, not interactive controls.
24. **Never rely on placeholder text as the only label.** When the user starts typing, the hint disappears — killing context and accessibility.
25. **Never put toast notifications below `z-toast: 500`.** Dismiss feedback must remain visible even when a dialog is open. The ordering `tooltip (600) > toast (500) > modal (400) > overlay (300)` is non-negotiable.

---

## Agent Usage

### Rules for AI tools building with Luma

1. **Start from CLAUDE.md.** It is the brand constitution — read it first in every new session. It contains the complete token reference, component patterns, Do/Don't rules, and file locations.

2. **Never output raw color values in component code.** Not hex, not `rgb()`, not `oklch()`. Always a CSS custom property from the semantic layer. If a token doesn't exist yet, add it to `src/tokens/` — don't hardcode.

3. **When adding a new component, start from component tokens, not semantic aliases directly.** Define `--mycomponent-bg: var(--card)` in `components.css`, then reference `var(--mycomponent-bg)` in the component. This keeps the architecture coherent and makes per-brand overrides possible without touching component code.

4. **Dark mode is automatic if you use semantic tokens.** You should never need to write `.dark` class logic inside a component file. If dark mode isn't working, the component is referencing a primitive or hardcoded value — trace back to the semantic alias.

5. **All interactive elements use Radix primitives.** If you're about to write a `<div onClick>` for a focusable element, stop. The correct answer is `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, etc. This is non-negotiable for accessibility compliance.

### Prompt pattern

Use this template when initialising a component-generation task:

```
You are building a UI component for Luma, a product-software design system.

Stack: React · TypeScript · Tailwind v4 · CSS Custom Properties · Radix UI primitives.

Architecture rules:
- Use semantic tokens (--primary, --background, --border, --foreground) — never hardcode colors.
- Use component tokens (--button-primary-bg) for component-scoped customisation.
- All interactive elements use Radix primitives — Dialog, DropdownMenu, Select, Tooltip, etc.
- Dark mode is automatic — use semantic aliases. Never add .dark overrides to component files.
- Spacing via --luma-space-* tokens or Tailwind classes (gap-4, p-6, etc.). No inline px values.
- Errors use --error / --luma-error-*. Irreversible actions use --destructive. Never swap these.
- Warning buttons: use the dark foreground (#111111) — amber + white fails WCAG AA.

Reference: /Users/imran/Desktop/ClaudeProjects/AI Design System/CLAUDE.md

Component request: [describe the component, its states, and any variant requirements here]
```

---

## About

Luma was designed and built by [Imran](https://imran.fi/) — a Senior Product Designer focused on design systems and AI-assisted workflows.
