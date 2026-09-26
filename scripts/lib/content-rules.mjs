// Règles de contenu du site : docs/brief-agence.md (section 4) et CLAUDE.md.

/** Mots à éviter sur le site (section 4 du brief). */
export const MOTS_A_EVITER = [
  { mot: 'DevOps', motif: 'devops' },
  { mot: 'QA', motif: 'qa' },
  { mot: 'stack', motif: 'stacks?' },
  { mot: 'CI/CD', motif: 'ci\\s*/\\s*cd' },
  { mot: 'framework', motif: 'frameworks?' },
  { mot: 'solutions innovantes', motif: 'solutions?\\s+innovantes?' },
  { mot: 'optimiser', motif: 'optimis\\p{L}*' },
  { mot: 'digitaliser', motif: 'digitalis\\p{L}*' },
  { mot: '360°', motif: '360\\s*°' },
  // Décision du 26 septembre 2026 : le site ne parle plus d'« ingénieurs ».
  { mot: 'ingénieurs', motif: 'ingénieu\\p{L}*' },
];

/**
 * Mentions interdites : le site vise des projets au Maroc (droit marocain, loi 09-08).
 * « français » (la langue) reste autorisé.
 */
export const MENTIONS_INTERDITES = [
  { mot: 'France', motif: 'france' },
  { mot: 'RGPD', motif: 'rgpd' },
  { mot: 'CNIL', motif: 'cnil' },
];

/**
 * Montant affiché (ex. : « 5 000 DH », « [X] DH », « 300 € »). Aucun prix n'est public :
 * chaque prix est donné dans un devis. « capital de [montant] DH » (mentions légales) reste autorisé.
 */
const MONTANT = /(?:\[X\]|\d[\d\s.,]*)\s*(?:DH|MAD|dirhams?|€|euros?)(?![\p{L}\p{N}])/giu;

const ENTITES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/** @param {string} texte */
function decoderEntites(texte) {
  return texte.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entite, code) => {
    if (code[0] === '#') {
      const valeur =
        code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
      return String.fromCodePoint(valeur);
    }
    return ENTITES[/** @type {keyof typeof ENTITES} */ (code.toLowerCase())] ?? entite;
  });
}

/**
 * Collecte toutes les chaînes d'une valeur JSON (données structurées).
 * @param {unknown} valeur
 * @returns {string[]}
 */
function chainesJson(valeur) {
  if (typeof valeur === 'string') return [valeur];
  if (Array.isArray(valeur)) return valeur.flatMap(chainesJson);
  if (valeur && typeof valeur === 'object') return Object.values(valeur).flatMap(chainesJson);
  return [];
}

/**
 * Extrait le texte lu par les visiteurs et par les moteurs de recherche :
 * titre, méta-descriptions, données structurées, attributs textuels et contenu visible.
 * @param {string} html
 * @returns {string[]} Un fragment de texte par élément.
 */
export function extraireTexte(html) {
  /** @type {string[]} */
  const fragments = [];

  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      fragments.push(...chainesJson(JSON.parse(json ?? '')));
    } catch {
      fragments.push(json ?? '');
    }
  }

  for (const [, contenu] of html.matchAll(
    /<meta\s+(?:name="description"|property="og:[a-z_]+")\s+content="([^"]*)"/gi,
  )) {
    fragments.push(decoderEntites(contenu ?? ''));
  }

  for (const [, valeur] of html.matchAll(/\s(?:alt|aria-label|title|placeholder)="([^"]*)"/gi)) {
    fragments.push(decoderEntites(valeur ?? ''));
  }

  const corps = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, '\n');
  for (const ligne of decoderEntites(corps).split('\n')) {
    const texte = ligne.replace(/\s+/g, ' ').trim();
    if (texte) fragments.push(texte);
  }

  return fragments;
}

/**
 * @typedef {{ niveau: 'erreur' | 'avertissement', regle: string, extrait: string }} Probleme
 */

/**
 * Applique les règles de contenu à une liste de fragments de texte.
 * @param {string[]} fragments
 * @param {{ strict: boolean }} options En mode strict (production), les placeholders sont des erreurs.
 * @returns {Probleme[]}
 */
export function analyserTexte(fragments, { strict }) {
  /** @type {Probleme[]} */
  const problemes = [];

  for (const fragment of fragments) {
    for (const [placeholder] of fragment.matchAll(/\[[^\]\n]{1,200}\]/g)) {
      problemes.push({
        niveau: strict ? 'erreur' : 'avertissement',
        regle: 'placeholder',
        extrait: placeholder,
      });
    }

    for (const { mot, motif } of MOTS_A_EVITER) {
      const regex = new RegExp(`(?<![\\p{L}\\p{N}])${motif}(?![\\p{L}\\p{N}])`, 'giu');
      for (const correspondance of fragment.matchAll(regex)) {
        problemes.push({
          niveau: 'erreur',
          regle: `mot à éviter « ${mot} »`,
          extrait: contexte(fragment, correspondance.index ?? 0),
        });
      }
    }

    for (const { mot, motif } of MENTIONS_INTERDITES) {
      const regex = new RegExp(`(?<![\\p{L}\\p{N}])${motif}(?![\\p{L}\\p{N}])`, 'giu');
      for (const correspondance of fragment.matchAll(regex)) {
        problemes.push({
          niveau: 'erreur',
          regle: `mention interdite « ${mot} » (site pour le Maroc)`,
          extrait: contexte(fragment, correspondance.index ?? 0),
        });
      }
    }

    for (const correspondance of fragment.matchAll(MONTANT)) {
      problemes.push({
        niveau: 'erreur',
        regle: 'prix affiché (les prix sont donnés dans les devis)',
        extrait: contexte(fragment, correspondance.index ?? 0),
      });
    }

    // Un placeholder collé à un mot trahit une espace perdue lors du rendu
    // (ex. : « sous [48 h ouvrées]avec »). L'erreur resterait après le remplacement.
    for (const correspondance of fragment.matchAll(/\][^\s.,;:!?)»’'"/\]…-]|[^\s(«’'"/[]\[/gu)) {
      problemes.push({
        niveau: 'erreur',
        regle: 'espace manquante autour d’un placeholder',
        extrait: contexte(fragment, correspondance.index ?? 0),
      });
    }

    for (const correspondance of fragment.matchAll(/!/g)) {
      problemes.push({
        niveau: 'erreur',
        regle: "point d'exclamation",
        extrait: contexte(fragment, correspondance.index ?? 0),
      });
    }
  }

  return problemes;
}

/**
 * @param {string} texte
 * @param {number} index
 */
function contexte(texte, index) {
  const debut = Math.max(0, index - 30);
  const fin = Math.min(texte.length, index + 30);
  return `${debut > 0 ? '…' : ''}${texte.slice(debut, fin)}${fin < texte.length ? '…' : ''}`;
}
