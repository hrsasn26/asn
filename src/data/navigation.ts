export interface LienNav {
  label: string;
  href: string;
}

/** Les neuf pôles de services (section 5 du brief). */
export const services: LienNav[] = [
  { label: 'Sites web', href: '/services/sites-web' },
  { label: 'Applications sur mesure', href: '/services/applications-sur-mesure' },
  { label: 'Applications mobiles', href: '/services/applications-mobiles' },
  { label: 'Logiciels SaaS', href: '/services/logiciels-saas' },
  { label: 'Intelligence artificielle', href: '/services/intelligence-artificielle' },
  { label: 'Automatisation et intégrations', href: '/services/automatisation-integrations' },
  { label: 'Données et tableaux de bord', href: '/services/donnees-tableaux-de-bord' },
  { label: 'Tests et sécurité', href: '/services/tests-securite' },
  { label: 'Hébergement et maintenance', href: '/services/hebergement-maintenance' },
];

/** Numéro d'un service sur deux chiffres (« 01 »), dans l'ordre de la liste des services. */
export function numeroService(href: string): string {
  const index = services.findIndex((service) => service.href === href);
  if (index < 0) throw new Error(`Service inconnu : ${href}`);
  return String(index + 1).padStart(2, '0');
}

/** Surtitre de l'en-tête d'une page de service : « Service 01 · Sites web ». */
export function surtitreService(href: string): string {
  const service = services.find((element) => element.href === href);
  return `Service ${numeroService(href)} · ${service?.label ?? ''}`;
}

export const navigationPrincipale: LienNav[] = [
  { label: 'Services', href: '/services' },
  { label: 'Processus', href: '/processus' },
  { label: "L'agence", href: '/agence' },
  { label: 'Contact', href: '/contact' },
];

export const liensLegaux: LienNav[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGV', href: '/cgv' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
