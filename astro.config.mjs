// @ts-check
import { defineConfig } from 'astro/config';

// Static output (the default) — Cloudflare Pages serves the built files in dist/.
// `site` is the canonical URL; used for sitemaps, canonical tags, and absolute
// links. Update only if the final domain changes.
export default defineConfig({
  site: 'https://buildplayiterate.com',
});
