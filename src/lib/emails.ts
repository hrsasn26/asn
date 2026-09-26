import { adresseComplete, lienTelephone, site } from '../data/site';
import type { Email } from './mailer';
import { preoccupations, typesProjet, type DemandeAudit, type DemandeContact } from './schemas';

/**
 * E-mails envoyés à l'équipe par les formulaires (src/actions/index.ts).
 * Chaque demande part en deux versions : HTML (logo, tableau des champs, bouton « Répondre »,
 * pied de page de l'agence) et texte brut, pour les messageries qui n'affichent pas le HTML.
 *
 * Le HTML suit les règles des e-mails, pas celles des pages du site : mise en page en tableaux,
 * styles en ligne et couleurs en hexadécimal (beaucoup de messageries ignorent les feuilles de
 * style et les variables CSS). Aperçu en développement : /apercu-email/contact et
 * /apercu-email/audit (src/dev/apercu-email.ts).
 */

/**
 * Jetons de src/styles/global.css, en hexadécimal.
 * tests/unit/emails.test.ts vérifie que les valeurs sont les mêmes.
 */
export const couleurs = {
  encre: '#0b1b33',
  bleu: '#1d4ed8',
  texte: '#4b5770',
  doux: '#5a6578',
  discret: '#647089',
  surface: '#f4f6fa',
  ligne: '#e8ecf2',
} as const;

// Manrope si elle est installée sur l'appareil, sinon une police système.
const police = "Manrope, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const urlSite = `https://${site.domaine}`;

// Symbole du logo, servi par le site (public/logo.png, 512 px). Toujours l'adresse de
// production : les aperçus Vercel demandent une connexion, la messagerie n'afficherait rien.
export const urlLogo = `${urlSite}/logo.png`;

/** Une ligne du tableau de la demande. Sans valeur, la ligne affiche « — ». */
export interface Champ {
  libelle: string;
  valeur: string | undefined;
  /** La valeur devient un lien : adresse e-mail, numéro de téléphone ou adresse d'un site. */
  lien?: 'email' | 'telephone' | 'site';
}

export interface Demande {
  sujet: string;
  /** Titre de l'e-mail : « Nouvelle demande de contact ». */
  titre: string;
  /** Page du formulaire, en surtitre et dans l'introduction. */
  page: { label: string; chemin: string };
  champs: Champ[];
  /** Message libre du visiteur, sous le tableau. */
  message?: string;
  repondreA: { email: string; nom: string };
}

