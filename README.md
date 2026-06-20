# Logoship

Shared SVG logos for any project. Folders are for dev organization only — **users call logos by name**.

## Quick start

```js
// ESM via jsDelivr — no folder needed
import logos, { logo } from 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.1/index.js';

logo('telegram');        // → CDN URL
logos.telegram;          // same, lazy lookup
logo('google-drive');
```

```html
<!-- Or use URL directly -->
<img src="https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.1/social/telegram.svg" />
```

Per-category import (smaller bundle if you only need one group):

```js
import social, { logo } from 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.1/social/index.js';
logo('telegram');
social.discord;
```

## API

| Export | Usage |
|--------|-------|
| `logo(name)` | Get any logo URL by name |
| `logos` (default) | Proxy — `logos.telegram` resolves lazily |
| `logos.json` | Flat name → path map for any language |
| `social/index.js`, … | Category-only import |

```js
import logos, { logo } from 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.1/index.js';

logos['google-drive'];
logos.telegram;
```

## Folder layout (dev only)

| Folder | Examples |
|--------|----------|
| `social/` | telegram, discord, slack, github |
| `ai/` | chatgpt, claude, gemini |
| `google/` | gmail, google-drive |
| `design/` | notion |
| `other/` | aucobot |

File naming: `{logoname}.svg` — lowercase kebab-case.

## Add a logo

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** — canvas **90×90**, naming, validate, build.

```bash
social/messenger.svg   # add file
npm run validate       # must pass
npm run build
git push origin main
```

## Scale (10k+ logos)

`index.js` stays **~25 lines** — URLs are built at runtime from `logos.json`, not duplicated per logo.

| File | Grows with logos? | ~size at 100k logos |
|------|-------------------|---------------------|
| `index.js` | No (fixed) | ~1 KB |
| `logos.json` | Yes | ~3–5 MB |
| `{category}/index.js` | Per category only | split by folder |

If `logos.json` ever exceeds ~10 MB, split into `logos/social.json`, `logos/ai.json`, … and import by category.

GitHub hard-limits a single file at **100 MB**. jsDelivr serves JSON efficiently with cache.


## AucoBot

```ts
import { logo } from '@/utils/logoship/logoship-url';
logo('telegram');
```

Sync `logos.json` from logoship after adding new SVGs.
