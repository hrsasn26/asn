// Visuels des en-têtes : sources HTML dans design/heros/, images dans src/assets/heros/.
import { readdirSync, readFileSync } from 'node:fs';
import { analyserTexte, extraireTexte } from './content-rules.mjs';

export const DOSSIER_SOURCES = 'design/heros';
export const DOSSIER_IMAGES = 'src/assets/heros';

/** Noms des visuels : un fichier design/heros/<nom>.html par visuel. */
export function nomsSources() {
  return readdirSync(DOSSIER_SOURCES)
    .filter((fichier) => fichier.endsWith('.html'))
    .map((fichier) => fichier.replace(/\.html$/, ''))
    .sort();
}

/** @param {string} nom */
export function lireSource(nom) {
  return readFileSync(`${DOSSIER_SOURCES}/${nom}.html`, 'utf8');
}

/**
 * Vérifie une source avant le rendu. Le texte des images n'est pas lu par `pnpm check:content` :
 * les règles de contenu du site s'appliquent donc ici (aucun prix, mots à éviter, pas de « ! »).
 * Une source ne charge aucune ressource externe (pas de photo de stock) : les polices sont
 * ajoutées par le script de rendu.
 * @param {string} html
 * @returns {string[]} Les problèmes trouvés (liste vide si la source est correcte).
 */
export function problemesSource(html) {
  const problemes = analyserTexte(extraireTexte(html), { strict: true }).map(
    ({ regle, extrait }) => `${regle} : ${extrait}`,
  );
  for (const [ressource] of html.matchAll(/(?:url\(|src=|href=)\s*["']?[a-z]+:\/\/[^"')\s]*/gi)) {
    problemes.push(`ressource externe : ${ressource}`);
  }
  if (/<(script|link|img|iframe)\b/i.test(html)) {
    problemes.push('balise interdite (script, link, img ou iframe) : dessinez en HTML et CSS');
  }
  if (!html.includes('id="maquette"')) {
    problemes.push('élément racine id="maquette" absent');
  }
  return problemes;
}
