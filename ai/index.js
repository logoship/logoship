/** Auto-generated — do not edit. Run: npm run build */
const CDN = 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.1/ai';

const PATHS = {
  'chatgpt': 'chatgpt.svg',
  'claude': 'claude.svg',
  'deepseek': 'deepseek.svg',
  'gemini': 'gemini.svg',
  'grok': 'grok.svg',
  'mistral': 'mistral.svg',
};

export function logo(name) {
  const file = PATHS[name];
  if (!file) throw new Error(`logoship: unknown ${category} logo "${name}"`);
  return `${CDN}/${file}`;
}

export default new Proxy({}, {
  get(_t, prop) {
    if (prop === "then" || typeof prop === "symbol") return undefined;
    if (!(prop in PATHS)) return undefined;
    return logo(String(prop));
  },
  has(_t, prop) { return Object.prototype.hasOwnProperty.call(PATHS, prop); },
});
