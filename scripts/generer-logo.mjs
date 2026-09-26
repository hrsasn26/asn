#!/usr/bin/env node
/**
 * Génère les icônes du site à partir des sources du logo (design/logo/svg/) :
 * - public/favicon.ico : symbole en couleur, 16 et 32 px, pour les navigateurs qui n'affichent
 *   pas public/favicon.svg ;
 * - public/apple-touch-icon.png : icône d'application, 180 px (écran d'accueil des iPhone) ;
 * - public/logo.png : symbole en couleur, 512 px, pour les données structurées (src/lib/seo.ts).
 * public/favicon.svg est écrit à la main : même dessin, version blanche en mode sombre.
 * Relancez ce script après un changement du logo :
 *   pnpm image:logo
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const source = (nom) => readFileSync(`design/logo/svg/${nom}.svg`, 'utf8');

// Rendu à 1024 px (sources de 100 × 100), puis réduction : bords lisses, même à 16 px.
// sharp n'écrit pas les métadonnées des sources dans les images.
async function png(svg, taille) {
  return sharp(Buffer.from(svg), { density: (72 * 1024) / 100 })
    .resize(taille, taille)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Fichier ICO : un en-tête de 6 octets, une entrée de 16 octets par image, puis les images PNG.
function ico(images) {
  const entete = Buffer.alloc(6);
  entete.writeUInt16LE(1, 2); // Type : icône.
  entete.writeUInt16LE(images.length, 4);
  let position = entete.length + 16 * images.length;
  const entrees = images.map(({ taille, donnees }) => {
    const entree = Buffer.alloc(16);
    entree.writeUInt8(taille, 0);
    entree.writeUInt8(taille, 1);
    entree.writeUInt16LE(1, 4); // Plans de couleur.
    entree.writeUInt16LE(32, 6); // Bits par pixel.
    entree.writeUInt32LE(donnees.length, 8);
    entree.writeUInt32LE(position, 12);
    position += donnees.length;
    return entree;
  });
  return Buffer.concat([entete, ...entrees, ...images.map(({ donnees }) => donnees)]);
}

const symbole = source('symbole-couleur');
const favicon = await Promise.all(
  [16, 32].map(async (taille) => ({ taille, donnees: await png(symbole, taille) })),
);
writeFileSync('public/favicon.ico', ico(favicon));

// iOS arrondit lui-même les coins et remplit la transparence en noir : fond carré, sans arrondi.
const iconeCarree = source('icone-app').replace(/\srx="[^"]*"/, '');
writeFileSync('public/apple-touch-icon.png', await png(iconeCarree, 180));

writeFileSync('public/logo.png', await png(symbole, 512));

console.log('public/favicon.ico, public/apple-touch-icon.png et public/logo.png générés.');
