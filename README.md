# Logoship

SVG logo assets for [AucoBot](https://github.com/mankhb2k/openclaw-saas/tree/main/aucobot), served via [jsDelivr](https://www.jsdelivr.com/) GitHub CDN.

## CDN base URL

```
https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0
```

Pin a release tag (`@1.0.0`) for stable cache; use `@main` only while iterating.

## Layout

| Folder | Purpose |
|--------|---------|
| `brand/` | Product branding (AucoBot) |
| `channel/` | Chat / messaging channel icons |
| `models/` | LLM provider icons |
| `tools/` | Connector / integration icons |

## Usage

```text
https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0/channel/Telegram-icon.svg
https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0/models/ChatGPT-icon.svg
https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0/tools/GoogleDrive-icon.svg
https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0/brand/aucobot-icon.svg
```

### AucoBot web

Set in `aucobot/apps/.env`:

```env
NEXT_PUBLIC_LOGOCALL_CDN_BASE=https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.0
```

Use `NEXT_PUBLIC_LOGOCALL_CDN_BASE=local` to serve icons from `apps/web/public/` during offline dev.

## Auto release (GitHub Actions)

Push SVG changes to `main` → workflow **Release** will:

1. Read latest tag (`v1.0.0` → next `1.0.1`)
2. Update `manifest.json` (`version` + `cdn` URL)
3. Commit `chore(release): v1.0.1` to `main`
4. Create & push tag `v1.0.1`
5. Create GitHub Release

Workflow skips commits whose message starts with `chore(release):` to avoid infinite loops.

After a new release, update `NEXT_PUBLIC_LOGOCALL_CDN_BASE` in aucobot to the new tag if you pin versions.
