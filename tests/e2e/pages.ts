import { readFileSync } from 'node:fs';

/** Chemins de toutes les pages du sitemap construit (`pnpm build`). */
export const pages = [
  ...readFileSync('dist/client/sitemap-0.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
].map(([, url]) => new URL(url ?? '').pathname);
