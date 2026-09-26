import { ActionError, defineAction, type ActionAPIContext } from 'astro:actions';
import { FORM_RATE_LIMIT_MAX } from 'astro:env/server';
import { site } from '~/data/site';
import { emailAudit, emailContact } from '~/lib/emails';
import { envoyerEmail, type Email } from '~/lib/mailer';
import { creerLimiteur } from '~/lib/rate-limit';
import { schemaAudit, schemaContact } from '~/lib/schemas';

// Par défaut, 5 demandes par adresse IP toutes les 10 minutes, tous formulaires confondus.
const limiteur = creerLimiteur({ maxEnvois: FORM_RATE_LIMIT_MAX, fenetreMs: 10 * 60 * 1000 });

/**
 * Adresse IP du visiteur. Astro lève une erreur si l'hébergeur ne la fournit pas
 * (ex. : en-tête X-Forwarded-For absent) : le formulaire doit fonctionner quand même.
 */
function adresseClient(context: ActionAPIContext): string {
  try {
    return context.clientAddress;
  } catch {
    return 'inconnue';
  }
}

async function traiterDemande(email: Email, context: ActionAPIContext) {
  if (!limiteur.autoriser(adresseClient(context))) {
    throw new ActionError({
      code: 'TOO_MANY_REQUESTS',
      message: 'Vous avez envoyé plusieurs demandes en peu de temps. Réessayez dans 10 minutes.',
    });
  }
  try {
    await envoyerEmail(email);
  } catch (erreur) {
    console.error('[formulaire] Échec de l’envoi', erreur);
    throw new ActionError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Votre demande n'a pas pu être envoyée. Réessayez plus tard ou écrivez-nous à ${site.email}.`,
    });
  }
}

export const server = {
  contact: defineAction({
    accept: 'form',
    input: schemaContact,
    handler: async (demande, context) => {
      // Champ piège rempli : c'est un robot. On répond comme si tout allait bien.
      if (demande.website) return { envoye: true };

      await traiterDemande(emailContact(demande), context);
      return { envoye: true };
    },
  }),

  audit: defineAction({
    accept: 'form',
    input: schemaAudit,
    handler: async (demande, context) => {
      if (demande.website) return { envoye: true };

      await traiterDemande(emailAudit(demande), context);
      return { envoye: true };
    },
  }),
};
