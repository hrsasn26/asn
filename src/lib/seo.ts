import { site } from '~/data/site';

/**
 * Identifiant de l'agence dans les données structurées. Les services et le site y renvoient :
 * les moteurs relient ainsi chaque page à la même entité (adresse, téléphone, logo).
 */
export const idOrganisation = `https://${site.domaine}/#organisation`;

/**
 * Données structurées de l'agence (schema.org ProfessionalService).
 * Pas de zone servie (areaServed) tant qu'elle n'est pas confirmée (brief, section 4 :
 * « Aucune valeur non confirmée »).
 */
export function organisationJsonLd(url: URL | string, description: string) {
  return {
    '@type': 'ProfessionalService',
    '@id': idOrganisation,
    name: site.nom,
    // Meta description de l'accueil, reprise telle quelle.
    description,
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
    provider: { '@type': 'ProfessionalService', '@id': idOrganisation, name: site.nom },
  };
}

/** Données structurées du site (schema.org WebSite) : nom affiché par Google, éditeur. */
export function siteWebJsonLd(url: URL | string) {
  return {
    '@type': 'WebSite',
    name: site.nom,
    url: String(url),
    inLanguage: 'fr',
    publisher: { '@id': idOrganisation },
  };
}
