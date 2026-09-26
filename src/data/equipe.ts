/**
 * Équipe de l'agence : noms et rôles donnés par l'agence le 26 septembre 2026 (brief, section 6.10).
 * Affichée sur L'agence et reprise dans les données structurées (Person) de L'agence et de l'accueil.
 */
export interface Membre {
  nom: string;
  /** Titre choisi d'après le domaine de compétence (brief, section 6.10). */
  role: string;
  text: string;
  /** Fin de l'identifiant `@id` de la personne dans les données structurées. */
  ancre: string;
}

export const equipe: Membre[] = [
  {
    nom: 'Hamza Legdani',
    role: 'Architecte web et logiciels',
    text: 'Conçoit vos sites web, vos applications sur mesure et vos logiciels SaaS, puis les garde en ligne.',
    ancre: 'hamza-legdani',
  },
  {
    nom: 'Mohammed Reda Benaghmouch',
    role: 'Expert qualité et tests',
    text: 'Teste chaque site et chaque application avant la mise en ligne, et vérifie leur sécurité.',
    ancre: 'mohammed-reda-benaghmouch',
  },
  {
    nom: 'Saad Berrada',
    role: 'Architecte mobile et IA',
    text: "Conçoit vos applications mobiles, vos automatisations, vos tableaux de bord et vos outils d'intelligence artificielle.",
    ancre: 'saad-berrada',
  },
];
