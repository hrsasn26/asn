/**
 * Visuels des en-têtes : maquettes d'écrans pour des clients fictifs.
 * Textes (texte alternatif, légende) : docs/brief-agence.md, section 6.19 (validés le 26 septembre 2026).
 * Images : `pnpm image:heros` les génère depuis design/heros/<nom>.html dans src/assets/heros/,
 * une image AVIF par largeur (<nom>-<largeur>.avif) et une image WebP pour les anciens navigateurs
 * (<nom>.webp). Voir design/heros/README.md.
 * Les mêmes images servent de vignettes aux cartes de services (accueil, page Services).
 */

/** Taille des maquettes, en pixels CSS. Les images gardent ce rapport largeur / hauteur. */
export const LARGEUR_MAQUETTE = 1040;
export const HAUTEUR_MAQUETTE = 720;

/** Largeurs des images AVIF, en pixels : téléphones, tablettes et ordinateurs, écrans haute densité. */
export const LARGEURS_AVIF = [480, 720, 960, 1200, 1600];

/** Largeur de l'image WebP, pour les navigateurs qui ne lisent pas l'AVIF. */
export const LARGEUR_WEBP = 1200;

/** Texte alternatif de chaque visuel : une description courte pour les lecteurs d'écran. */
export const maquettes = {
  accueil:
    "Site et application de réservation d'un cabinet dentaire, sur ordinateur et sur téléphone",
  'sites-web':
    "Site d'un riad à Marrakech avec réservation en ligne, sur ordinateur et sur téléphone",
  'applications-sur-mesure':
    "Application d'un garage : planning de l'atelier sur ordinateur, devis signé par le client sur téléphone",
  'applications-mobiles':
    "Deux applications mobiles : la carte de fidélité d'un café et les interventions du jour d'un technicien",
  'logiciels-saas':
    "Logiciel de réservation pour salons de beauté : agenda de l'équipe et page de réservation sur téléphone",
  'intelligence-artificielle':
    'Lecture automatique des factures fournisseurs avec une erreur de TVA signalée, et assistant qui répond aux clients',
  'automatisation-integrations':
    "Automatisation d'une demande de devis : contact créé, équipe prévenue et confirmation envoyée au client sur WhatsApp",
  'donnees-tableaux-de-bord':
    "Tableau de bord des ventes d'une boutique, sur ordinateur et sur téléphone, avec une alerte de stock faible",
  'tests-securite':
    'Rapport de tests avant une mise en ligne : parcours clients, audit de sécurité et test de charge',
  'hebergement-maintenance':
    "Espace client d'un site hébergé : disponibilité, sauvegardes, certificat et mises à jour, avec les notifications sur téléphone",
  'audit-gratuit':
    "Rapport d'audit gratuit : notes de vitesse, de sécurité et de référencement, avec les actions prioritaires",
} as const satisfies Record<string, string>;

export type NomMaquette = keyof typeof maquettes;

/** Légende affichée sous chaque visuel : les clients et les chiffres ne sont pas réels. */
export const legendeMaquette = 'Exemple fictif : le client et les chiffres sont inventés.';

/** Légende affichée sous la grille des cartes de services, qui montrent les mêmes visuels en petit. */
export const legendeVignettes =
  'Visuels des cartes : exemples fictifs, les clients et les chiffres sont inventés.';

/**
 * Largeur affichée des visuels (attribut sizes), selon leur place dans la page. Les valeurs suivent
 * les mises en page : contenu de 1200 px au plus, marges de 32 px (20 px sur téléphone).
 */
export const TAILLES_MAQUETTE = {
  /** En-tête en deux colonnes (pages de services, audit gratuit) : à droite du texte. */
  colonne:
    '(min-width: 1264px) 620px, (min-width: 1008px) calc((100vw - 128px) * 0.545), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)',
  /** En-tête centré (accueil) : sous le texte, 1040 px au plus. */
  centre: '(min-width: 1104px) 1040px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)',
  /** Vignette d'une carte de service : grille de une à trois colonnes. */
  vignette:
    '(min-width: 1264px) 340px, (min-width: 1072px) calc(33.3vw - 81px), (min-width: 728px) calc(50vw - 88px), (min-width: 640px) calc(100vw - 108px), calc(100vw - 84px)',
  /** Encadré de l'audit gratuit (accueil) : à droite du texte. */
  encadre:
    '(min-width: 1264px) 565px, (min-width: 904px) calc((100vw - 64px) * 0.524 - 64px), (min-width: 640px) calc(100vw - 128px), calc(100vw - 88px)',
} as const;
