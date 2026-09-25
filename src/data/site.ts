/**
 * Informations générales de l'agence.
 *
 * Les valeurs entre crochets sont des placeholders du brief (docs/brief-agence.md).
 * Ne les remplacez que par des informations confirmées.
 * Le script `pnpm check:content --strict` bloque la mise en production tant qu'il en reste.
 */
export const site = {
  nom: '[Nom]',
  zone: '[Ville ou région]',
  email: '[adresse e-mail de contact]',
  hebergement: '[France / Europe]',
  delaiReponse: '[48 h ouvrées]',
} as const;

/** Délais annoncés dans les textes des pages. */
export const delais = {
  siteVitrine: '[2 à 4 semaines]',
  boutique: '[4 à 8 semaines]',
  mvp: '[6 à 12 semaines]',
  iteration: '[2]',
  rapportAudit: '[5 jours ouvrés]',
  appelAudit: "[Un appel de 20 minutes pour vous l'expliquer]",
  retentionSauvegardes: '[30]',
} as const;

/** Autres paramètres de l'offre cités dans les pages. */
export const offre = {
  pagesSiteVitrine: '[5]',
  ageRefonte: '[3]',
  design:
    '[Nous travaillons avec un designer partenaire / Nous partons de modèles de qualité que nous adaptons à votre image]',
  confidentialiteIA: '[à confirmer selon les fournisseurs retenus]',
} as const;

/** Appels à l'action communs à tout le site (section 6 du brief). */
export const cta = {
  principal: { label: 'Demander un devis gratuit', href: '/contact' },
  secondaire: { label: 'Faire auditer mon site', href: '/audit-gratuit' },
} as const;
