/**
 * Tous les prix du site, au même endroit.
 *
 * Règle du projet : ne jamais inventer de prix. Gardez les placeholders `[X] €`
 * tant que les prix ne sont pas fixés (voir docs/brief-agence.md, section 8).
 */
export const tarifs = {
  siteVitrine: '[X] €',
  boutique: '[X] €',
  mvp: '[X] €',
  automatisation: '[X] €',
} as const;

export interface ForfaitMaintenance {
  nom: string;
  recommande: boolean;
  pourQui: string;
  sauvegardes: string;
  modifications: string;
  delaiIntervention: string;
  rapportMensuel: boolean;
  prix: string;
}

/** Forfaits de la page « Hébergement et maintenance » (section 6.5 du brief). */
export const forfaitsMaintenance: ForfaitMaintenance[] = [
  {
    nom: 'Essentiel',
    recommande: false,
    pourQui: 'Sites vitrines, particuliers',
    sauvegardes: 'Hebdomadaires',
    modifications: '—',
    delaiIntervention: '[48 h ouvrées]',
    rapportMensuel: false,
    prix: '[X] €/mois',
  },
  {
    nom: 'Sérénité',
    recommande: true,
    pourQui: 'TPE, PME, boutiques en ligne',
    sauvegardes: 'Quotidiennes',
    modifications: '[1 h/mois]',
    delaiIntervention: '[24 h ouvrées]',
    rapportMensuel: true,
    prix: '[X] €/mois',
  },
  {
    nom: 'Pro',
    recommande: false,
    pourQui: 'Applications, sites critiques',
    sauvegardes: 'Quotidiennes + copie externe',
    modifications: '[3 h/mois]',
    delaiIntervention: '[4 h ouvrées]',
    rapportMensuel: true,
    prix: '[X] €/mois',
  },
];

export const engagementMaintenance = '[Sans engagement / Engagement de 12 mois]';
