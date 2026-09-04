# Machine-Readable Luma

Luma is documented for AI tools first. This file explains how the pieces fit together so an agent (Claude Code, Cursor, v0, Stitch, a custom MCP server, or a token registry) can read Luma and ship on-brand UI without parsing source files or guessing.

The design follows what the field converged on through 2026: **structured JSON for data, Markdown for rules, organized as independent layers with progressive disclosure.** The rationale is at the bottom of this file.

---

## The three layers

Luma separates *what the values are* from *how to use them*, and keeps each layer in the format an agent reads most efficiently.

| Layer | Question it answers | File(s) | Format |
|---|---|---|---|
| **Foundation** | What are the raw design decisions? | [`tokens.json`](tokens.json) | W3C DTCG JSON |
| **Component** | What components exist and how are they shaped? | [`registry.json`](registry.json) | JSON manifest |
| **Rules** | How do I use them correctly? | [`CLAUDE.md`](CLAUDE.md), [`AGENTS.md`](AGENTS.md), [`DESIGN.md`](DESIGN.md) prose | Markdown |

Above all three sits one canonical source and one index:

- **[`DESIGN.md`](DESIGN.md)**: the single source of truth. Its YAML front matter is the canonical token + component definition; its prose carries the reasoning. `tokens.json` and `registry.json` are *exports* of it. **If any file disagrees with `DESIGN.md`, `DESIGN.md` wins.**
- **[`llms.txt`](llms.txt)**: the entry-point index. An agent that finds this file knows what every other file is for and the order to read them in.

---

## File-by-file

### `tokens.json`: foundation layer (DTCG)

