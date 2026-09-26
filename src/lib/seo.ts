import { site } from '~/data/site';

/**
 * Données structurées de l'agence (schema.org ProfessionalService).
 * Pas d'adresse (address) ni de zone servie (areaServed) tant que l'adresse de l'agence n'est pas
 * confirmée (brief, section 4 : « Aucune valeur non confirmée »). Pas d'e-mail tant qu'il est un
 * placeholder entre crochets.
 */
export function organisationJsonLd(url: URL | string) {
  return {
    '@type': 'ProfessionalService',
    name: site.nom,
    url: String(url),
    // Symbole du logo, 512 px (pnpm image:logo).
    logo: new URL('/logo.png', url).href,
    ...(site.email.startsWith('[') ? {} : { email: site.email }),
  };
}

/** Données structurées d'une page de service (schema.org Service), sans zone servie. */
export function serviceJsonLd({ name, description }: { name: string; description: string }) {
  return {
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'ProfessionalService', name: site.nom },
  };
}
