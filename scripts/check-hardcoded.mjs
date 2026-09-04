#!/usr/bin/env node
// check-hardcoded.mjs: fails when implementation code hardcodes a hex color or a
// raw px spacing/sizing/radius value instead of referencing a Luma token.
// No dependencies.
//
//   node scripts/check-hardcoded.mjs [path ...]   lint given paths (default: whole repo)
//
// AGENTS.md tells agents "never hardcode hex, px spacing, or radius values",
// but a prose rule an agent can silently ignore is not enforcement, it's a
// suggestion. This makes it a build failure instead.
//
// What counts as a violation:
//   - any hex color literal (#0060d4, #fff, #ffffff80) in a CSS/HTML/JS/TS file
//   - any raw px value on a spacing, sizing, or radius property
//     (margin, padding, gap, width, height, inset, border-radius, font-size, ...)
//   - a Tailwind arbitrary-value bracket carrying a px number (w-[240px], p-[16px])
//
// What is exempt, deliberately:
//   - the token DEFINITION itself: a line assigning a CSS custom property
//     (--space-md: 16px; or "--primary": "#0060d4") is where literal values are
//     supposed to live, in the primitive/semantic layer, not a component
//     hardcoding around the token system. Only USE sites are flagged.
//   - border/outline WIDTH (1px solid ...): Luma tokenizes the border's color,
//     never its width. DESIGN.md's own component specs write literal "1px solid
//     {colors.hairline}" throughout, so flagging it here would fail on spec-
//     correct code. Only spacing/sizing/radius properties are checked.
//   - the spec's own prose and data files (DESIGN.md, tokens.json, registry.json,
//     etc.), see SKIP_FILES below. They document what the tokens equal; that is
//     not the same as a component bypassing them.
//   - any line containing the marker "luma-allow", for the rare justified case.
//
// This is a regex heuristic over source text, not a CSS/JS parser, in keeping
// with how the other check-*.mjs scripts read DESIGN.md. It will not catch
// every disguised literal, and it can occasionally flag a false positive. Treat
// a finding as "look at this line," not as an infallible verdict.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SCAN_EXTENSIONS = new Set(['.css', '.scss', '.less', '.html', '.vue', '.svelte', '.js', '.jsx', '.ts', '.tsx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', 'scripts']);
const SKIP_FILES = new Set([
  'design.md', 'claude.md', 'agents.md', 'machine-readable.md', 'readme.md', 'changelog.md',
  'license', 'llms.txt', 'tokens.json', 'registry.json',
  'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml',
]);

// Properties where a raw px value bypasses the spacing/sizing/radius scale.
// Deliberately excludes border/outline WIDTH, see header note.
const PX_PROPS = [
  'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'gap', 'row-gap', 'column-gap', 'rowGap', 'columnGap',
  'top', 'right', 'bottom', 'left', 'inset',
  'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
  'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'border-radius', 'borderRadius',
  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'font-size', 'fontSize',
];
const escapeRe = (s) => s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
const HEX_RE = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;
const PX_PROP_RE = new RegExp(
  `\\b(${PX_PROPS.map(escapeRe).join('|')})\\b\\s*[:=]\\s*['"\`]?[^;,'"\`\\n]*?(\\d+(?:\\.\\d+)?)px`,
  'gi'
);
const TAILWIND_ARBITRARY_PX_RE = /-\[(\d+(?:\.\d+)?)px\]/g;
const CUSTOM_PROP_LINE_RE = /^\s*['"]?--[\w-]+['"]?\s*[:=]/;
// "top"/"right"/"bottom"/"left"/"width" also spell the tail of border-* and
// outline-* WIDTH properties (border-right, border-top-width, outline-width).
// Those are exempt (see header note), so a match immediately after one of
// these prefixes is a border/outline width, not a flagged spacing property.
const BORDER_WIDTH_PREFIX_RE = /(?:border|outline)-(?:top-|right-|bottom-|left-)?$/i;

function walk(path, files) {
  const st = statSync(path);
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(relative(root, path).split('/').pop())) return;
    for (const entry of readdirSync(path)) walk(join(path, entry), files);
  } else if (SCAN_EXTENSIONS.has(extname(path)) && !SKIP_FILES.has(entry_basename(path))) {
    files.push(path);
  }
}
const entry_basename = (p) => p.split('/').pop().toLowerCase();

const targets = process.argv.slice(2);
const files = [];
for (const t of targets.length ? targets : [root]) walk(join(root, t.startsWith('/') ? relative(root, t) : t), files);

const findings = [];
let scanned = 0;
let inBlockComment = false;

for (const file of files) {
  scanned++;
  const rel = relative(root, file);
  const lines = readFileSync(file, 'utf8').split('\n');
  inBlockComment = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (inBlockComment) {
      if (trimmed.includes('*/')) inBlockComment = false;
      continue;
    }
    if (trimmed.startsWith('/*') && !trimmed.includes('*/')) { inBlockComment = true; continue; }
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('<!--')) continue;
    if (raw.includes('luma-allow')) continue;
    if (CUSTOM_PROP_LINE_RE.test(raw)) continue; // token definition, not a use site

    for (const m of raw.matchAll(HEX_RE)) {
      findings.push({
        file: rel, line: i + 1, kind: 'hex',
        detail: `hardcoded color "${m[0]}", reference a semantic color token instead (e.g. var(--primary), var(--hairline))`,
        snippet: trimmed,
      });
    }
    for (const m of raw.matchAll(PX_PROP_RE)) {
      if (BORDER_WIDTH_PREFIX_RE.test(raw.slice(0, m.index))) continue; // border/outline width, exempt
      findings.push({
        file: rel, line: i + 1, kind: 'px',
        detail: `hardcoded "${m[1]}: ${m[2]}px", reference a spacing or radius token instead (e.g. var(--space-md), var(--rounded-md))`,
        snippet: trimmed,
      });
    }
    for (const m of raw.matchAll(TAILWIND_ARBITRARY_PX_RE)) {
      findings.push({
        file: rel, line: i + 1, kind: 'tailwind-arbitrary',
        detail: `Tailwind arbitrary value "[${m[1]}px]" bypasses the token scale, use a themed utility (e.g. p-4, rounded-md) instead`,
        snippet: trimmed,
      });
    }
  }
}

if (findings.length) {
  console.error(`✗ ${findings.length} hardcoded value(s) in ${new Set(findings.map((f) => f.file)).size} file(s):`);
  for (const f of findings) console.error(`  - ${f.file}:${f.line}: ${f.detail}\n      ${f.snippet}`);
  process.exit(1);
}
console.log(`✓ no hardcoded hex or px spacing/radius values found (${scanned} file(s) scanned).`);
