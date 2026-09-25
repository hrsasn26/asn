#!/usr/bin/env node
/**
 * Génère l'image de partage (Open Graph) : public/og.png, 1200 × 630 px.
 * Relancez ce script quand le nom de l'agence ou les couleurs changent :
 *   pnpm image:partage
 * Le nom vient de src/data/site.ts. Tant qu'il reste un placeholder, l'image ne l'affiche pas.
 * Chromium est nécessaire (pnpm exec playwright install chromium) ; PW_CHROMIUM_PATH permet
 * d'utiliser un Chromium déjà installé.
 */
import { chromium } from '@playwright/test';
import { site } from '../src/data/site.ts';

const nom = site.nom.startsWith('[') ? '' : site.nom;

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: system-ui, "Segoe UI", Roboto, Arial, sans-serif;
         background: #eff6ff; color: #0f172a; display: flex; flex-direction: column;
         justify-content: space-between; padding: 72px 80px; }
  .nom { font-size: 34px; font-weight: 700; color: #1d4ed8; min-height: 40px; }
  h1 { font-size: 64px; line-height: 1.1; font-weight: 700; max-width: 960px; }
  .promesse { margin-top: 24px; font-size: 32px; color: #334155; }
  .services { display: flex; gap: 16px; }
  .services span { background: #1d4ed8; color: white; font-size: 26px; font-weight: 600;
                   padding: 12px 24px; border-radius: 12px; }
</style></head><body>
  <div class="nom">${nom}</div>
  <div>
    <h1>Des sites et des applications conçus par des ingénieurs</h1>
    <p class="promesse">Fiables, testés, sécurisés et suivis dans la durée.</p>
  </div>
  <div class="services"><span>Sites web</span><span>Applications</span><span>Automatisation</span><span>Maintenance</span></div>
</body></html>`;

const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: 'public/og.png' });
await navigateur.close();
console.log('public/og.png généré.');
