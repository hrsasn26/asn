#!/usr/bin/env node
/**
 * Génère les visuels des en-têtes dans src/assets/heros/, sur fond transparent :
 * <nom>-<largeur>.avif pour chaque largeur de LARGEURS_AVIF, et <nom>.webp pour les anciens navigateurs.
 * Sources : design/heros/<nom>.html, maquettes HTML de 1040 × 720 px (voir design/heros/README.md).
 * Noms, textes alternatifs et largeurs : src/data/maquettes.ts.
 *
 * Relancez ce script après la modification d'une source :
 *   pnpm image:heros            tous les visuels
 *   pnpm image:heros accueil    un seul visuel
 *
 * Les polices sont dans design/heros/polices/ : le rendu ne dépend ni du réseau ni du système.
 * Chromium est nécessaire (pnpm exec playwright install chromium) ; PW_CHROMIUM_PATH permet
 * d'utiliser un Chromium déjà installé.
 */
import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import {
  HAUTEUR_MAQUETTE,
  LARGEUR_MAQUETTE,
  LARGEUR_WEBP,
  LARGEURS_AVIF,
  maquettes,
} from '../src/data/maquettes.ts';
import { DOSSIER_IMAGES, DOSSIER_SOURCES, lireSource, problemesSource } from './lib/heros.mjs';

// Les fonctions passées à page.evaluate() s'exécutent dans la page : document y existe.
/* global document */

// Polices libres (licence OFL), proches de celles des maquettes : Inter remplace la police
// système d'Apple, JetBrains Mono celle du terminal. Les fichiers sont intégrés en data URL :
// une page ouverte depuis le disque ne peut pas charger une police d'un autre fichier.
const DOSSIER_POLICES = `${DOSSIER_SOURCES}/polices`;
const POLICES = readFileSync(`${DOSSIER_POLICES}/polices.css`, 'utf8').replace(
  /url\('([^']+)'\)/g,
  (_, fichier) =>
    `url('data:font/woff2;base64,${readFileSync(`${DOSSIER_POLICES}/${fichier}`).toString('base64')}')`,
);

const tous = Object.keys(maquettes);
const demandes = process.argv.slice(2);
for (const nom of demandes) {
  if (!tous.includes(nom)) {
    console.error(`Visuel inconnu : ${nom}. Visuels : ${tous.join(', ')}.`);
    process.exit(1);
  }
}
const noms = demandes.length > 0 ? demandes : tous;

let erreurs = 0;
for (const nom of noms) {
  for (const probleme of problemesSource(lireSource(nom))) {
    console.error(`${DOSSIER_SOURCES}/${nom}.html : ${probleme}`);
    erreurs += 1;
  }
}
if (erreurs > 0) process.exit(1);

mkdirSync(DOSSIER_IMAGES, { recursive: true });
const navigateur = await chromium.launch(
  process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
);
// Rendu au double de la taille CSS : assez de pixels pour la plus grande image (1600 px).
const page = await navigateur.newPage({
  viewport: { width: LARGEUR_MAQUETTE, height: HAUTEUR_MAQUETTE },
  deviceScaleFactor: 2,
});

for (const nom of noms) {
  await page.goto(pathToFileURL(resolve(DOSSIER_SOURCES, `${nom}.html`)).href);
  await page.addStyleTag({ content: 'html, body { margin: 0; background: transparent; }' });
  await page.addStyleTag({ content: POLICES });
  // Charge toutes les polices déclarées, même celles que la mise en page n'a pas encore demandées.
  await page.evaluate(() => Promise.all([...document.fonts].map((police) => police.load())));
  const png = await page.locator('#maquette').screenshot({ omitBackground: true });

  // Les anciennes images du visuel sont supprimées : une largeur retirée ne reste pas dans le dépôt.
  for (const fichier of readdirSync(DOSSIER_IMAGES)) {
    if (fichier.startsWith(`${nom}-`) || fichier === `${nom}.webp`) {
      rmSync(`${DOSSIER_IMAGES}/${fichier}`);
    }
  }
  for (const largeur of LARGEURS_AVIF) {
    await sharp(png)
      .resize({ width: largeur })
      .avif({ quality: 55 })
      .toFile(`${DOSSIER_IMAGES}/${nom}-${largeur}.avif`);
  }
  await sharp(png)
    .resize({ width: LARGEUR_WEBP })
    .webp({ quality: 82, effort: 6 })
    .toFile(`${DOSSIER_IMAGES}/${nom}.webp`);
  console.log(`${DOSSIER_IMAGES}/${nom} : ${LARGEURS_AVIF.length} images AVIF et une image WebP.`);
}

await navigateur.close();
