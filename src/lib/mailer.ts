import { BREVO_API_KEY, MAIL_FROM, MAIL_TO, MAIL_TRANSPORT } from 'astro:env/server';

export interface Email {
  sujet: string;
  texte: string;
  repondreA: { email: string; nom: string };
}

/**
 * Envoie un e-mail à l'équipe.
 *
 * - `MAIL_TRANSPORT=brevo` : envoi par l'API transactionnelle de Brevo.
 * - `MAIL_TRANSPORT=log` : affichage dans la console (développement et tests).
 * Sans valeur, le transport `log` est utilisé en développement seulement.
 */
export async function envoyerEmail(email: Email): Promise<void> {
  const transport = MAIL_TRANSPORT ?? (import.meta.env.DEV ? 'log' : undefined);

  if (transport === 'log') {
    console.info(`[e-mail] ${email.sujet}\n${email.texte}`);
    return;
  }

  if (transport !== 'brevo' || !BREVO_API_KEY || !MAIL_FROM || !MAIL_TO) {
    throw new Error(
      "Envoi d'e-mail non configuré : définissez MAIL_TRANSPORT, BREVO_API_KEY, MAIL_FROM et MAIL_TO.",
    );
  }

  const reponse = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: MAIL_FROM, name: 'Site web' },
      to: [{ email: MAIL_TO }],
      replyTo: { email: email.repondreA.email, name: email.repondreA.nom },
      subject: email.sujet.replace(/[\r\n]+/g, ' '),
      textContent: email.texte,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!reponse.ok) {
    throw new Error(`Brevo a répondu ${reponse.status} : ${await reponse.text()}`);
  }
}
