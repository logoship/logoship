/** Auto-generated — do not edit. Run: npm run build */
const CDN = 'https://cdn.jsdelivr.net/gh/logoship/logoship@1.0.2/social';

const PATHS = {
  'bluebubble': 'bluebubble.svg',
  'discord': 'discord.svg',
  'github': 'github.svg',
  'lark': 'lark.svg',
  'line': 'line.svg',
  'matrix': 'matrix.svg',
  'microsoft-teams': 'microsoft-teams.svg',
  'signal': 'signal.svg',
  'slack': 'slack.svg',
  'telegram': 'telegram.svg',
  'twitch': 'twitch.svg',
  'whatsapp': 'whatsapp.svg',
  'zalo': 'zalo.svg',
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