The complete foundation in [W3C Design Tokens Format](https://www.designtokens.org/): `color`, `space`, `radius`, `fontFamily`, `typography` (composite roles), `duration`, `easing`, `shadow` (composite), and `zIndex`.

- Every token has a `$type`, `$value`, and `$description`.
- Values are **sRGB hex mirrors of the canonical OKLCH** definitions in `DESIGN.md`. OKLCH is the source of truth for color science; hex is provided because that is what tools ingest.
- Provenance (version, source, license) lives under the root `$extensions.com.luma`.
- Drop-in for Style Dictionary, Tokens Studio, and any DTCG-aware pipeline. To regenerate after a palette change: edit OKLCH in `DESIGN.md`, recompute hex, update `tokens.json`.

> **Drift guards:** run `node scripts/check.mjs` after editing any of these files. It runs three checks that answer three different questions, none of which can cover for another:
>
> | Check | Asserts |
> |---|---|
> | `check-tokens.mjs` | JSON is valid; every color in `tokens.json` matches `DESIGN.md`; every `registry.json` token binding resolves; every registry component has a `DESIGN.md` spec; prose component counts match the real count; the version agrees across all three files. |
> | `check-contrast.mjs` | Every text and UI pair meets the ratio the spec claims for it, computed from the shipped hex. Also enforces the `--ink-subtle` surface ceilings and reports the documented border deviations. `--table` regenerates the contrast table in `DESIGN.md`. |
> | `check-oklch.mjs` | Every OKLCH coordinate published in `DESIGN.md` still matches the hex beside it, and the hue map matches the shipped values. |
>
> Since `DESIGN.md` is canonical, this is how the exports stay honest. And since a
> hand-written number reads exactly like a computed one, it is also how the *prose*
> stays honest. Every one of these checks exists because that specific thing had
> already drifted: see `CHANGELOG.md` for v1.4.0.

### `registry.json`: component layer

A manifest with one entry per component. Each entry carries: `category`, `description`, `variants`, `sizes`, `states`, `tokens` (which foundation tokens it binds), `rules` (the non-obvious constraints), an `example`, and a `specRef` back into `DESIGN.md`.

This rolls the 139 component-token states in `DESIGN.md` up into 52 logical components. It is the payload an agent loads *on demand* when it needs a specific component's shape, far cheaper than reading the full spec.

> **Honest scope:** `registry.json` is `"status": "specification"` and `"installable": false`. This repo is the spec layer; the React/TypeScript source, Storybook, and Figma library are a separate private project. The `import` fields describe the intended package API, not code shipped here. Use the manifest as authoritative for component *shape, tokens, and rules*. Not as an installable component source.

### `CLAUDE.md` / `AGENTS.md` / `DESIGN.md` prose: rules layer

The always-on rules that keep output on-brand: semantic-token-only usage, the `destructive` vs `error` distinction, warning-uses-dark-text, no per-component dark overrides, the elevation ladder, icon stroke rules. These are Markdown because they are reasoning and constraints, not lookups, and because `CLAUDE.md` and `AGENTS.md` are auto-loaded by their respective tools every session.

---

## How an AI tool should consume Luma

1. **Discover**: read [`llms.txt`](llms.txt) to learn the file map.
2. **Load rules once, always-on.** `AGENTS.md` (orchestration) → `CLAUDE.md` (constitution). These stay in context for the whole session so foundations are never ignored.
3. **Load foundation**: `tokens.json` for the values the rules refer to (colors, spacing, type).
4. **Load components on demand**: pull only the `registry.json` entries for the components in the current task.
5. **Escalate to `DESIGN.md`**: when a choice is ambiguous (which overlay? which button variant?), the prose decision tables in `DESIGN.md` are the tie-breakers.

```
llms.txt ──▶ AGENTS.md ─┬─▶ CLAUDE.md        (rules, always-on)
                        ├─▶ tokens.json       (foundation, always-on)
                        └─▶ registry.json     (components, on-demand)
                              │
                              └─▶ DESIGN.md    (canonical source + tie-breakers)
```

---

## Why this shape: the evidence

The structure is not arbitrary. Through 2025–2026, teams making design systems machine-readable converged on the same findings:

- **JSON beats Markdown for data.** Indeed benchmarked 8 formats across 1,056 prompts (Markdown, plain Markdown, hybrid, JSON, TOON). JSON won on accuracy *and* used roughly **80% fewer tokens**, cutting per-query context from ~30k to ~6k. "JSON is like a contract: explicit keys, explicit values, explicit boundaries, no ambiguity." That is why `tokens.json` and `registry.json` are JSON, not prose tables.
- **Markdown stays for rules.** Natural-language constraints and rationale belong in Markdown (`CLAUDE.md`, `AGENTS.md`), loaded as always-on context.
- **Layers, not a monolith.** Separating foundation / component / rules into independent "context bubbles" (the pattern Spotify and others describe) lets an agent reason without loading everything at once.
- **Progressive disclosure prevents foundation violations.** On-demand-only setups (e.g. MCP that returns just the component you asked for) produced output that ignored spacing, type, and color, because that foundation was never pulled into the prompt. The fix is always-on rules + foundation, *plus* on-demand components, exactly the read order above.
- **`AGENTS.md` as orchestration, `llms.txt` as index** are the emerging conventions for pointing agents at the right files with the right trust levels.

### Roadmap (not in this repo yet)

- **MCP server**: expose `registry.json` over the Model Context Protocol so agents query components on demand instead of loading the whole manifest.
- **Generated exports**. Tailwind theme config and a CSS custom-property bundle derived from `tokens.json`.

---

## Sources

- [How Indeed Made Their Design System Machine-Readable for MCP and LLMs](https://intodesignsystems.substack.com/p/ai-design-system-mcp-example)
- [Your Design System Is Not Ready for AI Agents](https://www.intodesignsystems.com/blog/design-system-not-ready-for-ai-agents)
- [Design Tokens Format Module (W3C DTCG)](https://www.designtokens.org/tr/drafts/format/)
- [What is DESIGN.md? Google's Open-Source Format for AI Design Systems](https://designmd.app/what-is-design-md/)
- [llms.txt specification](https://llmstxt.org/)
