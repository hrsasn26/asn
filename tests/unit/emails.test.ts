import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { adresseComplete, site } from '../../src/data/site';
import {
  couleurs,
  echapper,
  emailAudit,
  emailContact,
  emailDemande,
  urlLogo,
} from '../../src/lib/emails';

const contact = {
  nom: 'Camille Martin',
  email: 'camille@exemple.ma',
  telephone: '+212 6 00 00 00 00',
  projet: 'site-web' as const,
  message: 'Bonjour,\nJe souhaite créer un site vitrine.',
  consentement: true,
};

const audit = {
  adresseSite: 'https://monsite.ma/',
  nom: 'Camille Martin',
  email: 'camille@exemple.ma',
  telephone: undefined,
  preoccupation: 'securite' as const,
  consentement: true,
};

describe('emailContact', () => {
  const email = emailContact(contact);

  it('garde le sujet et la réponse vers le visiteur', () => {
    expect(email.sujet).toBe('Nouvelle demande de contact : Camille Martin');
    expect(email.repondreA).toEqual({ email: 'camille@exemple.ma', nom: 'Camille Martin' });
  });

  it('envoie une version texte avec tous les champs et la signature', () => {
    expect(email.texte).toContain('Nom : Camille Martin');
    expect(email.texte).toContain('E-mail : camille@exemple.ma');
    expect(email.texte).toContain('Téléphone : +212 6 00 00 00 00');
    expect(email.texte).toContain('Projet : Site web');
    expect(email.texte).toContain('Message :\nBonjour,\nJe souhaite créer un site vitrine.');
    expect(email.texte).toContain(`-- \n${site.nom}\n${adresseComplete}`);
  });

  it('affiche le logo du site de production, avec ses dimensions', () => {
    expect(urlLogo).toBe(`https://${site.domaine}/logo.png`);
    expect(email.html).toContain(`<img src="${urlLogo}" width="36" height="36" alt=""`);
  });

  it('met des liens sur l’adresse e-mail et le téléphone', () => {
    expect(email.html).toContain('href="mailto:camille@exemple.ma"');
    expect(email.html).toContain('href="tel:+212600000000"');
  });

  it('garde les retours à la ligne du message', () => {
    expect(email.html).toContain('Bonjour,<br>Je souhaite créer un site vitrine.');
  });

  it('a un bouton pour répondre au visiteur', () => {
    expect(email.html).toMatch(
      /<a href="mailto:camille@exemple\.ma"[^>]*>Répondre à Camille Martin<\/a>/,
    );
  });

  it("a le pied de page de l'agence", () => {
    expect(email.html).toContain(echapper(adresseComplete));
    expect(email.html).toContain(`href="mailto:${site.email}"`);
    expect(email.html).toContain(site.telephone);
    expect(email.html).toContain(`href="https://${site.domaine}"`);
  });
});

describe('emailAudit', () => {
  const email = emailAudit(audit);

  it("met un lien sur l'adresse du site", () => {
    expect(email.html).toContain('<a href="https://monsite.ma/"');
    expect(email.texte).toContain('Site : https://monsite.ma/');
    expect(email.texte).toContain('Préoccupation : Sécurité');
  });

  it('affiche un tiret pour un champ vide, sans lien', () => {
    expect(email.texte).toContain('Téléphone : —');
    expect(email.html).toMatch(/>Téléphone<\/td>\s*<td[^>]*>—<\/td>/);
  });

  it("n'a pas de bloc Message", () => {
    expect(email.texte).not.toContain('Message :');
    expect(email.html).not.toContain('>Message</p>');
  });
});

describe('emailDemande', () => {
  it('échappe le HTML saisi par le visiteur', () => {
    const { html } = emailContact({
      ...contact,
      nom: '<script>alert(1)</script>',
      message: '<img src=x onerror="alert(1)">',
    });
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  });

  it("ne met pas de lien sur un téléphone ou un site qui n'en sont pas", () => {
    const { html } = emailDemande({
      sujet: 'Essai',
      titre: 'Essai',
      page: { label: 'Contact', chemin: '/contact' },
      champs: [
        { libelle: 'Téléphone', valeur: 'le soir', lien: 'telephone' },
        { libelle: 'Site', valeur: 'javascript:alert(1)', lien: 'site' },
      ],
      repondreA: { email: 'camille@exemple.ma', nom: 'Camille' },
    });
    expect(html).toMatch(/<td[^>]*>le soir<\/td>/);
    expect(html).toMatch(/<td[^>]*>javascript:alert\(1\)<\/td>/);
    expect(html).not.toContain('href="javascript:');
  });
});

describe('couleurs des e-mails', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');

  it.each(Object.entries(couleurs))('%s reprend le jeton de global.css', (nom, valeur) => {
    expect(css).toContain(`--color-${nom}: ${valeur};`);
  });
});
