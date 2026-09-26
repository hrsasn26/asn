/**
 * Informations générales de l'agence.
 *
 * Les valeurs entre crochets sont des placeholders du brief (docs/brief-agence.md).
 * Ne les remplacez que par des informations confirmées.
 * Le site n'affiche pas une valeur encore entre crochets (`estConfirme`, src/lib/placeholders.ts) :
 * la ligne qui la cite apparaît quand la vraie valeur remplace le placeholder.
 *
 * Les délais, le pays d'hébergement, la ville, l'adresse et la zone servie ne sont pas affichés
 * tant qu'ils ne sont pas confirmés (brief, section 4 : « Aucune valeur non confirmée »), ni sur
 * les pages, ni dans les données structurées, ni dans llms.txt.
 */
export const site = {
  nom: 'Digital Solutions',
  /** Domaine du site. L'adresse sans « www » redirige vers celui-ci. */
  domaine: 'www.digital-solutions.ma',
  email: 'contact@digital-solutions.ma',
  /** À remplacer quand le numéro sera disponible. D'ici là, il n'est pas affiché. */
  telephone: '[numéro de téléphone]',
} as const;

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
