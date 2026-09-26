/**
 * Consentement aux cookies de Google (Tag Manager et Google Ads).
 *
 * Loi 09-08 : aucun cookie de suivi sans l'accord du visiteur (brief, section 7). Le site ne
 * charge Google Tag Manager qu'après un clic sur « Accepter » dans le bandeau (composant
 * `BandeauCookies`). Sans choix, après un refus ou sans JavaScript, aucune requête ne part vers
 * Google.
 */

/** Clé du choix du visiteur dans le stockage local du navigateur. */
export const CLE_CONSENTEMENT = 'consentement-cookies';

export type ChoixCookies = 'accepte' | 'refuse';

/** Choix enregistré, ou `undefined` si le visiteur n'a pas encore choisi. */
export function lireChoix(valeur: string | null): ChoixCookies | undefined {
  return valeur === 'accepte' || valeur === 'refuse' ? valeur : undefined;
}

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

/**
 * Cookies déposés par les balises de Google sur le domaine du site (Google Ads : `_gcl_…`,
 * Google Analytics : `_ga…`, `_gid`). Ils sont effacés quand le visiteur retire son accord.
 */
export function cookiesGoogle(cookies: string): string[] {
  return cookies
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim() ?? '')
    .filter((nom) => /^(_gcl|_ga|_gid|_gat)/.test(nom));
}
