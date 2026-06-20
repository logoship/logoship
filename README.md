# Logocall

SVG logo assets for [AucoBot](https://github.com/mankhb2k/openclaw-saas/tree/main/aucobot), served via [jsDelivr](https://www.jsdelivr.com/) GitHub CDN.

## CDN base URL

```
https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0
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
https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0/channel/Telegram-icon.svg
https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0/models/ChatGPT-icon.svg
https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0/tools/GoogleDrive-icon.svg
https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0/brand/aucobot-icon.svg
```

### AucoBot web

Set in `aucobot/apps/.env`:

```env
NEXT_PUBLIC_LOGOCALL_CDN_BASE=https://cdn.jsdelivr.net/gh/mankhb2k/logocall@1.0.0
```

Use `NEXT_PUBLIC_LOGOCALL_CDN_BASE=local` to serve icons from `apps/web/public/` during offline dev.

## Release

```bash
git tag v1.0.0
git push origin main --tags
```

After pushing a new tag, update the version in `NEXT_PUBLIC_LOGOCALL_CDN_BASE` to bust jsDelivr cache when needed.
