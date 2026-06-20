#!/usr/bin/env node
/**
 * Scans SVG folders and generates:
 * - {category}/index.js  — per-category logo() + proxy (scales per folder)
 * - index.js             — thin root, fixed size (imports logos.json only)
 * - logos.json           — name → relative path
 * - manifest.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATEGORIES = ['social', 'ai', 'google', 'design', 'other'];
const REPO = 'logoship/logoship';

function readVersion() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  return pkg.version;
}

function listSvgs(category) {
  const dir = path.join(ROOT, category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.replace(/\.svg$/, ''))
    .sort();
}

function cdnBase(version) {
  return `https://cdn.jsdelivr.net/gh/${REPO}@${version}`;
}

function writeCategoryIndex(category, names, version) {
  const cdn = cdnBase(version);
  const lines = [
    '/** Auto-generated — do not edit. Run: npm run build */',
    `const CDN = '${cdn}/${category}';`,
    '',
    'const PATHS = {',
  ];

  for (const name of names) {
    lines.push(`  '${name}': '${name}.svg',`);
  }

  lines.push('};');
  lines.push('');
  lines.push('export function logo(name) {');
  lines.push('  const file = PATHS[name];');
  lines.push('  if (!file) throw new Error(`logoship: unknown ${category} logo "${name}"`);');
  lines.push('  return `${CDN}/${file}`;');
  lines.push('}');
  lines.push('');
  lines.push('export default new Proxy({}, {');
  lines.push('  get(_t, prop) {');
  lines.push('    if (prop === "then" || typeof prop === "symbol") return undefined;');
  lines.push('    if (!(prop in PATHS)) return undefined;');
  lines.push('    return logo(String(prop));');
  lines.push('  },');
  lines.push('  has(_t, prop) { return Object.prototype.hasOwnProperty.call(PATHS, prop); },');
  lines.push('});');
  lines.push('');

  fs.writeFileSync(path.join(ROOT, category, 'index.js'), lines.join('\n'));
}

function writeRootIndex(version) {
  const cdn = cdnBase(version);
  const lines = [
    '/** Auto-generated — fixed size; scales via logos.json, not this file. Run: npm run build */',
    "import paths from './logos.json' with { type: 'json' };",
    '',
    `const CDN = '${cdn}';`,
    '',
    '/** @param {string} name Logo name, e.g. "telegram", "google-drive" */',
    'export function logo(name) {',
    '  const rel = paths[name];',
    '  if (!rel) throw new Error(`logoship: unknown logo "${name}"`);',
    '  return `${CDN}/${rel}`;',
    '}',
    '',
    '/** Lazy URL lookup — does not embed every URL in this file. */',
    'export default new Proxy({}, {',
    '  get(_t, prop) {',
    '    if (prop === "then" || typeof prop === "symbol") return undefined;',
    '    if (!(prop in paths)) return undefined;',
    '    return logo(String(prop));',
    '  },',
    '  has(_t, prop) { return Object.prototype.hasOwnProperty.call(paths, prop); },',
    '});',
    '',
  ];

  fs.writeFileSync(path.join(ROOT, 'index.js'), lines.join('\n'));
}

function writeLogosJson(flatPaths) {
  fs.writeFileSync(path.join(ROOT, 'logos.json'), `${JSON.stringify(flatPaths, null, 2)}\n`);
}

function writeManifest(categories, version) {
  const manifestPath = path.join(ROOT, 'manifest.json');
  const existing = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : {};

  const categoryFiles = {};
  const flatPaths = {};

  for (const category of categories) {
    const names = listSvgs(category);
    categoryFiles[category] = names.map((n) => `${n}.svg`);
    for (const name of names) {
      if (flatPaths[name]) {
        throw new Error(
          `Duplicate logo name "${name}" in ${flatPaths[name]} and ${category}/`,
        );
      }
      flatPaths[name] = `${category}/${name}.svg`;
    }
  }

  const manifest = {
    name: existing.name ?? 'logoship',
    version,
    cdn: cdnBase(version),
    logos: flatPaths,
    categories: categoryFiles,
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return flatPaths;
}

function main() {
  const version = readVersion();
  const byCategory = {};

  for (const category of CATEGORIES) {
    const names = listSvgs(category);
    byCategory[category] = names;
    writeCategoryIndex(category, names, version);
    console.log(`  ${category}/index.js — ${names.length} logos`);
  }

  const flatPaths = writeManifest(CATEGORIES, version);
  writeLogosJson(flatPaths);
  writeRootIndex(version);

  console.log(`  index.js — thin root (${Object.keys(flatPaths).length} logos in logos.json)`);
  console.log(`  logos.json`);
  console.log(`  manifest.json @ v${version}`);
}

main();
