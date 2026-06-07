#!/usr/bin/env node

/**
 * Generates cli/engine/detect-antipatterns-browser.js
 * by concatenating the browser-safe detector modules and wrapping them in an IIFE.
 *
 * Run: node scripts/build-browser-detector.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MODULES = [
  'cli/engine/shared/constants.mjs',
  'cli/engine/registry/antipatterns.mjs',
  'cli/engine/shared/color.mjs',
  'cli/engine/rules/checks.mjs',
  'cli/engine/browser/injected/index.mjs',
];
const OUTPUT = path.join(ROOT, 'cli/engine/detect-antipatterns-browser.js');

function browserSafeModule(relPath) {
  let code = fs.readFileSync(path.join(ROOT, relPath), 'utf-8');
  if (relPath === 'cli/engine/registry/antipatterns.mjs') {
    // The registry's severity lives partly OUTSIDE the array (the
    // SEVERITY_OVERRIDES map + the default-assignment loop), so extract all
    // three blocks. Missing the loop once shipped an all-minor (all-yellow)
    // overlay.
    const arrayMatch = code.match(/const ANTIPATTERNS = \[[\s\S]*?\n\];/);
    if (!arrayMatch) throw new Error('Could not extract browser antipattern registry');
    const overridesMatch = code.match(/const SEVERITY_OVERRIDES = \{[\s\S]*?\n\};/);
    const loopMatch = code.match(/for \(const ap of ANTIPATTERNS\) \{[\s\S]*?\n\}/);
    if (!overridesMatch || !loopMatch) {
      throw new Error('Could not extract severity assignment for the browser registry');
    }
    code = [arrayMatch[0], overridesMatch[0], loopMatch[0]].join('\n\n');
  }
  code = code.replace(/^import[\s\S]*?;\n/gm, '');
  code = code.replace(/^export\s+\{[\s\S]*?^};\n?/gm, '');
  return `// --- ${relPath} ---\n${code.trim()}\n`;
}

const code = MODULES.map(browserSafeModule).join('\n');

const output = `/**
 * Anti-Pattern Browser Detector for Tcher
 * Copyright (c) 2026 Paul Bakaus
 * SPDX-License-Identifier: Apache-2.0
 *
 * GENERATED -- do not edit. Source: cli/engine/browser/injected/index.mjs
 * Rebuild: node scripts/build-browser-detector.js
 *
 * Usage: <script src="detect-antipatterns-browser.js"></script>
 * Re-scan: window.tcherScan()
 */
(function () {
if (typeof window === 'undefined') return;
${code}
})();
`;

fs.writeFileSync(OUTPUT, output);
console.log(`Generated ${path.relative(ROOT, OUTPUT)} (${(output.length / 1024).toFixed(1)} KB)`);
