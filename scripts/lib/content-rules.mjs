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
 * Montant affiché (ex. : « 5 000 DH », « [X] DH », « 300 € »).
 *
 * Depuis le 30 septembre 2026, le site affiche des prix de départ (brief, section 6.22). Un
 * montant est accepté s'il figure dans src/data/prix.json et s'il est suivi de « TTC » ou de
 * « HT ». Tout autre montant est refusé : un prix ne s'écrit pas à la main dans une page.
 * Les visuels des en-têtes (clients fictifs) n'affichent toujours aucun prix.
 * « capital de [montant] DH » et « capital de 100 000 DH » (mentions légales) restent autorisés.
 */
const MONTANT =
  /(?<![\d.,])(\[X\]|\d{1,3}(?:\s\d{3})+|\d+(?:[.,]\d+)?)\s*(DH|MAD|dirhams?|€|euros?)(?![\p{L}\p{N}])(\s*(?:TTC|HT)(?![\p{L}\p{N}]))?/giu;

/** Clés des données structurées (schema.org) qui portent un prix. */
const CLES_PRIX = new Set(['price', 'minPrice', 'maxPrice', 'lowPrice', 'highPrice']);

/**
 * Prix déclarés dans src/data/prix.json : les montants hors taxes et toutes taxes comprises.
 * @param {{ tauxTva: number, offres: { ht: number | null }[] }} donnees
 * @returns {{ ttc: Set<number>, ht: Set<number> }}
 */
export function prixDeclares({ tauxTva, offres }) {
  const ht = offres.flatMap((offre) => (offre.ht === null ? [] : [offre.ht]));
  return {
    ht: new Set(ht),
    ttc: new Set(ht.map((montant) => Math.round((montant * (100 + tauxTva)) / 100))),
  };
}

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
 * Collecte les prix d'une valeur JSON (données structurées) : les nombres des clés `price`,
 * `minPrice`, `lowPrice`…
 * @param {unknown} valeur
 * @returns {number[]}
 */
function prixJson(valeur) {
  if (Array.isArray(valeur)) return valeur.flatMap(prixJson);
  if (!valeur || typeof valeur !== 'object') return [];
  return Object.entries(valeur).flatMap(([cle, contenu]) =>
    CLES_PRIX.has(cle) && (typeof contenu === 'number' || typeof contenu === 'string')
      ? [Number(contenu)]
      : prixJson(contenu),
  );
}

/**
 * Prix cités dans les données structurées d'une page. `analyserTexte` ne lit que les chaînes :
 * ces nombres sont vérifiés à part (`analyserPrixStructures`).
 * @param {string} html
 * @returns {number[]}
 */
export function extrairePrixStructures(html) {
  /** @type {number[]} */
  const prix = [];
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      prix.push(...prixJson(JSON.parse(json ?? '')));
    } catch {
      // Le JSON invalide est déjà lu comme du texte par extraireTexte.
    }
  }
  return prix;
}

/**
 * Un prix des données structurées doit être un prix TTC déclaré dans src/data/prix.json.
 * @param {number[]} prix
 * @param {{ ttc: Set<number>, ht: Set<number> }} declares
 * @returns {Probleme[]}
 */
export function analyserPrixStructures(prix, declares) {
  return prix
    .filter((montant) => !declares.ttc.has(montant))
    .map((montant) => ({
      niveau: /** @type {const} */ ('erreur'),
      regle: 'prix affiché non déclaré dans src/data/prix.json (données structurées, prix TTC)',
      extrait: String(montant),
    }));
}

/** Balises en ligne : leur texte fait partie de la phrase qui les entoure. */
const BALISES_EN_LIGNE =
  /<\/?(?:a|abbr|b|bdi|bdo|cite|code|data|dfn|em|i|kbd|mark|q|s|samp|small|span|strong|sub|sup|time|u|var|wbr)\b[^>]*>/gi;

/**
 * Extrait le texte lu par les visiteurs et par les moteurs de recherche :
 * titre, méta-descriptions, données structurées, attributs textuels et contenu visible.
 * Les balises en ligne (span, a, strong…) ne coupent pas le texte : un placeholder surligné
 * (« sous <span>[48 h ouvrées]</span>. ») reste dans sa phrase, et une espace manquante autour
 * de lui reste visible.
 * @param {string} html
 * @returns {string[]} Un fragment de texte par bloc.
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
    .replace(BALISES_EN_LIGNE, '')
    .replace(/<[^>]+>/g, '\n');
  for (const ligne of decoderEntites(corps).split('\n')) {
    const texte = ligne.replace(/\s+/g, ' ').trim();
    if (texte) fragments.push(texte);
  }

  return fragments;
}

/**
 * Extrait le texte d'un fichier Markdown (llms.txt) : le texte des liens reste, leurs adresses
 * et les marques de titre, de citation et de liste sont retirées.
 * @param {string} markdown
 * @returns {string[]} Un fragment de texte par ligne.
 */
