/**
 * Google Tag Manager, pour Google Ads.
 *
 * Décision de l'agence du 26 septembre 2026 : pas de bandeau des cookies ni de lien pour les
 * refuser. Tag Manager se charge pour tous les visiteurs (composant `TagManager`).
 */

/**
 * Tag Manager se charge seulement sur le domaine de l'agence : pas sur les aperçus Vercel, ni
 * en développement, ni pendant les tests. Les statistiques de Google Ads restent propres.
 */
export function tagManagerAutorise(hote: string, domaine: string): boolean {
  return hote === domaine;
}

/** Adresse du script de Tag Manager. L'identifiant a la forme « GTM-XXXXXXX ». */
export function urlTagManager(identifiant: string): string {
  if (!/^GTM-[A-Z0-9]+$/.test(identifiant)) {
    throw new Error(`Identifiant Google Tag Manager invalide : ${identifiant}`);
  }
  return `https://www.googletagmanager.com/gtm.js?id=${identifiant}`;
}
