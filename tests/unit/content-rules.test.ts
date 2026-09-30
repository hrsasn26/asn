import { describe, expect, it } from 'vitest';
import {
  analyserPrixStructures,
  analyserTexte,
  conditionsPrix,
  contientPrix,
  extrairePrixStructures,
  extraireTexte,
  extraireTexteMarkdown,
  prixDeclares,
} from '../../scripts/lib/content-rules.mjs';

/** Prix déclarés pour les tests : 4 000 DH HT (4 800 DH TTC) et 500 DH HT (600 DH TTC). */
const prix = prixDeclares({ tauxTva: 20, offres: [{ ht: 4000 }, { ht: 500 }, { ht: null }] });

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
    'refuse tout prix sans liste de prix déclarés : « %s »',
    (texte) => {
      const problemes = analyserTexte([texte], { strict: false });
      expect(problemes.some((p) => p.regle.startsWith('prix affiché'))).toBe(true);
    },
  );

  it.each([
    'À partir de 4 800 DH TTC',
    'À partir de 4\u00a0800\u00a0DH\u00a0TTC (4\u00a0000\u00a0DH\u00a0HT)',
    'Forfait Essentiel : 600 DH TTC (500 DH HT) par mois',
    'En 2026, à partir de 4 800 DH TTC',
  ])('accepte le prix déclaré « %s »', (texte) => {
    expect(analyserTexte([texte], { strict: false, prix })).toEqual([]);
  });

  it.each([
    ['À partir de 5 000 DH TTC', 'non déclaré'],
    ['À partir de [X] DH TTC', 'non déclaré'],
    ['À partir de 4 800 DH HT', 'non déclaré'],
    ['À partir de 4 000 DH TTC', 'non déclaré'],
    ['À partir de 4 800 DH', 'sans « TTC » ou « HT »'],
    ['À partir de 4 800 MAD TTC', 'autre écriture'],
    ['À partir de 480 € TTC', 'autre écriture'],
  ])('refuse le prix « %s »', (texte, regle) => {
    // « [X] » est aussi signalé comme placeholder : seules les règles de prix comptent ici.
    const problemes = analyserTexte([texte], { strict: false, prix }).filter((p) =>
      p.regle.startsWith('prix affiché'),
    );
    expect(problemes).toHaveLength(1);
    expect(problemes[0]?.regle).toContain(regle);
  });

  it('accepte le capital social des mentions légales', () => {
    for (const texte of ['SARL au capital de [montant] DH', 'SARL au capital de 100 000 DH']) {
      const problemes = analyserTexte([texte], { strict: false, prix });
      expect(problemes.some((p) => p.regle.startsWith('prix affiché'))).toBe(false);
      expect(contientPrix([texte])).toBe(false);
    }
  });

  it('repère une page qui affiche un prix', () => {
    expect(contientPrix(['Un devis gratuit, à prix fixe.'])).toBe(false);
    expect(contientPrix(['À partir de 4 800 DH TTC'])).toBe(true);
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

describe('prix des données structurées', () => {
  const html = `<script type="application/ld+json">{"@type":"Service","offers":[
    {"@type":"Offer","priceSpecification":{"minPrice":4800,"priceCurrency":"MAD"}},
    {"@type":"Offer","price":"5000"}]}</script>`;

  it('lit les prix, quel que soit leur niveau dans les données', () => {
    expect(extrairePrixStructures(html)).toEqual([4800, 5000]);
  });

  it('refuse un prix qui n’est pas un prix TTC déclaré', () => {
    const problemes = analyserPrixStructures([4800, 5000, 4000], prix);
    expect(problemes.map(({ extrait }) => extrait)).toEqual(['5000', '4000']);
    expect(problemes.every(({ niveau }) => niveau === 'erreur')).toBe(true);
  });
});

describe('conditionsPrix', () => {
  const completes = [
    'Digital Solutions, SARL au capital de 100 000 DH.',
    'Registre du commerce : Fès, numéro 12345',
    'Identifiant fiscal (IF) : 12345678',
  ];

  it('ne signale rien quand les mentions légales et la validité sont complètes', () => {
    expect(
      conditionsPrix({ mentionsLegales: completes, validite: '31 mars 2027', strict: true }),
    ).toEqual([]);
  });

  it('signale chaque condition manquante, en erreur seulement en mode strict', () => {
    const options = { mentionsLegales: ['Adresse : Fès'], validite: '[date]' };
    const avertissements = conditionsPrix({ ...options, strict: false });
    expect(avertissements).toHaveLength(4);
    expect(avertissements.every(({ niveau }) => niveau === 'avertissement')).toBe(true);
    expect(conditionsPrix({ ...options, strict: true }).every((p) => p.niveau === 'erreur')).toBe(
      true,
    );
  });
});
