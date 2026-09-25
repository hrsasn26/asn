import { describe, expect, it } from 'vitest';
import { normaliserAdresseSite, schemaAudit, schemaContact } from '../../src/lib/schemas';

const contactValide = {
  nom: 'Camille Martin',
  email: 'camille@exemple.fr',
  message: 'Je souhaite créer un site vitrine.',
  consentement: true,
};

describe('schemaContact', () => {
  it('accepte une demande complète', () => {
    expect(schemaContact.safeParse(contactValide).success).toBe(true);
  });

  it('refuse une demande sans consentement', () => {
    const resultat = schemaContact.safeParse({ ...contactValide, consentement: false });
    expect(resultat.success).toBe(false);
    expect(resultat.error?.issues[0]?.message).toMatch(/politique de confidentialité/);
  });

  it('refuse une adresse e-mail invalide avec un message en français', () => {
    const resultat = schemaContact.safeParse({ ...contactValide, email: 'camille' });
    expect(resultat.error?.issues[0]?.message).toBe(
      'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.',
    );
  });

  it('refuse un nom composé uniquement d’espaces', () => {
    expect(schemaContact.safeParse({ ...contactValide, nom: '   ' }).success).toBe(false);
  });

  it('refuse un type de projet inconnu', () => {
    expect(schemaContact.safeParse({ ...contactValide, projet: 'autre-chose' }).success).toBe(
      false,
    );
  });
});

describe('schemaAudit', () => {
  const auditValide = {
    adresseSite: 'monsite.fr',
    nom: 'Camille Martin',
    email: 'camille@exemple.fr',
    consentement: true,
  };

  it("ajoute https:// à l'adresse du site", () => {
    const resultat = schemaAudit.parse(auditValide);
    expect(resultat.adresseSite).toBe('https://monsite.fr/');
  });

  it('utilise « Je ne sais pas » par défaut', () => {
    expect(schemaAudit.parse(auditValide).preoccupation).toBe('ne-sais-pas');
  });

  it('refuse une adresse qui n’est pas un site', () => {
    expect(schemaAudit.safeParse({ ...auditValide, adresseSite: 'pas une adresse' }).success).toBe(
      false,
    );
  });
});

describe('normaliserAdresseSite', () => {
  it.each([
    ['monsite.fr', 'https://monsite.fr/'],
    ['http://monsite.fr/page', 'http://monsite.fr/page'],
    ['  https://www.monsite.fr  ', 'https://www.monsite.fr/'],
  ])('%s → %s', (saisie, attendu) => {
    expect(normaliserAdresseSite(saisie)).toBe(attendu);
  });

  it.each(['localhost', 'monsite', 'ftp://monsite.fr', ''])('refuse « %s »', (saisie) => {
    expect(normaliserAdresseSite(saisie)).toBeUndefined();
  });
});
