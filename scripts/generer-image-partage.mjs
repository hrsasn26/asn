#!/usr/bin/env node
/**
 * Génère l'image de partage (Open Graph) : public/og.png, 1200 × 630 px.
 * Relancez ce script quand le nom de l'agence ou les couleurs changent :
 *   pnpm image:partage
 * Le nom vient de src/data/site.ts. Tant qu'il reste un placeholder, l'image ne l'affiche pas.
 * Couleurs et police : celles du site (src/styles/global.css, Manrope dans src/assets/polices/).
 * Chromium est nécessaire (pnpm exec playwright install chromium) ; PW_CHROMIUM_PATH permet
 * d'utiliser un Chromium déjà installé.
 */
import { readFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { site } from '../src/data/site.ts';

// Les fonctions passées à page.evaluate() s'exécutent dans la page : document y existe.
/* global document */

const nom = site.nom.startsWith('[') ? '' : site.nom;

// Police intégrée en data URL : la page n'a besoin ni du réseau ni des polices du système.
const manrope = readFileSync('src/assets/polices/manrope-latin.woff2').toString('base64');

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><style>
  @font-face { font-family: Manrope; font-weight: 200 800;
               src: url(data:font/woff2;base64,${manrope}) format('woff2'); }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: Manrope, sans-serif; color: #0b1b33;
         background: linear-gradient(#f4f6fa, #fff); display: flex; flex-direction: column;
         justify-content: space-between; padding: 72px 80px; -webkit-font-smoothing: antialiased; }
  .nom { display: flex; align-items: center; gap: 16px; font-size: 30px; font-weight: 700;
         min-height: 40px; }
  .repere { width: 40px; height: 40px; border-radius: 50%; box-shadow: inset 0 0 0 2.5px #0b1b33;
            display: grid; place-items: center; }
  .repere span { width: 14px; height: 14px; border-radius: 50%; background: #0b1b33; }
  h1 { font-size: 76px; line-height: 1.04; font-weight: 300; letter-spacing: -0.035em;
       max-width: 980px; }
  h1 b { font-weight: 600; }
  .promesse { margin-top: 28px; font-size: 30px; color: #4b5770; }
  .services { display: flex; gap: 12px; }
  .services span { background: #0b1b33; color: #fff; font-size: 24px; font-weight: 600;
                   padding: 12px 26px; border-radius: 999px; }
</style></head><body>
  <div class="nom">${nom ? `<span class="repere"><span></span></span>${nom}` : ''}</div>
  <div>
    <h1>Des sites et des applications fiables, <b>suivis dans la durée</b></h1>
    <p class="promesse">Testés, sécurisés et faciles à faire évoluer.</p>
  </div>
  <div class="services"><span>Sites web</span><span>Applications</span><span>Intelligence artificielle</span><span>Maintenance</span></div>
</body></html>`;

const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
const page = await navigateur.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await navigateur.close();
console.log('public/og.png généré.');
