/** Auto-generated — fixed size; scales via logos.json, not this file. Run: npm run build */
import paths from './logos.json' with { type: 'json' };

const CDN = 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.2';

/** @param {string} name Logo name, e.g. "telegram", "google-drive" */
export function logo(name) {
  const rel = paths[name];
  if (!rel) throw new Error(`logoship: unknown logo "${name}"`);
  return `${CDN}/${rel}`;
}

/** Lazy URL lookup — does not embed every URL in this file. */
export default new Proxy({}, {
  get(_t, prop) {
    if (prop === "then" || typeof prop === "symbol") return undefined;
    if (!(prop in paths)) return undefined;
    return logo(String(prop));
  },
  has(_t, prop) { return Object.prototype.hasOwnProperty.call(paths, prop); },
});
