// @ts-check
import { defineConfig } from 'astro/config';

// Static output (the default) — Cloudflare Pages serves the built files in dist/.
// `site` is the canonical URL; used for sitemaps, canonical tags, and absolute
// links. Update only if the final domain changes.
export default defineConfig({
  site: 'https://buildplayiterate.com',
  // Dev-only: honor an assigned PORT (e.g. from the preview tooling) so the dev
  // server isn't pinned to 4321. No effect on the static production build.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
