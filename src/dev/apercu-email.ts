import type { APIRoute } from 'astro';
import { emailAudit, emailContact } from '~/lib/emails';
import type { Email } from '~/lib/mailer';

/**
 * Aperçu des e-mails des formulaires, en développement seulement (`pnpm dev`, route ajoutée
 * par astro.config.mjs) : /apercu-email/contact et /apercu-email/audit.
 * Ajoutez `?format=texte` pour la version texte. Les données sont fictives.
 */
export const prerender = false;

const exemples = new Map<string, () => Email>([
  [
    'contact',
    () =>
      emailContact({
        nom: 'Camille Martin',
        email: 'camille@exemple.ma',
        telephone: '+212 6 00 00 00 00',
        projet: 'site-web',
        message:
          'Bonjour,\nJe souhaite créer un site vitrine pour mon activité, avec un formulaire de contact.\nMerci de me rappeler.',
        consentement: true,
      }),
  ],
  [
    'audit',
    () =>
      emailAudit({
        adresseSite: 'https://monsite.ma/',
        nom: 'Camille Martin',
        email: 'camille@exemple.ma',
        telephone: undefined,
        preoccupation: 'securite',
        consentement: true,
      }),
  ],
]);

export const GET: APIRoute = ({ params, url }) => {
  const email = exemples.get(params['formulaire'] ?? '')?.();
  if (!email) {
    return new Response('Aperçus : /apercu-email/contact et /apercu-email/audit.', {
      status: 404,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
  return url.searchParams.get('format') === 'texte'
    ? new Response(email.texte, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
    : new Response(email.html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
};
