/**
 * Prix de départ affichés sur le site (brief, section 6.22). Source unique : src/data/prix.json.
 *
 * Règles (décision du 30 septembre 2026) :
 * - un seul montant par offre, précédé de « à partir de » : pas de fourchette, pas de calcul
 *   d'estimation, pas de tarif à la journée ou à l'heure pour un projet ;
 * - le prix TTC d'abord (loi 31-08, clients particuliers), puis le prix HT ;
 * - un niveau de complexité (simple, intermédiaire, avancé) aide à situer un projet ;
 * - une offre sans prix (`ht: null`) affiche « Sur devis ».
 *
 * `pnpm check:content` lit le même fichier : un montant affiché qui n'y figure pas bloque la CI.
 * Les montants s'écrivent avec des espaces insécables, pour ne pas être coupés en fin de ligne.
 */
import donnees from '../data/prix.json';
import { estConfirme } from './placeholders';

export type Niveau = 'simple' | 'intermediaire' | 'avance';
export type TypeOffre = 'projet' | 'option' | 'suivi' | 'forfait';
export type Unite = 'mois' | 'jour' | 'langue';

export interface Offre {
  id: string;
  /** Page du service (src/data/navigation.ts). */
  service: string;
  type: TypeOffre;
  niveau: Niveau | null;
  nom: string;
  /** Ce que l'offre contient : un « à partir de » doit décrire une offre réelle. */
  description: string;
  /** Prix de départ hors taxes, en dirhams. `null` : sur devis. */
  ht: number | null;
  unite: Unite | null;
  /** Offre de référence du pôle, citée sur sa carte (accueil, page Services). */
  reference: boolean;
}

export const offres = donnees.offres as Offre[];

/** Taux de TVA appliqué aux prix affichés, en pourcentage. */
export const tauxTva = donnees.tauxTva;

/** Libellés des niveaux de complexité, du plus simple au plus avancé. */
export const NIVEAUX: Record<Niveau, { label: string; rang: 1 | 2 | 3 }> = {
  simple: { label: 'Simple', rang: 1 },
  intermediaire: { label: 'Intermédiaire', rang: 2 },
  avance: { label: 'Avancé', rang: 3 },
};

const INSECABLE = ' ';

/** Offre par son identifiant. Une faute de frappe arrête le build. */
export function offre(id: string): Offre {
  const trouvee = offres.find((element) => element.id === id);
  if (!trouvee) throw new Error(`Offre inconnue dans src/data/prix.json : ${id}`);
  return trouvee;
}

/** Offres d'une page de service, dans l'ordre du fichier (du prix le plus bas au plus haut). */
export function offresDuService(service: string, type?: TypeOffre): Offre[] {
  return offres.filter(
    (element) => element.service === service && (type === undefined || element.type === type),
  );
}

/** Offre de référence d'un pôle (carte du service). */
export function offreDeReference(service: string): Offre | undefined {
  return offres.find((element) => element.service === service && element.reference);
}

/** Prix toutes taxes comprises, arrondi au dirham. */
export function ttc(ht: number): number {
  return Math.round((ht * (100 + tauxTva)) / 100);
}

/** « 4 800 DH » : milliers séparés par une espace insécable. */
export function formaterMontant(montant: number): string {
  const chiffres = String(montant).replace(/\B(?=(\d{3})+$)/g, INSECABLE);
  return `${chiffres}${INSECABLE}DH`;
}

/** « par mois », « par jour », « par langue », ou rien. */
export function libelleUnite({ unite }: Pick<Offre, 'unite'>): string {
  return unite ? `par${INSECABLE}${unite}` : '';
}

/** « 4 800 DH TTC ». Chaîne vide pour une offre sur devis. */
export function prixTtc({ ht }: Pick<Offre, 'ht'>): string {
  return ht === null ? '' : `${formaterMontant(ttc(ht))}${INSECABLE}TTC`;
}

/** « 4 000 DH HT ». Chaîne vide pour une offre sur devis. */
export function prixHt({ ht }: Pick<Offre, 'ht'>): string {
  return ht === null ? '' : `${formaterMontant(ht)}${INSECABLE}HT`;
}

/**
 * Prix complet d'une offre dans une phrase : « 4 800 DH TTC (4 000 DH HT) », suivi de l'unité
 * (« par mois »). À faire précéder de « à partir de ».
 */
export function prixComplet(id: string): string {
  const element = offre(id);
  if (element.ht === null) throw new Error(`L'offre ${id} est sur devis : elle n'a pas de prix.`);
  return [`${prixTtc(element)} (${prixHt(element)})`, libelleUnite(element)]
    .filter(Boolean)
    .join(' ');
}

/**
 * Date de fin de validité des prix, ou `undefined` tant qu'elle n'est pas confirmée : la phrase
 * « Prix valables jusqu'au… » reste alors cachée (brief, section 4 : « Aucune valeur non
 * confirmée »).
 */
export const validitePrix: string | undefined = estConfirme(donnees.validite)
  ? donnees.validite
  : undefined;