const entites: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Échappe un texte avant de l'insérer dans le HTML (contenu ou attribut). */
export function echapper(texte: string): string {
  return texte.replace(/[&<>"']/g, (caractere) => entites[caractere] ?? caractere);
}

/** Adresse du lien d'une valeur, ou `undefined` si la valeur ne peut pas devenir un lien. */
function adresseLien(valeur: string, lien: Champ['lien']): string | undefined {
  switch (lien) {
    case 'email':
      return `mailto:${valeur}`;
    case 'telephone': {
      // Le numéro est saisi librement : seulement un lien s'il ressemble à un numéro.
      const numero = valeur.replace(/[^\d+]/g, '');
      return /^\+?\d{6,15}$/.test(numero) ? `tel:${numero}` : undefined;
    }
    case 'site':
      return /^https?:\/\//i.test(valeur) ? valeur : undefined;
    default:
      return undefined;
  }
}

const styleLien = `color:${couleurs.bleu};text-decoration:underline;`;

function lienHtml(href: string, texte: string, style = styleLien): string {
  return `<a href="${echapper(href)}" style="${style}">${echapper(texte)}</a>`;
}

function valeurHtml({ valeur, lien }: Champ): string {
  if (!valeur) return '—';
  const href = adresseLien(valeur, lien);
  return href ? lienHtml(href, valeur) : echapper(valeur);
}

/** Texte d'aperçu, affiché par les messageries à côté du sujet. */
function apercu({ message, champs }: Demande): string {
  const texte =
    message ?? champs.map(({ libelle, valeur }) => `${libelle} : ${valeur || '—'}`).join(' · ');
  return texte.replace(/\s+/g, ' ').trim().slice(0, 140);
}

const surtitre = `margin:0;font-family:${police};font-size:11px;line-height:16px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${couleurs.discret};`;

function logoHtml(): string {
  const [premierMot, ...suite] = site.nom.split(' ');
  const lienNom = `text-decoration:none;color:${couleurs.encre};`;
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right:12px;vertical-align:middle;"><a href="${urlSite}"><img src="${urlLogo}" width="36" height="36" alt="" style="display:block;border:0;"></a></td>
<td style="vertical-align:middle;font-family:${police};font-size:17px;line-height:19px;"><a href="${urlSite}" style="${lienNom}"><span style="font-weight:600;color:${couleurs.encre};">${echapper(premierMot ?? '')}</span>${
    suite.length > 0
      ? `<br><span style="font-weight:400;color:${couleurs.texte};">${echapper(suite.join(' '))}</span>`
      : ''
  }</a></td>
</tr>
</table>`;
}

function champsHtml(champs: Champ[]): string {
  const lignes = champs.map((champ, index) => {
    const bordure = `border-top:1px solid ${couleurs.ligne};${index === champs.length - 1 ? `border-bottom:1px solid ${couleurs.ligne};` : ''}`;
    return `<tr>
<td width="120" style="width:120px;padding:12px 16px 12px 0;${bordure}vertical-align:top;font-family:${police};font-size:13px;line-height:22px;color:${couleurs.discret};">${echapper(champ.libelle)}</td>
<td style="padding:12px 0;${bordure}vertical-align:top;font-family:${police};font-size:15px;line-height:22px;color:${couleurs.encre};word-break:break-word;">${valeurHtml(champ)}</td>
</tr>`;
  });
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin-top:24px;">
${lignes.join('\n')}
</table>`;
}

function messageHtml(message: string): string {
  const texte = echapper(message).replace(/\r?\n/g, '<br>');
  return `<p style="${surtitre}margin-top:28px;">Message</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:8px;">
<tr><td bgcolor="${couleurs.surface}" style="background-color:${couleurs.surface};border-radius:12px;padding:16px 20px;font-family:${police};font-size:15px;line-height:24px;color:${couleurs.encre};word-break:break-word;">${texte}</td></tr>
</table>`;
}

// Bouton en pilule, comme ButtonLink (variante primaire). Le fond est sur la cellule : Outlook
// n'affiche pas le fond d'un lien.
function boutonHtml(href: string, texte: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
<tr><td bgcolor="${couleurs.bleu}" style="background-color:${couleurs.bleu};border-radius:999px;">${lienHtml(
    href,
    texte,
    `display:inline-block;padding:14px 28px;font-family:${police};font-size:15px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:999px;`,
  )}</td></tr>
</table>`;
}

function piedHtml(demande: Demande): string {
  const lienPied = `color:${couleurs.doux};text-decoration:underline;`;
  return `<tr><td style="padding:24px 8px 0;font-family:${police};font-size:13px;line-height:22px;color:${couleurs.doux};">
<strong style="font-weight:600;color:${couleurs.encre};">${echapper(site.nom)}</strong><br>
${echapper(adresseComplete)}<br>
${lienHtml(`mailto:${site.email}`, site.email, lienPied)} · ${lienHtml(lienTelephone, site.telephone, `${lienPied}white-space:nowrap;`)}<br>
${lienHtml(urlSite, site.domaine, lienPied)}
</td></tr>
<tr><td style="padding:16px 8px 0;font-family:${police};font-size:12px;line-height:18px;color:${couleurs.discret};">
E-mail envoyé automatiquement par le formulaire de la page ${echapper(demande.page.label)} du site ${echapper(site.domaine)}.
</td></tr>`;
}

function html(demande: Demande): string {
  const { nom, email } = demande.repondreA;
  const page = lienHtml(`${urlSite}${demande.page.chemin}`, demande.page.label);
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<meta name="format-detection" content="telephone=no, address=no, email=no, date=no">
<title>${echapper(demande.sujet)}</title>
<style>
@media (max-width: 600px) {
  .carte { padding: 24px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background-color:${couleurs.surface};">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${echapper(apercu(demande))}${'&zwnj;&nbsp;'.repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${couleurs.surface}" style="width:100%;background-color:${couleurs.surface};">
<tr><td align="center" style="padding:32px 16px;">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
<tr><td style="padding:0 8px 24px;">
${logoHtml()}
</td></tr>
<tr><td class="carte" bgcolor="#ffffff" style="background-color:#ffffff;border:1px solid ${couleurs.ligne};border-radius:16px;padding:32px;">
<p style="${surtitre}">${echapper(demande.page.label)}</p>
<h1 style="margin:8px 0 0;font-family:${police};font-size:26px;line-height:32px;font-weight:300;letter-spacing:-0.02em;color:${couleurs.encre};">${echapper(demande.titre)}</h1>
<p style="margin:12px 0 0;font-family:${police};font-size:15px;line-height:24px;color:${couleurs.doux};">${echapper(nom)} a rempli le formulaire de la page ${page}.</p>
${champsHtml(demande.champs)}
${demande.message ? messageHtml(demande.message) : ''}
${boutonHtml(`mailto:${email}`, `Répondre à ${nom}`)}
<p style="margin:12px 0 0;font-family:${police};font-size:13px;line-height:20px;color:${couleurs.doux};">Vous pouvez aussi répondre directement à cet e-mail&nbsp;: la réponse part vers ${echapper(email)}.</p>
</td></tr>
${piedHtml(demande)}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;
}

function texte(demande: Demande): string {
  return [
    demande.titre,
    '',
    ...demande.champs.map(({ libelle, valeur }) => `${libelle} : ${valeur || '—'}`),
    ...(demande.message ? ['', 'Message :', demande.message] : []),
    '',
    // Séparateur de signature : deux tirets et une espace.
    '-- ',
    site.nom,
    adresseComplete,
    `${site.email} · ${site.telephone}`,
    urlSite,
    '',
    `E-mail envoyé automatiquement par le formulaire de la page ${demande.page.label} du site ${site.domaine}.`,
  ].join('\n');
}

/** E-mail d'une demande, en HTML et en texte brut. */
export function emailDemande(demande: Demande): Email {
  return {
    sujet: demande.sujet,
    texte: texte(demande),
    html: html(demande),
    repondreA: demande.repondreA,
  };
}

export function emailContact(demande: DemandeContact): Email {
  return emailDemande({
    sujet: `Nouvelle demande de contact : ${demande.nom}`,
    titre: 'Nouvelle demande de contact',
    page: { label: 'Contact', chemin: '/contact' },
    champs: [
      { libelle: 'Nom', valeur: demande.nom },
      { libelle: 'E-mail', valeur: demande.email, lien: 'email' },
      { libelle: 'Téléphone', valeur: demande.telephone, lien: 'telephone' },
      { libelle: 'Projet', valeur: demande.projet && typesProjet[demande.projet] },
    ],
    message: demande.message,
    repondreA: { email: demande.email, nom: demande.nom },
  });
}

export function emailAudit(demande: DemandeAudit): Email {
  return emailDemande({
    sujet: `Nouvelle demande d'audit : ${demande.adresseSite}`,
    titre: "Nouvelle demande d'audit",
    page: { label: 'Audit gratuit', chemin: '/audit-gratuit' },
    champs: [
      { libelle: 'Site', valeur: demande.adresseSite, lien: 'site' },
      { libelle: 'Nom', valeur: demande.nom },
      { libelle: 'E-mail', valeur: demande.email, lien: 'email' },
      { libelle: 'Téléphone', valeur: demande.telephone, lien: 'telephone' },
      { libelle: 'Préoccupation', valeur: preoccupations[demande.preoccupation] },
    ],
    repondreA: { email: demande.email, nom: demande.nom },
  });
}
