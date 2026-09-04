#!/usr/bin/env node
// check-oklch.mjs: asserts that every OKLCH coordinate published in DESIGN.md
// still matches the sRGB hex it sits next to. No dependencies.
//
//   node scripts/check-oklch.mjs
//
// Why this exists: DESIGN.md publishes an OKLCH coordinate beside each hex so the
// palette can be extended in the same color space. A coordinate and the hex it
// describes are two separate sources of truth, and nothing in either one can
// report a mismatch, because a stale coordinate reads exactly like a live one. So the
// coordinates are recomputed from the hex here and the run fails on drift.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const design = readFileSync(join(root, 'DESIGN.md'), 'utf8');

// sRGB hex to OKLCH (Ottosson's oklab)
function hexToOklch(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  let hue = (Math.atan2(B, A) * 180) / Math.PI;
  if (hue < 0) hue += 360;
  return { L, C: Math.hypot(A, B), h: hue };
}

const errors = [];

// Every "| `#hex` | `oklch(L C H)` |" row in the file
// Tolerances: L and C are stable under 8-bit quantization; hue is not, once
// chroma drops toward neutral. Below the chroma floor hue is not asserted at all,
// because a 15° swing there is quantization noise, not drift.
const CHROMA_FLOOR = 0.02;
const TOL = { L: 0.002, C: 0.002, h: 1.5 };

const rowRe = /\|\s*`(#[0-9a-fA-F]{6})`\s*\|\s*`oklch\(([\d.]+)\s+([\d.]+)\s+(\d+)\)`\s*\|/g;
let checked = 0;
for (const m of design.matchAll(rowRe)) {
  const [, hex, L, C, h] = m;
  const actual = hexToOklch(hex);
  checked++;
  const claimed = { L: parseFloat(L), C: parseFloat(C), h: parseFloat(h) };
  if (Math.abs(actual.L - claimed.L) > TOL.L)
    errors.push(`${hex}: L is ${actual.L.toFixed(3)}, published ${claimed.L}`);
  if (Math.abs(actual.C - claimed.C) > TOL.C)
    errors.push(`${hex}: C is ${actual.C.toFixed(3)}, published ${claimed.C}`);
  if (actual.C >= CHROMA_FLOOR) {
    let d = Math.abs(actual.h - claimed.h);
    if (d > 180) d = 360 - d;
    if (d > TOL.h) errors.push(`${hex}: hue is ${actual.h.toFixed(0)}, published ${claimed.h}`);
  }
}
if (!checked) errors.push('no OKLCH rows parsed from DESIGN.md, so the table format changed and this check went blind');

// The hue map, asserted against the shipped semantic values
// Neutral is deliberately absent: it sits below the chroma floor.
const HUE_MAP = {
  primary: 258,
  error: 27,
  success: 148,
  warning: 79,
  info: 261,
};
const colors = {};
for (const line of design.split('\n')) {
  const m = line.match(/^  ([a-z0-9-]+):\s+"(#[0-9a-fA-F]{3,8})"/);
  if (m && !(m[1] in colors)) colors[m[1]] = m[2];
}
for (const [name, claimedHue] of Object.entries(HUE_MAP)) {
  if (!(name in colors)) {
    errors.push(`hue map: "${name}" is not a color in DESIGN.md front matter`);
    continue;
  }
  const actual = hexToOklch(colors[name]);
  let d = Math.abs(actual.h - claimedHue);
  if (d > 180) d = 360 - d;
  if (d > TOL.h) {
    errors.push(
      `hue map: ${name} (${colors[name]}) measures hue ${actual.h.toFixed(0)}, ` +
      `but the map publishes ${claimedHue}`
    );
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} OKLCH drift problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `✓ OKLCH verified: ${checked} published coordinates match their hex, ` +
  `${Object.keys(HUE_MAP).length} hue-map entries match the shipped values.`
);
