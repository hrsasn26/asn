import { describe, expect, it } from 'vitest';
import {
  analyserTexte,
  extraireTexte,
  extraireTexteMarkdown,
} from '../../scripts/lib/content-rules.mjs';

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

describe('extraireTexteMarkdown', () => {
  it('garde le texte des liens et retire les adresses et les marques Markdown', () => {
    const markdown = `# Agence\n\n> Des sites fiables.\n\n## Services\n\n- [Sites web](https://exemple.ma/sites-web): Un site rapide.\n`;
    expect(extraireTexteMarkdown(markdown)).toEqual([
      'Agence',
      'Des sites fiables.',
      'Services',
      'Sites web: Un site rapide.',
    ]);
  });

  it('laisse les placeholders visibles pour analyserTexte', () => {
    const fragments = extraireTexteMarkdown(
      '- [Contact](https://exemple.ma/contact): Écrivez à [adresse].',
    );
    expect(analyserTexte(fragments, { strict: false })).toEqual([
      { niveau: 'avertissement', regle: 'placeholder', extrait: '[adresse]' },
    ]);
  });
});

describe('analyserTexte', () => {
  it('signale les placeholders comme avertissements hors mode strict', () => {
    const problemes = analyserTexte(['Réponse sous [48 h]'], { strict: false });
    expect(problemes).toEqual([
      { niveau: 'avertissement', regle: 'placeholder', extrait: '[48 h]' },
    ]);
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
    'Une équipe d’ingénieurs',
    'Échanger avec un ingénieur',
    'Ingénieur logiciel',
  ])('refuse « %s »', (texte) => {
    const problemes = analyserTexte([texte], { strict: false });
    expect(problemes.some((p) => p.niveau === 'erreur')).toBe(true);
  });

  it.each(['À partir de [X] DH', 'Site vitrine : 5 000 DH', '1 200 €', '300 MAD par mois'])(
    'refuse le prix « %s »',
    (texte) => {
      const problemes = analyserTexte([texte], { strict: false });
      expect(problemes.some((p) => p.regle.startsWith('prix affiché'))).toBe(true);
    },
  );

  it('accepte le capital social des mentions légales', () => {
    const problemes = analyserTexte(['SARL au capital de [montant] DH'], { strict: false });
    expect(problemes.some((p) => p.regle.startsWith('prix affiché'))).toBe(false);
  });

  it.each(['Hébergement en France', 'Conforme au RGPD', 'Réclamation auprès de la CNIL'])(
    'refuse la mention « %s »',
    (texte) => {
      const problemes = analyserTexte([texte], { strict: false });
      expect(problemes.some((p) => p.regle.startsWith('mention interdite'))).toBe(true);
    },
  );

  it('accepte « français » comme langue', () => {
    const problemes = analyserTexte(['Un site en français, en arabe et en anglais'], {
      strict: false,
    });
    expect(problemes).toEqual([]);
  });

  it('refuse les points d’exclamation', () => {
    expect(analyserTexte(['Contactez-nous !'], { strict: false })[0]?.regle).toBe(
      "point d'exclamation",
    );
  });

  it('signale une espace manquante autour d’un placeholder', () => {
    const problemes = analyserTexte(['Réponse sous [48 h ouvrées]avec un devis'], {
      strict: false,
    });
    expect(problemes.some((p) => p.regle.startsWith('espace manquante'))).toBe(true);
    const apresPonctuation = analyserTexte(['Modalités de paiement :[à définir]'], {
      strict: false,
    });
    expect(apresPonctuation.some((p) => p.regle.startsWith('espace manquante'))).toBe(true);
  });

  it('garde un placeholder surligné dans sa phrase', () => {
    const fragments = extraireTexte(
      '<p>Réponse sous <span class="a-completer">[48 h ouvrées]</span>avec un devis.</p>',
    );
    expect(fragments).toContain('Réponse sous [48 h ouvrées]avec un devis.');
    const problemes = analyserTexte(fragments, { strict: false });
    expect(problemes.some((p) => p.regle.startsWith('espace manquante'))).toBe(true);
  });

  it('accepte un placeholder suivi de ponctuation ou entre parenthèses', () => {
    const problemes = analyserTexte(['Modifications : [1 h]/mois, délai ([48 h ouvrées]).'], {
      strict: false,
    });
    expect(problemes.every((p) => p.regle === 'placeholder')).toBe(true);
  });

  it('ne confond pas un mot interdit avec une partie de mot', () => {
    expect(analyserTexte(['Nos stackeurs et la qualité'], { strict: false })).toEqual([]);
  });
});
