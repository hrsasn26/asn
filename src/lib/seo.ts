import { site } from '~/data/site';

/** Données structurées de l'agence (schema.org ProfessionalService). */
export function organisationJsonLd(url: URL | string) {
  return {
    '@type': 'ProfessionalService',
    name: site.nom,
    url: String(url),
    email: site.email,
    address: { '@type': 'PostalAddress', addressCountry: site.pays },
    areaServed: site.zone,
  };
}

/** Données structurées d'une page de service (schema.org Service). */
export function serviceJsonLd({ name, description }: { name: string; description: string }) {
  return {
    '@type': 'Service',
    name,
    description,
    areaServed: site.zone,
    provider: { '@type': 'ProfessionalService', name: site.nom },
  };
}
