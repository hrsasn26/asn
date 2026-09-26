import { site } from '~/data/site';

/**
 * Données structurées de l'agence (schema.org ProfessionalService).
 * Pas de zone servie (areaServed) tant qu'elle n'est pas confirmée (brief, section 4 :
 * « Aucune valeur non confirmée »).
 */
export function organisationJsonLd(url: URL | string) {
  return {
    '@type': 'ProfessionalService',
    name: site.nom,
    url: String(url),
    // Symbole du logo, 512 px (pnpm image:logo).
    logo: new URL('/logo.png', url).href,
    email: site.email,
    telephone: site.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressCountry: site.adresse.pays,
    },
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
