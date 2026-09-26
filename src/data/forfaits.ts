/**
 * Forfaits d'hébergement et de maintenance (section 6.5 du brief).
 *
 * Règle du projet : aucun prix public. Chaque prix est donné dans un devis.
 * `pnpm check:content` bloque tout montant affiché sur le site.
 * Le volume de modifications, les délais d'intervention et la durée d'engagement ne sont pas
 * affichés sur la page Hébergement et maintenance tant qu'ils ne sont pas confirmés.
 */
export interface ForfaitMaintenance {
  nom: string;
  recommande: boolean;
  pourQui: string;
  sauvegardes: string;
  petitesModifications: boolean;
  rapportMensuel: boolean;
}

export const forfaitsMaintenance: ForfaitMaintenance[] = [
  {
    nom: 'Essentiel',
    recommande: false,
    pourQui: 'Sites vitrines',
    sauvegardes: 'Hebdomadaires',
    petitesModifications: false,
    rapportMensuel: false,
  },
  {
    nom: 'Sérénité',
    recommande: true,
    pourQui: 'Boutiques en ligne',
    sauvegardes: 'Quotidiennes',
    petitesModifications: true,
    rapportMensuel: true,
  },
  {
    nom: 'Pro',
    recommande: false,
    pourQui: 'Applications, sites critiques',
    sauvegardes: 'Quotidiennes + copie externe',
    petitesModifications: true,
    rapportMensuel: true,
  },
];

/**
 * Durée d'engagement, citée dans les CGV (projet de texte à faire valider par un juriste).
 * Cachée tant qu'elle est entre crochets.
 */
export const engagementMaintenance = '[Sans engagement / Engagement de 12 mois]';
