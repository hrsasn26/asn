import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Tracés (attributs d) des formes d'un fichier SVG ou d'un composant.
const traces = (fichier: string) =>
  [...readFileSync(fichier, 'utf8').matchAll(/\sd="([^"]+)"/g)].map(([, d]) => d);

describe('logo', () => {
  const source = traces('design/logo/svg/symbole-couleur.svg');

  it('a un symbole de deux demi-disques dans la source', () => {
    expect(source).toHaveLength(2);
  });

  it.each(['src/components/Logo.astro', 'public/favicon.svg'])(
    '%s reprend le dessin de la source',
    (fichier) => {
      expect(traces(fichier)).toEqual(source);
    },
  );

  it('a toutes ses icônes dans public/ (pnpm image:logo)', () => {
    for (const icone of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'logo.png']) {
      expect(existsSync(`public/${icone}`), icone).toBe(true);
    }
  });
});