export function extraireTexteMarkdown(markdown) {
  return markdown
    .split('\n')
    .map((ligne) =>
      ligne
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/^\s*(?:#{1,6}|>|[-*])\s+/, '')
        .trim(),
    )
    .filter(Boolean);
}

/**
 * @typedef {{ niveau: 'erreur' | 'avertissement', regle: string, extrait: string }} Probleme
 */

/**
 * Applique les règles de contenu à une liste de fragments de texte.
 * @param {string[]} fragments
 * @param {{ strict: boolean, prix?: { ttc: Set<number>, ht: Set<number> } }} options
 *   En mode strict (production), les placeholders sont des erreurs.
 *   `prix` : les prix déclarés (`prixDeclares`). Sans cette option, tout montant est refusé
 *   (visuels des en-têtes).
 * @returns {Probleme[]}
 */
export function analyserTexte(fragments, { strict, prix }) {
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
      const index = correspondance.index ?? 0;
      const regle = reglePrix(correspondance, fragment.slice(0, index), prix);
      if (regle) problemes.push({ niveau: 'erreur', regle, extrait: contexte(fragment, index) });
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
 * Règle enfreinte par un montant, ou `undefined` s'il est accepté.
 * @param {RegExpMatchArray} correspondance Résultat de MONTANT : nombre, devise, « TTC » ou « HT ».
 * @param {string} avant Texte qui précède le montant dans le fragment.
 * @param {{ ttc: Set<number>, ht: Set<number> } | undefined} prix
 * @returns {string | undefined}
 */
function reglePrix([, nombre = '', devise = '', taxe = ''], avant, prix) {
  // Capital social des mentions légales : ce n'est pas un prix.
  if (/capital de\s*$/i.test(avant)) return undefined;
  if (!prix) return 'prix affiché (aucun prix dans ce contenu)';
  if (devise !== 'DH') return 'prix affiché dans une autre écriture que « DH »';

  const montant = Number(nombre.replace(/\s/g, ''));
  const mention = taxe.trim().toUpperCase();
  if (mention === 'TTC' && prix.ttc.has(montant)) return undefined;
  if (mention === 'HT' && prix.ht.has(montant)) return undefined;
  if (mention === '' && (prix.ttc.has(montant) || prix.ht.has(montant))) {
    return 'prix affiché sans « TTC » ou « HT »';
  }
  return 'prix affiché non déclaré dans src/data/prix.json';
}

/**
 * Conditions pour publier des prix (étude de prix du 29 septembre 2026, à faire valider par le
 * juriste : loi 31-08, articles 21, 29 et 30). Une offre de prix en ligne demande les
 * identifiants de l'entreprise dans les mentions légales, et un « à partir de » demande une
 * durée de validité. En mode strict (production), une condition manquante est une erreur.
 * @param {{ mentionsLegales: string[], validite: string, strict: boolean }} options
 *   `mentionsLegales` : fragments de texte de la page Mentions légales.
 *   `validite` : valeur `validite` de src/data/prix.json.
 * @returns {Probleme[]}
 */
export function conditionsPrix({ mentionsLegales, validite, strict }) {
  const texte = mentionsLegales.join('\n');
  const manquants = [
    { nom: 'registre du commerce', motif: /registre du commerce/i },
    { nom: 'capital', motif: /capital de/i },
    { nom: 'identifiant fiscal', motif: /identifiant fiscal/i },
  ]
    .filter(({ motif }) => !motif.test(texte))
    .map(({ nom }) => `mentions légales sans ${nom} (src/data/site.ts, « entreprise »)`);
  if (/\[[^\]\n]+\]/.test(validite)) {
    manquants.push('date de fin de validité des prix absente (src/data/prix.json, « validite »)');
  }
  return manquants.map((extrait) => ({
    niveau: strict ? 'erreur' : 'avertissement',
    regle: 'prix affichés avant les conditions de publication',
    extrait,
  }));
}

/**
 * Vrai si un des fragments cite un montant en dirhams (hors capital social).
 * @param {string[]} fragments
 */
export function contientPrix(fragments) {
  return fragments.some((fragment) =>
    [...fragment.matchAll(MONTANT)].some(
      ({ index = 0 }) => !/capital de\s*$/i.test(fragment.slice(0, index)),
    ),
  );
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
