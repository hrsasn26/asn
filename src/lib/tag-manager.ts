/**
 * Google Tag Manager, pour Google Ads.
 *
 * Décision de l'agence du 26 septembre 2026 : pas de bandeau des cookies ni de lien pour les
 * refuser. Tag Manager se charge pour tous les visiteurs (composant `TagManager`).
 */

/**
 * Tag Manager se charge seulement sur le site construit pour le domaine de l'agence : pas sur
 * les aperçus Vercel, ni en développement, ni pendant les tests. Les statistiques de Google Ads
 * restent propres.
 *
 * La décision se prend au moment du build (adresse `site` d'Astro), pour que la balise soit
 * écrite dans le HTML : le vérificateur de Google Ads lit le HTML sans exécuter le JavaScript.
 * Sur Vercel, les aperçus sont construits avec l'adresse de production : la variable
 * `VERCEL_ENV` (`production`, `preview` ou `development`) les distingue.
 */
export function tagManagerAutorise(
  hote: string,
  domaine: string,
  environnementVercel?: string,
): boolean {
  if (hote !== domaine) return false;
  return environnementVercel === undefined || environnementVercel === 'production';
}

/** Adresse du script de Tag Manager. L'identifiant a la forme « GTM-XXXXXXX ». */
export function urlTagManager(identifiant: string): string {
  if (!/^GTM-[A-Z0-9]+$/.test(identifiant)) {
    throw new Error(`Identifiant Google Tag Manager invalide : ${identifiant}`);
  }
  return `https://www.googletagmanager.com/gtm.js?id=${identifiant}`;
}
