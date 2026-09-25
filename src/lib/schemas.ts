import { z } from 'astro/zod';

/** Types de projet proposés dans le formulaire de contact. */
export const typesProjet = {
  'site-web': 'Site web',
  application: 'Application sur mesure',
  automatisation: 'Automatisation et intégrations',
  hebergement: 'Hébergement et maintenance',
  autre: 'Autre',
} as const;

/** Préoccupations proposées dans le formulaire d'audit (section 6.6 du brief). */
export const preoccupations = {
  vitesse: 'Vitesse',
  securite: 'Sécurité',
  referencement: 'Référencement',
  'ne-sais-pas': 'Je ne sais pas',
} as const;

const texteObligatoire = (message: string, max: number) =>
  z
    .string({ error: message })
    .trim()
    .min(1, { error: message })
    .max(max, {
      error: `Ce champ ne doit pas dépasser ${max} caractères.`,
    });

const nom = texteObligatoire('Indiquez votre nom.', 100);

const email = z
  .email({ error: 'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.' })
  .max(200, { error: "L'adresse e-mail ne doit pas dépasser 200 caractères." });

const telephone = z
  .string()
  .trim()
  .max(30, { error: 'Le numéro de téléphone ne doit pas dépasser 30 caractères.' })
  .optional();

const consentement = z.boolean().refine((valeur) => valeur, {
  error: 'Acceptez la politique de confidentialité pour envoyer votre demande.',
});

/** Champ piège : invisible pour les visiteurs, souvent rempli par les robots. */
const piege = z.string().optional();

/**
 * Ajoute « https:// » si le visiteur a saisi seulement « monsite.fr ».
 * Retourne `undefined` si l'adresse n'est pas celle d'un site public.
 */
export function normaliserAdresseSite(saisie: string): string | undefined {
  const texte = saisie.trim();
  const avecProtocole = /^https?:\/\//i.test(texte) ? texte : `https://${texte}`;
  try {
    const url = new URL(avecProtocole);
    if (!url.hostname.includes('.') || url.hostname.endsWith('.')) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

const messageAdresse = "Indiquez l'adresse de votre site, par exemple monsite.fr.";

const adresseSite = texteObligatoire(messageAdresse, 300)
  .refine((valeur) => normaliserAdresseSite(valeur) !== undefined, { error: messageAdresse })
  .transform((valeur) => normaliserAdresseSite(valeur) as string);

export const schemaContact = z.object({
  nom,
  email,
  telephone,
  // Liste déroulante facultative : la valeur vide devient `undefined`.
  projet: z.enum(Object.keys(typesProjet) as [keyof typeof typesProjet]).optional(),
  message: texteObligatoire('Décrivez votre projet en quelques lignes.', 5000),
  consentement,
  website: piege,
});

export const schemaAudit = z.object({
  adresseSite,
  nom,
  email,
  telephone,
  preoccupation: z
    .enum(Object.keys(preoccupations) as [keyof typeof preoccupations])
    .default('ne-sais-pas'),
  consentement,
  website: piege,
});

export type DemandeContact = z.infer<typeof schemaContact>;
export type DemandeAudit = z.infer<typeof schemaAudit>;
