import { describe, expect, it } from 'vitest';
import { analyserTexte, extraireTexte } from '../../scripts/lib/content-rules.mjs';

describe('extraireTexte', () => {
  it('lit le titre, la description, les données structurées et le texte visible', () => {
    const html = `<html><head><title>Accueil | [Nom]</title>
      <meta name="description" content="Des sites fiables">
      <script type="application/ld+json">{"@type":"Service","name":"[Nom]","areaServed":["Lyon"]}</script>
      <script>console.log("ignoré !")</script></head>
      <body><h1>Bonjour&nbsp;à vous</h1><img alt="Photo de l&#39;équipe"></body></html>`;
    const fragments = extraireTexte(html);
    expect(fragments).toContain('Des sites fiables');
    expect(fragments).toContain('Lyon');
    expect(fragments).toContain("Photo de l'équipe");
    expect(fragments).toContain('Bonjour à vous');
    expect(fragments.join(' ')).not.toContain('ignoré');
  });
});

describe('analyserTexte', () => {
  it('signale les placeholders comme avertissements hors mode strict', () => {
    const problemes = analyserTexte(['À partir de [X] €'], { strict: false });
    expect(problemes).toEqual([{ niveau: 'avertissement', regle: 'placeholder', extrait: '[X]' }]);
  });

  it('signale les placeholders comme erreurs en mode strict', () => {
    expect(analyserTexte(['[Nom]'], { strict: true })[0]?.niveau).toBe('erreur');
  });

  it.each([
    'Notre équipe DevOps',
    'La QA avant tout',
    'Une stack moderne',
    'Un pipeline CI/CD',
    'Le meilleur framework',
    'Des solutions innovantes',
    'Nous optimisons votre site',
    'Digitalisez votre activité',
    'Une vision 360°',
  ])('refuse « %s »', (texte) => {
    const problemes = analyserTexte([texte], { strict: false });
    expect(problemes.some((p) => p.niveau === 'erreur')).toBe(true);
  });

  it('refuse les points d’exclamation', () => {
    expect(analyserTexte(['Contactez-nous !'], { strict: false })[0]?.regle).toBe(
      "point d'exclamation",
    );
  });

  it('ne confond pas un mot interdit avec une partie de mot', () => {
    expect(analyserTexte(['Nos stackeurs et la qualité'], { strict: false })).toEqual([]);
  });
});
