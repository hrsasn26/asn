/**
 * Informations générales de l'agence.
 *
 * Les valeurs entre crochets sont des placeholders du brief (docs/brief-agence.md).
 * Ne les remplacez que par des informations confirmées.
 * Le site n'affiche pas une valeur encore entre crochets (`estConfirme`, src/lib/placeholders.ts) :
 * la ligne qui la cite apparaît quand la vraie valeur remplace le placeholder.
 *
 * Les délais, le pays d'hébergement et la zone servie ne sont pas affichés tant qu'ils ne sont
 * pas confirmés (brief, section 4 : « Aucune valeur non confirmée »), ni sur les pages, ni dans
 * les données structurées, ni dans llms.txt.
 */
export const site = {
  nom: 'Digital Solutions',
  /** Domaine du site. L'adresse sans « www » redirige vers celui-ci. */
  domaine: 'www.digital-solutions.ma',
  email: 'contact@digital-solutions.ma',
  /** Reçu le 26 septembre 2026. Format d'affichage : le lien `tel:` retire les espaces. */
  telephone: '+212 6 10 73 23 77',
  /**
   * Compte WhatsApp Business de l'agence, partagé par l'équipe : même numéro que le téléphone
   * (26 septembre 2026). Format international obligatoire : le lien wa.me en dépend
   * (src/lib/whatsapp.ts).
   */
  whatsapp: '+212 6 10 73 23 77',
  /** Message déjà rempli à l'ouverture de la conversation (brief, section 6.11, à valider). */
  messageWhatsApp: 'Bonjour, je vous contacte depuis votre site. Mon projet : ',
  /** Adresse de l'agence, reçue le 26 septembre 2026 (brief, section 6.11). */
  adresse: {
    rue: 'N° 7, rue Tantane',
    codePostal: '30000',
    ville: 'Fès',
    /** Code du pays (ISO 3166-1), pour les données structurées. */
    pays: 'MA',
  },
} as const;

/** Adresse sur une ligne : « N° 7, rue Tantane, 30000 Fès ». */
export const adresseComplete = `${site.adresse.rue}, ${site.adresse.codePostal} ${site.adresse.ville}`;

/** Lien d'appel : « tel:+212610732377 ». */
export const lienTelephone = `tel:${site.telephone.replaceAll(' ', '')}`;

/**
 * Paramètres de l'offre cités dans les CGV (projet de texte à faire valider par un juriste).
 * Chaque phrase est cachée tant que sa valeur est entre crochets.
 */
export const offre = {
  garantie: '[pendant X mois après la livraison : garantie à définir]',
  modalitesPaiement: '[à définir : acompte à la commande, solde à la livraison, etc.]',
} as const;

/**
 * Appels à l'action communs à tout le site : trois familles (section 6 du brief).
 * Les pages de services utilisent une variante de « Parler de mon projet ».
 */
export const cta = {
  principal: { label: 'Parler de mon projet', href: '/contact' },
  devis: { label: 'Demander un devis', href: '/contact' },
  secondaire: { label: 'Faire auditer mon site', href: '/audit-gratuit' },
} as const;
