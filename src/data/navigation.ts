export interface LienNav {
  label: string;
  href: string;
}

/** Les quatre pôles de services (section 5 du brief). */
export const services: LienNav[] = [
  { label: 'Sites web', href: '/services/sites-web' },
  { label: 'Applications sur mesure', href: '/services/applications-sur-mesure' },
  { label: 'Automatisation et intégrations', href: '/services/automatisation-integrations' },
  { label: 'Hébergement et maintenance', href: '/services/hebergement-maintenance' },
];

export const navigationPrincipale: LienNav[] = [
  { label: 'Services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: 'Méthode', href: '/methode' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: "L'agence", href: '/agence' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const liensLegaux: LienNav[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGV', href: '/cgv' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
