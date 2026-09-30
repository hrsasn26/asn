import { equipe, type Membre } from '~/data/equipe';
import { services } from '~/data/navigation';
import { site } from '~/data/site';
import { offresDuService, ttc, type Offre } from '~/lib/prix';

/**
 * Identifiant de l'agence dans les données structurées. Les services et le site y renvoient :
 * les moteurs relient ainsi chaque page à la même entité (adresse, téléphone, logo).
 */
export const idOrganisation = `https://${site.domaine}/#organisation`;

/** Identifiant d'un membre de l'équipe : l'accueil (employee) et L'agence (Person) y renvoient. */
export const idPersonne = ({ ancre }: Membre) => `https://${site.domaine}/agence#${ancre}`;

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
    // Image de partage (pnpm image:partage).
    image: new URL('/og.png', url).href,
    email: site.email,
    telephone: site.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressCountry: site.adresse.pays,
    },
    // L'équipe affichée sur L'agence, décrite en détail sur cette page (personneJsonLd).
    employee: equipe.map((membre) => ({
      '@type': 'Person',
      '@id': idPersonne(membre),
      name: membre.nom,
    })),
  };
}

/** Données structurées d'un membre de l'équipe (schema.org Person), avec le texte affiché. */
export function personneJsonLd(membre: Membre) {
  return {
    '@type': 'Person',
    '@id': idPersonne(membre),
    name: membre.nom,
    jobTitle: membre.role,
    description: membre.text,
    worksFor: { '@id': idOrganisation },
  };
}

/** Données structurées de la page L'agence (schema.org AboutPage) : elle présente l'agence. */
export function pageAgenceJsonLd(url: URL | string, name: string, description: string) {
  return {
    '@type': 'AboutPage',
    name,
    description,
    url: String(url),
    inLanguage: 'fr',
    about: { '@id': idOrganisation },
  };
}

/**
 * Prix de départ d'une offre (schema.org Offer) : le prix TTC affiché sur la page, comme prix
 * minimal (« à partir de »). Une offre sur devis n'a pas d'entrée (brief, section 6.22).
 */
function offreJsonLd({ nom, description, ht, unite }: Offre & { ht: number }) {
  return {
    '@type': 'Offer',
    name: nom,
    description,
    priceSpecification: {
      '@type': unite ? 'UnitPriceSpecification' : 'PriceSpecification',
      minPrice: ttc(ht),
      priceCurrency: 'MAD',
      valueAddedTaxIncluded: true,
      ...(unite && { unitText: unite }),
    },
  };
}

/**
 * Données structurées d'une page de service (schema.org Service), sans zone servie.
 * Les offres de la page qui ont un prix de départ y figurent, avec le même montant TTC.
 * `href` : chemin de la page dans la liste des services (src/data/navigation.ts). Son libellé
 * sert de type de service.
 */
export function serviceJsonLd(
  { name, description, href }: { name: string; description: string; href: string },
  base: URL | string,
) {
  const service = services.find((element) => element.href === href);
  if (!service) throw new Error(`Service inconnu : ${href}`);
  return {
    '@type': 'Service',
    '@id': `https://${site.domaine}${href}#service`,
    name,
    serviceType: service.label,
    description,
    url: new URL(href, base).href,
    provider: { '@type': 'ProfessionalService', '@id': idOrganisation, name: site.nom },
    offers: offresDuService(href)
      .filter((offre): offre is Offre & { ht: number } => offre.ht !== null)
      .map(offreJsonLd),
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
