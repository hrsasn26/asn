#!/usr/bin/env node
/**
 * Génère l'image de partage (Open Graph) : public/og.png, 1200 × 630 px.
 * Relancez ce script quand le nom de l'agence ou les couleurs changent :
 *   pnpm image:partage
 * Le nom vient de src/data/site.ts. Tant qu'il reste un placeholder, l'image ne l'affiche pas.
 * Relancez-le aussi quand le logo change (src/components/Logo.astro).
 * Chromium est nécessaire (pnpm exec playwright install chromium) ; PW_CHROMIUM_PATH permet
 * d'utiliser un Chromium déjà installé.
 */
import { chromium } from '@playwright/test';
import { site } from '../src/data/site.ts';

// Même forme que src/components/Logo.astro et public/favicon.svg.
const symbole = `<svg width="56" height="56" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#1d4ed8"/><path d="M16 16l-7 8 7 8M32 16l7 8-7 8" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.5 24.5l3.5 3.5 6-7" fill="none" stroke="#34d399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const [premierMot, ...autresMots] = site.nom.startsWith('[') ? [''] : site.nom.split(' ');
const nom = `<div>${premierMot} <span>${autresMots.join(' ')}</span></div>`;

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: system-ui, "Segoe UI", Roboto, Arial, sans-serif;
         background: #eff6ff; color: #0f172a; display: flex; flex-direction: column;
         justify-content: space-between; padding: 72px 80px; }
  .nom { display: flex; align-items: center; gap: 16px; font-size: 36px; font-weight: 700;
         color: #0f172a; min-height: 56px; }
  .nom span { color: #1d4ed8; }
  h1 { font-size: 64px; line-height: 1.1; font-weight: 700; max-width: 960px; }
  .promesse { margin-top: 24px; font-size: 32px; color: #334155; }
  .services { display: flex; gap: 16px; }
  .services span { background: #1d4ed8; color: white; font-size: 26px; font-weight: 600;
                   padding: 12px 24px; border-radius: 12px; }
</style></head><body>
  <div class="nom">${symbole}${nom}</div>
  <div>
    <h1>Des sites et des applications conçus par des ingénieurs</h1>
    <p class="promesse">Fiables, testés, sécurisés et suivis dans la durée.</p>
  </div>
  <div class="services"><span>Sites web</span><span>Applications</span><span>Intelligence artificielle</span><span>Maintenance</span></div>
</body></html>`;

const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: 'public/og.png' });
await navigateur.close();
console.log('public/og.png généré.');
