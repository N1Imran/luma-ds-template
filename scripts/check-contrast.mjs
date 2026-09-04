#!/usr/bin/env node
// check-contrast.mjs: computes WCAG 2.1 contrast from the real color values in
// DESIGN.md's front matter and asserts every pair meets its required minimum.
// No dependencies.
//
//   node scripts/check-contrast.mjs           verify (exit 1 on any failure)
//   node scripts/check-contrast.mjs --table   emit the verified markdown table
//
// Why this exists: contrast numbers written by hand go stale the moment a color
// is nudged, and a stale ratio reads exactly like a verified one. Nothing in the
// spec could report the mismatch, so the ratios are computed here at check time
// and the table in DESIGN.md is generated from this output.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Parse the canonical colors out of DESIGN.md front matter
const colors = {};
for (const line of readFileSync(join(root, 'DESIGN.md'), 'utf8').split('\n')) {
  const m = line.match(/^  ([a-z0-9-]+):\s+"(#[0-9a-fA-F]{3,8})"/);
  if (m && !(m[1] in colors)) colors[m[1]] = m[2];
}

// WCAG 2.1 relative luminance and contrast
const channels = (hex) => {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};
const luminance = (hex) => {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)];
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

// The pairs that carry a compliance claim
// min: the ratio this pair MUST meet. 4.5 = AA body text, 3 = AA large text or
// non-text UI. `note` records why a pair is exempt or capped.
const PAIRS = [
  // Light mode: text on surfaces
  ['ink',        'canvas',    4.5, 'Headings and high-contrast text'],
  ['ink',        'surface-1', 4.5, 'Headings on recessed surfaces'],
  ['ink',        'surface-2', 4.5, 'Headings on UI element bg'],
  ['ink-body',   'canvas',    4.5, 'Default body copy'],
  ['ink-body',   'surface-1', 4.5, 'Body copy on recessed surfaces'],
  ['ink-body',   'surface-2', 4.5, 'Body copy on UI element bg'],
  ['ink-muted',  'canvas',    4.5, 'Secondary and helper text'],
  ['ink-muted',  'surface-1', 4.5, 'Secondary text on recessed surfaces'],
  ['ink-muted',  'surface-2', 4.5, 'Secondary text on UI element bg'],
  ['ink-subtle', 'canvas',    4.5, 'Placeholders and tertiary text'],
  ['ink-subtle', 'surface-1', 4.5, 'Tertiary text on recessed surfaces'],
  // ink-subtle on surface-2 is 4.31:1, deliberately NOT listed as a passing
  // pair. See the "surface ceiling" assertion below.

  // Light mode: text on solid fills
  ['on-primary',     'primary',     4.5, 'Label on primary CTA'],
  ['on-success',     'success',     4.5, 'Label on solid success'],
  ['on-warning',     'warning',     4.5, 'Label on solid warning (dark ink, not white)'],
  ['on-error',       'error',       4.5, 'Label on solid error'],
  ['on-info',        'info',        4.5, 'Label on solid info'],
  ['on-destructive', 'destructive', 4.5, 'Label on destructive button'],

  // Light mode: status text on tinted status surfaces
  ['success-text', 'success-bg', 4.5, 'Body copy inside success regions'],
  ['warning-text', 'warning-bg', 4.5, 'Body copy inside warning regions'],
  ['error-text',   'error-bg',   4.5, 'Body copy inside error regions'],
  ['info-text',    'info-bg',    4.5, 'Body copy inside info regions'],

  // Light mode: non-text UI
  ['primary', 'canvas', 3, 'Focus ring against the page'],

  // Dark mode: text on the OKLCH neutral ladder
  ['ink-dark',        'canvas-dark',   4.5, 'Headings, dark mode'],
  ['ink-dark',        'surface-dark-2', 4.5, 'Headings on dark cards'],
  ['ink-body-dark',   'canvas-dark',   4.5, 'Body copy, dark mode'],
  ['ink-body-dark',   'surface-dark-2', 4.5, 'Body copy on dark cards'],
  ['ink-muted-dark',  'canvas-dark',   4.5, 'Secondary text, dark mode'],
  ['ink-muted-dark',  'surface-dark-2', 4.5, 'Secondary text on dark cards'],
  ['ink-muted-dark',  'surface-dark-hover', 4.5, 'Secondary text in dark popovers'],
  ['ink-subtle-dark', 'canvas-dark',   4.5, 'Tertiary text, dark mode'],
  ['ink-subtle-dark', 'surface-dark-2', 4.5, 'Tertiary text on dark cards'],
  ['ink-subtle-dark', 'surface-dark-hover', 4.5, 'Tertiary text in dark popovers'],
  ['primary-dark',    'canvas-dark',   3,   'Focus ring, dark mode'],
  ['on-primary-dark', 'primary-dark',  4.5, 'Label on primary CTA, dark mode'],
];

