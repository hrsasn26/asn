import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  DOSSIER_IMAGES,
  lireSource,
  nomsSources,
  problemesSource,
} from '../../scripts/lib/heros.mjs';
import { LARGEURS_AVIF, maquettes } from '../../src/data/maquettes';

const noms = Object.keys(maquettes).sort();

describe('visuels des en-têtes', () => {
  it('ont chacun une source HTML et un texte alternatif', () => {
    expect(nomsSources()).toEqual(noms);
  });

  it('ont toutes leurs images, sans image en trop', () => {
    const attendues = noms.flatMap((nom) => [
      ...LARGEURS_AVIF.map((largeur) => `${nom}-${largeur}.avif`),
      `${nom}.webp`,
    ]);
    expect(readdirSync(DOSSIER_IMAGES).sort()).toEqual(attendues.sort());
  });

  // Le texte des images n'est pas lu par `pnpm check:content` : il est vérifié sur les sources.
  it.each(noms)('%s respecte les règles de contenu du site', (nom) => {
    expect(problemesSource(lireSource(nom))).toEqual([]);
  });
});

describe('problemesSource', () => {
  it('signale un prix, un point d’exclamation et une photo externe', () => {
    const html = `<div id="maquette"><b>1 450 MAD</b><p>Merci !</p>
      <div style="background:url('https://images.pexels.com/photos/1.jpeg')"></div></div>`;
    const problemes = problemesSource(html);
    expect(problemes).toHaveLength(3);
    expect(problemes.join('\n')).toContain('prix affiché');
    expect(problemes.join('\n')).toContain("point d'exclamation");
    expect(problemes.join('\n')).toContain('ressource externe');
  });

  it('refuse les balises qui chargent une ressource', () => {
    expect(problemesSource('<div id="maquette"><img src="photo.jpg"></div>')).toHaveLength(1);
  });
});
