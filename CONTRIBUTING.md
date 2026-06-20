# Contributing logos

All logos must look consistent in apps that render them at 24–52px. Follow this checklist before opening a PR.

## Canvas (required)

Every SVG **must** use exactly:

```xml
<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
```

| Rule | Value |
|------|-------|
| Canvas | **90 × 90** |
| `viewBox` | `0 0 90 90` |
| Format | SVG only (vector paths) |
| Max file size | 512 KB |

Do **not** use other sizes (100×100, 272×272, …). Scale artwork to fit 90×90 before committing.

## Filename (required)

```
{logoname}.svg
```

- lowercase kebab-case: `google-drive.svg`, `microsoft-teams.svg`
- **no** `-icon` suffix: ~~`Telegram-icon.svg`~~
- unique across all folders (flat lookup by name)

## Folder (dev organization)

| Folder | Put here |
|--------|----------|
| `social/` | Chat, social, dev platforms |
| `ai/` | LLM / AI providers |
| `google/` | Google services |
| `design/` | Design & productivity tools |
| `other/` | Product brands, misc |

Users consume logos **by name** (`logo('telegram')`) — folder is for maintainers only.

## Workflow

```bash
# 1. Add SVG to the right folder
social/messenger.svg

# 2. Validate
npm run validate

# 3. Regenerate indexes
npm run build

# 4. Commit & push — CI runs validate again; release bumps version
```

## CI

- **validate.yml** — runs on every PR/push touching `**/*.svg`
- **release.yml** — runs `npm run validate` before tagging

PRs with invalid SVGs will fail CI.

## Normalize existing artwork

If you export from Figma/Illustrator:

1. Artboard **90 × 90 px**
2. Export SVG
3. Open file and confirm the root `<svg>` line matches the template above
4. Run `npm run validate`

## Trademark

Only add logos you may use (official brand assets, OSS project marks, or your own). Do not redistribute unofficial marks as a public icon pack without permission.
