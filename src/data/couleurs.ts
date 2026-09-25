/**
 * Couleurs des icônes. Chaque service a sa couleur ; les autres icônes suivent la palette.
 * Les classes sont écrites en entier : Tailwind ne détecte pas les classes construites.
 */
export interface Couleur {
  /** Tuile foncée avec une icône blanche (cartes des services). */
  tuile: string;
  /** Tuile claire avec une icône colorée (grilles d'avantages). */
  douce: string;
  /** Icône seule, sur un fond clair. */
  icone: string;
  /** Remplissage d'une forme dans une illustration SVG. */
  remplissage: string;
}

const bleu: Couleur = {
  tuile: 'bg-blue-700',
  douce: 'bg-blue-50 text-blue-700',
  icone: 'text-blue-700',
  remplissage: 'fill-blue-700',
};
const indigo: Couleur = {
  tuile: 'bg-indigo-600',
  douce: 'bg-indigo-50 text-indigo-700',
  icone: 'text-indigo-700',
  remplissage: 'fill-indigo-600',
};
const violet: Couleur = {
  tuile: 'bg-violet-600',
  douce: 'bg-violet-50 text-violet-700',
  icone: 'text-violet-700',
  remplissage: 'fill-violet-600',
};
const cyan: Couleur = {
  tuile: 'bg-cyan-700',
  douce: 'bg-cyan-50 text-cyan-800',
  icone: 'text-cyan-800',
  remplissage: 'fill-cyan-700',
};
const fuchsia: Couleur = {
  tuile: 'bg-fuchsia-600',
  douce: 'bg-fuchsia-50 text-fuchsia-700',
  icone: 'text-fuchsia-700',
  remplissage: 'fill-fuchsia-600',
};
const orange: Couleur = {
  tuile: 'bg-orange-600',
  douce: 'bg-orange-50 text-orange-700',
  icone: 'text-orange-700',
  remplissage: 'fill-orange-600',
};
const teal: Couleur = {
  tuile: 'bg-teal-700',
  douce: 'bg-teal-50 text-teal-700',
  icone: 'text-teal-700',
  remplissage: 'fill-teal-700',
};
const rose: Couleur = {
  tuile: 'bg-rose-600',
  douce: 'bg-rose-50 text-rose-700',
  icone: 'text-rose-700',
  remplissage: 'fill-rose-600',
};
const emeraude: Couleur = {
  tuile: 'bg-emerald-700',
  douce: 'bg-emerald-50 text-emerald-700',
  icone: 'text-emerald-700',
  remplissage: 'fill-emerald-600',
};

/** Couleur de chaque service, par adresse de page (voir `services` dans navigation.ts). */
export const couleurService: Record<string, Couleur> = {
  '/services/sites-web': bleu,
  '/services/applications-sur-mesure': indigo,
  '/services/applications-mobiles': violet,
  '/services/logiciels-saas': cyan,
  '/services/intelligence-artificielle': fuchsia,
  '/services/automatisation-integrations': orange,
  '/services/donnees-tableaux-de-bord': teal,
  '/services/tests-securite': rose,
  '/services/hebergement-maintenance': emeraude,
};

/** Palette des grilles d'icônes : une couleur par carte, dans cet ordre. */
export const palette: Couleur[] = [
  bleu,
  emeraude,
  violet,
  orange,
  rose,
  teal,
  indigo,
  fuchsia,
  cyan,
];

/** Couleur d'un service. Un service sans couleur prend le bleu. */
export function couleurDuService(href: string): Couleur {
  return couleurService[href] ?? bleu;
}

/** Couleur de la carte n° `index` d'une grille : la palette recommence après la dernière couleur. */
export function couleurPalette(index: number): Couleur {
  return palette[index % palette.length] ?? bleu;
}
