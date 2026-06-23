#!/usr/bin/env node
// check-tokens.mjs — drift guard for Luma's machine-readable layer.
// Verifies that tokens.json and registry.json stay consistent with DESIGN.md,
// the canonical source. No dependencies. Run: node scripts/check-tokens.mjs
//
// Checks:
//   1. tokens.json and registry.json are valid JSON.
//   2. Every color hex in tokens.json matches DESIGN.md's front matter
//      (rgba values are compared against their 8-digit hex equivalents).
//   3. Every token a component binds in registry.json resolves to a real
//      token in tokens.json (wildcard "<group>.*" bindings are skipped).

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
if (!colorsChecked) fail('no colors cross-checked — DESIGN.md parsing likely broke');

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

// ── Report ───────────────────────────────────────────────────────────────────
function report() {
  if (errors.length) {
    console.error(`✗ ${errors.length} problem(s):`);
    for (const e of errors) console.error(`  - ${e}`);
  }
}
report();
if (errors.length) process.exit(1);
console.log(`✓ machine-readable layer in sync — ${colorsChecked} colors, ${bindingsChecked} token bindings, ${registry.components.length} components.`);
