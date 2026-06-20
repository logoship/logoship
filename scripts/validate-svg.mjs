#!/usr/bin/env node
/**
 * Validates all logoship SVG assets before merge/release.
 * Run: npm run validate
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATEGORIES = ['social', 'ai', 'google', 'design', 'other'];

const CANVAS = 90;
const REQUIRED_OPENING = `<svg width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}"`;
const NAME_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*\.svg$/;
const MAX_BYTES = 512 * 1024;

function listSvgFiles() {
  const files = [];
  for (const category of CATEGORIES) {
    const dir = path.join(ROOT, category);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.svg')) files.push({ category, file, abs: path.join(dir, file) });
    }
  }
  return files;
}

function firstLine(abs) {
  const raw = fs.readFileSync(abs, 'utf8');
  const line = raw.split(/\r?\n/, 1)[0] ?? '';
  return { raw, line };
}

function validate() {
  const errors = [];
  const files = listSvgFiles();

  if (files.length === 0) {
    errors.push('No SVG files found in category folders.');
  }

  for (const { category, file, abs } of files) {
    const rel = `${category}/${file}`;

    if (!NAME_RE.test(file)) {
      errors.push(`${rel}: filename must be lowercase kebab-case, e.g. google-drive.svg (no -icon suffix)`);
    }

    const stat = fs.statSync(abs);
    if (stat.size > MAX_BYTES) {
      errors.push(`${rel}: file too large (${stat.size} bytes, max ${MAX_BYTES})`);
    }

    const { raw, line } = firstLine(abs);
    const normalized = line.trim();

    if (!normalized.startsWith(REQUIRED_OPENING)) {
      errors.push(
        `${rel}: root <svg> must be exactly width="90" height="90" viewBox="0 0 90 90"`,
      );
    }

    if (/\b(width|height)="(?!90")/.test(raw.slice(0, 500))) {
      // root tag already checked; skip noisy inner width/height in filters
    }

    if (/<image\b/i.test(raw)) {
      errors.push(`${rel}: embedded raster <image> is not allowed — use vector paths only`);
    }
  }

  if (errors.length > 0) {
    console.error('logoship SVG validation failed:\n');
    for (const err of errors) console.error(`  ✗ ${err}`);
    console.error(`\n${errors.length} error(s). See CONTRIBUTING.md`);
    process.exit(1);
  }

  console.log(`logoship SVG validation passed (${files.length} files, ${CANVAS}×${CANVAS})`);
}

validate();
