#!/usr/bin/env node
// check-tokens.mjs: drift guard for Luma's machine-readable layer.
// Verifies that tokens.json and registry.json stay consistent with DESIGN.md,
// the canonical source. No dependencies. Run: node scripts/check-tokens.mjs
//
// Checks:
//   1. tokens.json and registry.json are valid JSON.
//   2. Every color hex in tokens.json matches DESIGN.md's front matter
//      (rgba values are compared against their 8-digit hex equivalents).
//   3. Every token a component binds in registry.json resolves to a real
//      token in tokens.json (wildcard "<group>.*" bindings are skipped).
//   4. Every component in registry.json has at least one spec entry in the
//      DESIGN.md components block, because the registry cannot claim a component
//      the canonical spec does not describe.
//   5. The component counts written in the prose (README.md, llms.txt, DESIGN.md)
//      match the real count. Prose numbers drifted silently before this check
//      existed: the repo simultaneously claimed 45, 52 and 56 components.
//   6. The version string agrees across DESIGN.md, tokens.json and registry.json.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');

const errors = [];
const fail = (msg) => errors.push(msg);

// ── 1. Parse ────────────────────────────────────────────────────────────────
let tokens, registry;
try { tokens = JSON.parse(read('tokens.json')); } catch (e) { fail(`tokens.json invalid JSON: ${e.message}`); }
try { registry = JSON.parse(read('registry.json')); } catch (e) { fail(`registry.json invalid JSON: ${e.message}`); }
if (errors.length) { report(); process.exit(1); }

// ── 2. tokens.json colors vs DESIGN.md ───────────────────────────────────────
// rgba → 8-digit hex equivalents used in tokens.json (kept explicit, not computed,
// so a wrong conversion is caught rather than silently re-derived).
const rgbaToHex = {
  'rgba(0,96,212,0.30)': '#0060d44d',
  'rgba(0,0,0,0.50)': '#00000080',
  'rgba(255,255,255,0.08)': '#ffffff14',
  'rgba(255,255,255,0.14)': '#ffffff24',
  'rgba(255,255,255,0.05)': '#ffffff0d',
};
const designColors = {};
for (const line of read('DESIGN.md').split('\n')) {
  const m = line.match(/^  ([a-z0-9-]+):\s+"(#[0-9a-fA-F]{3,8}|rgba\([^)]*\))"/);
  if (m && !(m[1] in designColors)) designColors[m[1]] = m[2];
}
let colorsChecked = 0;
for (const [name, def] of Object.entries(tokens.color || {})) {
  if (name.startsWith('$') || !(name in designColors)) continue;
  colorsChecked++;
  let expected = designColors[name];
  if (expected.startsWith('rgba')) expected = rgbaToHex[expected] ?? expected;
  const got = String(def.$value).toLowerCase();
  if (got !== expected.toLowerCase()) {
    fail(`color.${name}: tokens.json="${got}" but DESIGN.md="${expected}"`);
  }
}
if (!colorsChecked) fail('no colors cross-checked, so DESIGN.md parsing likely broke');

// ── 3. registry token bindings resolve in tokens.json ────────────────────────
const resolve = (path) => {
  const [group, ...rest] = path.split('.');
  const leaf = rest.join('.');
  if (!tokens[group]) return false;
  if (leaf === '*' || leaf === '') return true; // wildcard / whole group
  return Object.prototype.hasOwnProperty.call(tokens[group], leaf);
};
let bindingsChecked = 0;
for (const c of registry.components || []) {
  for (const ref of c.tokens || []) {
    bindingsChecked++;
    if (!resolve(ref)) fail(`${c.name}: token binding "${ref}" not found in tokens.json`);
  }
}

// ── 4. Every registry component is specified in DESIGN.md ────────────────────
// The registry names components in PascalCase; the DESIGN.md components block
// keys them in kebab-case and often splits one component across several state
// entries (Select → select-trigger, select-menu, select-item). This map is
// explicit rather than inferred, so a rename fails loudly instead of silently
// matching nothing and reporting full coverage.
const designMd = read('DESIGN.md');
const componentsBlock = designMd.slice(
  designMd.indexOf('\ncomponents:'),
  designMd.indexOf('\nicons:')
);
const specKeys = new Set(
  [...componentsBlock.matchAll(/^  ([a-zA-Z][a-zA-Z0-9_-]*):/gm)].map((m) => m[1])
);
if (specKeys.size < 50) fail(`only ${specKeys.size} spec keys parsed from DESIGN.md, so the components block format changed and this check went blind`);

const prefixFor = (name) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const ALIAS = {
  RadioGroup: 'radio',
  DropdownMenu: 'dropdown-menu',
  Command: 'command',
  NavItem: 'nav-item',
  Form: 'form',
  Progress: 'progress',
  Table: 'table',
  Tabs: 'tabs',
  Accordion: 'accordion',
  Breadcrumb: 'breadcrumb',
  Pagination: 'pagination',
  Slider: 'slider',
  Switch: 'switch',
  ScrollArea: 'scroll-area',
  Collapsible: 'collapsible',
  IconButton: 'icon-button',
};
let covered = 0;
for (const c of registry.components || []) {
  const prefix = ALIAS[c.name] ?? prefixFor(c.name);
  const hit = [...specKeys].some((k) => k === prefix || k.startsWith(prefix + '-'));
  if (hit) covered++;
  else fail(`registry component "${c.name}" has no spec entry in DESIGN.md (looked for "${prefix}" or "${prefix}-*")`);
}

// ── 5. Prose counts match reality ────────────────────────────────────────────
const realCount = (registry.components || []).length;
const countClaims = [
  ['README.md', /(\d+)\+? component specs/],
  ['llms.txt', /~?(\d+) component specs/],
  ['DESIGN.md', /~?(\d+) component specs/],
];
for (const [file, re] of countClaims) {
  const text = file === 'DESIGN.md' ? designMd : read(file);
  const m = text.match(re);
  if (!m) { fail(`${file}: no component-count claim found, so the wording changed and this check went blind`); continue; }
  if (Number(m[1]) !== realCount) {
    fail(`${file}: claims ${m[1]} component specs, registry.json has ${realCount}`);
  }
}

// ── 6. Version agreement ─────────────────────────────────────────────────────
const designVersion = designMd.match(/^version:\s*"([^"]+)"/m)?.[1];
const tokensVersion = tokens.$extensions?.['com.luma']?.version;
const registryVersion = registry.version;
if (!designVersion) fail('DESIGN.md: no version in front matter');
for (const [label, v] of [['tokens.json', tokensVersion], ['registry.json', registryVersion]]) {
  if (v !== designVersion) fail(`${label} version "${v}" does not match DESIGN.md "${designVersion}"`);
}

// ── Report ───────────────────────────────────────────────────────────────────
function report() {
  if (errors.length) {
    console.error(`✗ ${errors.length} problem(s):`);
    for (const e of errors) console.error(`  - ${e}`);
  }
}
report();
if (errors.length) process.exit(1);
console.log(
  `✓ machine-readable layer in sync: ${colorsChecked} colors, ${bindingsChecked} token bindings, ` +
  `${covered}/${registry.components.length} components specified in DESIGN.md, v${designVersion} across all three files.`
);