// Pairs that are exempt from a minimum but still reported, so a reader can see
// the number rather than trust a claim about it.
const EXEMPT = [
  ['ink-disabled',      'canvas',      'Disabled controls, WCAG exempt, conveys unavailability'],
  ['ink-disabled-dark', 'canvas-dark', 'Disabled controls, dark, WCAG exempt'],
  ['on-warning',        'canvas',      'Reference: why warning needs dark ink, not white'],
];

// Known deviations. These are reported every run, never silently passed, and
// never asserted, because asserting a threshold they were not designed to meet
// would just train everyone to ignore a red line. WCAG 1.4.11 covers visual
// information required to *identify* a control; Luma's hairlines are dividers
// and container edges, and every control they enclose is identified by a visible
// label plus a focus ring that does clear 3:1. The input border is the honest
// edge case: it sits at 1.22:1 and is the weakest claim in the system.
const DEVIATIONS = [
  ['hairline',        'canvas', 'dividers and container edges, below the 3:1 in WCAG 1.4.11'],
  ['hairline-strong', 'canvas', 'emphasis borders, below the 3:1 in WCAG 1.4.11'],
];

// A guardrail the ratios alone will not surface: ink-subtle is only AA-safe on
// the two lightest surfaces. Anything darker drops it under 4.5:1, so the spec
// must never bind it to surface-2 or below.
const CEILINGS = [
  { fg: 'ink-subtle', maxSurface: 'surface-2', min: 4.5 },
  { fg: 'ink-subtle-dark', maxSurface: 'surface-dark-active', min: 4.5 },
];

const errors = [];
const rows = [];
const missing = (n) => !(n in colors);

for (const [fg, bg, min, note] of PAIRS) {
  if (missing(fg) || missing(bg)) {
    errors.push(`${fg} on ${bg}: token not found in DESIGN.md front matter`);
    continue;
  }
  const ratio = contrast(colors[fg], colors[bg]);
  const pass = ratio >= min;
  const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : 'fail';
  rows.push({ fg, bg, ratio, min, level, note, pass });
  if (!pass) {
    errors.push(
      `${fg} on ${bg}: ${ratio.toFixed(2)}:1, below the required ${min}:1 (${note})`
    );
  }
}

for (const [fg, bg, note] of EXEMPT) {
  if (missing(fg) || missing(bg)) continue;
  rows.push({ fg, bg, ratio: contrast(colors[fg], colors[bg]), min: null, level: 'exempt', note, pass: true });
}

const deviations = [];
for (const [fg, bg, note] of DEVIATIONS) {
  if (missing(fg) || missing(bg)) continue;
  const ratio = contrast(colors[fg], colors[bg]);
  rows.push({ fg, bg, ratio, min: null, level: 'deviation', note, pass: true });
  deviations.push(`${fg} on ${bg}: ${ratio.toFixed(2)}:1 (${note})`);
}

// Ceiling assertions: these are the failure the table cannot show you.
for (const { fg, maxSurface, min } of CEILINGS) {
  if (missing(fg) || missing(maxSurface)) continue;
  const ratio = contrast(colors[fg], colors[maxSurface]);
  if (ratio >= min) {
    errors.push(
      `${fg} now reaches ${ratio.toFixed(2)}:1 on ${maxSurface}, so the documented ` +
      `"never place ${fg} on ${maxSurface} or darker" rule is stale and must be updated.`
    );
  }
}

// Output
if (process.argv.includes('--table')) {
  console.log('| Foreground | Background | Ratio | Required | Level |');
  console.log('|---|---|---|---|---|');
  for (const r of rows) {
    console.log(
      `| \`${r.fg}\` | \`${r.bg}\` | ${r.ratio.toFixed(2)}:1 | ${r.min ? r.min + ':1' : 'n/a'} | ${r.level} |`
    );
  }
  process.exit(errors.length ? 1 : 0);
}

if (errors.length) {
  console.error(`✗ ${errors.length} contrast problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `✓ contrast verified: ${rows.filter((r) => r.min).length} asserted pairs pass, ` +
  `${CEILINGS.length} surface ceilings held.`
);
if (deviations.length) {
  console.log(`  ${deviations.length} documented deviation(s), reported not asserted:`);
  for (const d of deviations) console.log(`    - ${d}`);
}
