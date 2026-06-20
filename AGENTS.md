# AGENTS.md — Logoship

SVG logo CDN repo. Read **CONTRIBUTING.md** before adding files.

## Non-negotiable SVG rules

- Root tag: `<svg width="90" height="90" viewBox="0 0 90 90" ...>`
- Filename: `{name}.svg` lowercase kebab-case, no `-icon`
- Folder: `social/`, `ai/`, `google/`, `design/`, `other/`
- Vector only, max 512 KB

## Commands

```bash
npm run validate   # CI gate — run before commit
npm run build      # regenerate index.js + logos.json (runs validate first)
```

## After adding SVG

1. `npm run validate`
2. `npm run build`
3. Commit SVG + generated files (or let release workflow regenerate on main)

Do not hand-edit `index.js`, `logos.json`, or `{category}/index.js` — they are generated.
