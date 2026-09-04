#!/usr/bin/env node
// check.mjs: runs every Luma consistency check. Exits non-zero if any fail.
//
//   node scripts/check.mjs
//
// The four checks answer four different questions, and none of them can cover
// for another:
//   check-tokens.mjs      do the JSON exports still match DESIGN.md?
//   check-contrast.mjs    does the palette still meet the AA it claims?
//   check-oklch.mjs       do the published OKLCH coordinates still match their hex?
//   check-hardcoded.mjs   does generated UI actually consume the tokens, or
//                         just hardcode the values next to them?

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const checks = ['check-tokens.mjs', 'check-contrast.mjs', 'check-oklch.mjs', 'check-hardcoded.mjs'];

let failed = 0;
for (const c of checks) {
  const r = spawnSync(process.execPath, [join(here, c)], { stdio: 'inherit' });
  if (r.status !== 0) failed++;
}

if (failed) {
  console.error(`\n✗ ${failed} of ${checks.length} checks failed.`);
  process.exit(1);
}
console.log(`\n✓ all ${checks.length} checks passed.`);
