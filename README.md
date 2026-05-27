# LumaUI

A React design system template you can fork, make your own, and ship. Built for B2B SaaS and product teams who want a solid foundation without starting from scratch.

**Stack:** React · TypeScript · Radix UI · Tailwind CSS v4 · Storybook

---

## The idea

Most design system templates give you components. LumaUI gives you components *and* a way to work with AI tools without losing consistency.

The repo ships two files that do the heavy lifting:

**`DESIGN.md`** — the complete design spec. Every color, spacing value, typography scale, and component definition in one place. Edit this file to match your brand.

**`CLAUDE.md`** — a constitution for AI tools. Claude Code reads this automatically at the start of every session, so when you ask it to build a new component, it already knows your tokens, your rules, and your architecture. The output is correct from the first message — no style cleanup, no back-and-forth.

---

## Token architecture

Tokens are organized in three layers so you can change one thing without breaking everything else:

```
Primitive    --luma-brand-600, --luma-neutral-50
     ↓
Semantic     --primary, --background, --border
     ↓
Component    --button-primary-bg, --card-radius
```

Dark mode lives in one place — a single `.dark {}` block. Components never need to know about it.

---

## Making it yours

1. Fork the repo
2. Edit `DESIGN.md` — change colors, type scale, spacing, radius to match your brand
3. Run `pnpm tokens:gen-components` to regenerate the token CSS
4. Open Claude Code — it picks up your changes automatically

---

## What's included

| | |
|---|---|
| **Tokens** | Color, typography, spacing, radius, shadow, motion |
| **Components** | Button, Input, Select, Card, Badge, Alert, Dialog, Toast, Tabs, Table, Sidebar, and more |
| **Dark mode** | First-class — zero per-component overrides |
| **Storybook** | All components documented with variants and states |
| **Figma** | Code Connect — real import code in Dev Mode |

---

## Quick start

```bash
git clone https://github.com/N1Imran/luma-ds-template
cd luma-ds-template
pnpm install
pnpm dev
```

---

## About

Built by [Imran](https://imran.fi/) — a Senior Product Designer focused on design systems and AI-assisted workflows. LumaUI came out of a real question: what does it take for an AI tool to generate components that are already correct, without needing to be corrected?

The answer was a structured spec file the AI reads before writing a single line of code.
