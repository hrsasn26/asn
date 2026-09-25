/**
 * Tous les prix du site, au même endroit.
 *
 * Règle du projet : ne jamais inventer de prix. Gardez les placeholders `[X] DH`
 * tant que les prix ne sont pas fixés (voir docs/brief-agence.md, section 8).
 */
export const tarifs = {
  siteVitrine: '[X] DH',
  boutique: '[X] DH',
  mvp: '[X] DH',
  automatisation: '[X] DH',
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
    prix: '[X] DH/mois',
  },
  {
    nom: 'Sérénité',
    recommande: true,
    pourQui: 'TPE, PME, boutiques en ligne',
    sauvegardes: 'Quotidiennes',
    modifications: '[1 h/mois]',
    delaiIntervention: '[24 h ouvrées]',
    rapportMensuel: true,
    prix: '[X] DH/mois',
  },
  {
    nom: 'Pro',
    recommande: false,
    pourQui: 'Applications, sites critiques',
    sauvegardes: 'Quotidiennes + copie externe',
    modifications: '[3 h/mois]',
    delaiIntervention: '[4 h ouvrées]',
    rapportMensuel: true,
    prix: '[X] DH/mois',
  },
];

export const engagementMaintenance = '[Sans engagement / Engagement de 12 mois]';
