/**
 * Forfaits d'hébergement et de maintenance (section 6.5 du brief).
 *
 * Règle du projet : aucun prix public. Chaque prix est donné dans un devis.
 * `pnpm check:content` bloque tout montant affiché sur le site.
 */
export interface ForfaitMaintenance {
  nom: string;
  recommande: boolean;
  pourQui: string;
  sauvegardes: string;
  modifications: string;
  delaiIntervention: string;
  rapportMensuel: boolean;
}

export const forfaitsMaintenance: ForfaitMaintenance[] = [
  {
    nom: 'Essentiel',
    recommande: false,
    pourQui: 'Sites vitrines, particuliers',
    sauvegardes: 'Hebdomadaires',
    modifications: '—',
    delaiIntervention: '[48 h ouvrées]',
    rapportMensuel: false,
  },
  {
    nom: 'Sérénité',
    recommande: true,
    pourQui: 'TPE, PME, boutiques en ligne',
    sauvegardes: 'Quotidiennes',
    modifications: '[1 h/mois]',
    delaiIntervention: '[24 h ouvrées]',
    rapportMensuel: true,
  },
  {
    nom: 'Pro',
    recommande: false,
    pourQui: 'Applications, sites critiques',
    sauvegardes: 'Quotidiennes + copie externe',
    modifications: '[3 h/mois]',
    delaiIntervention: '[4 h ouvrées]',
    rapportMensuel: true,
  },
];

export const engagementMaintenance = '[Sans engagement / Engagement de 12 mois]';
