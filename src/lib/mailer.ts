import {
  MAIL_FROM,
  MAIL_TO,
  MAIL_TRANSPORT,
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY,
} from 'astro:env/server';
import { site } from '../data/site';

export interface Email {
  sujet: string;
  texte: string;
  /** Version HTML (src/lib/emails.ts). Le texte reste pour les messageries sans HTML. */
  html?: string;
  repondreA: { email: string; nom: string };
}

/**
 * Envoie un e-mail à l'équipe.
 *
 * - `MAIL_TRANSPORT=mailjet` : envoi par l'API Send (v3.1) de Mailjet.
 * - `MAIL_TRANSPORT=log` : affichage dans la console (développement et tests).
 * Sans valeur, le transport `log` est utilisé en développement seulement.
 */
export async function envoyerEmail(email: Email): Promise<void> {
  const transport = MAIL_TRANSPORT ?? (import.meta.env.DEV ? 'log' : undefined);

  if (transport === 'log') {
    console.info(`[e-mail] ${email.sujet}\n${email.texte}`);
    return;
  }

  if (
    transport !== 'mailjet' ||
    !MAILJET_API_KEY ||
    !MAILJET_SECRET_KEY ||
    !MAIL_FROM ||
    !MAIL_TO
  ) {
    throw new Error(
      "Envoi d'e-mail non configuré : définissez MAIL_TRANSPORT, MAILJET_API_KEY, MAILJET_SECRET_KEY, MAIL_FROM et MAIL_TO.",
    );
  }

  const reponse = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      authorization: `Basic ${btoa(`${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`)}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      Messages: [
        {
          From: { Email: MAIL_FROM, Name: site.nom },
          To: [{ Email: MAIL_TO }],
          ReplyTo: { Email: email.repondreA.email, Name: email.repondreA.nom },
          Subject: email.sujet.replace(/[\r\n]+/g, ' '),
          TextPart: email.texte,
          HTMLPart: email.html,
        },
      ],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!reponse.ok) {
    throw new Error(`Mailjet a répondu ${reponse.status} : ${await reponse.text()}`);
  }
}
