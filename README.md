# LumaUI

An AI-readable design system specification. Luma answers one question: what does it take for an AI coding tool to generate UI that is already on-brand, with no style cleanup and no back-and-forth?

**Luma is a portfolio project, not an open-source template.** You are welcome to clone it and test it with your AI tools. It is not licensed for reuse in your own products. See [License](#license).

**Target stack:** React · TypeScript · Radix UI · Tailwind CSS v4 · OKLCH color science

---

## The idea

Most design systems are documented for humans. Luma is documented for AI tools first. The repo is the documentation layer of the system, and it does the heavy lifting through three files:

**`DESIGN.md`** — the canonical brand spec, written in the DESIGN.md format that Google Stitch introduced and that Claude Code, Cursor, and Windsurf read natively. Machine-readable tokens live in the YAML front matter; the reasoning behind every decision lives in the prose. Colors, typography, spacing, elevation, shapes, 45+ component specs with states, decision tables for picking between overlapping components, accessibility rules, and explicit guardrails for agents.

**`CLAUDE.md`** — the engineering constitution. Claude Code reads it automatically at the start of every session: the three-layer token architecture, component patterns, dark mode rules, iconography, and Figma conventions.

**`AGENTS.md`** — the entry point for every other agent (Cursor, Codex, Gemini CLI), pointing to the two files above.

---

## Token architecture

Tokens are organized in three layers so one change propagates cleanly:

```
Primitive    --luma-brand-600, --luma-neutral-50
     ↓
Semantic     --primary, --background, --border
     ↓
Component    --button-primary-bg, --card-radius
```

Colors are OKLCH throughout, so every scale step is perceptually uniform and dark mode works from a single `.dark {}` alias swap. Components never know dark mode exists.

---

## Try it

1. Clone the repo
2. Open Claude Code (or Cursor, or any agent that reads `AGENTS.md`) in the folder
3. Ask for a screen: *"Build a settings page with a sidebar, a profile form, and a danger zone"*
4. The output uses Luma's tokens, spacing, radius, and component rules from the first message

That is the whole demo. The spec is the product.

---

## What this repo is, and is not

This repo contains the specification layer of Luma: the files an AI tool needs to ship on-brand UI. The full implementation, with 56 React components, 300+ documented Storybook examples, and a Figma library wired up through Code Connect, is a separate private project. If you are a hiring manager or potential client and want a walkthrough, get in touch.

---

## License

Licensed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). In short: clone it, study it, test it with your tools, share it with credit. Do not use it commercially, distribute modified versions, or present it as your own. See [LICENSE](LICENSE) for details, or contact me for anything beyond these terms.

---

## About

Built by [Imran](https://imran.fi/), a Senior Product Designer focused on design systems and AI-assisted workflows. LumaUI came out of a real question: what does it take for an AI tool to generate components that are already correct, without needing to be corrected?

The answer was a structured spec the AI reads before writing a single line of code.
