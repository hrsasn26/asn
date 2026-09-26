import { describe, expect, it } from 'vitest';
import { services } from '../../src/data/navigation';
import {
  normaliserAdresseSite,
  schemaAudit,
  schemaContact,
  typesProjet,
} from '../../src/lib/schemas';

const contactValide = {
  nom: 'Camille Martin',
  email: 'camille@exemple.ma',
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
      'Indiquez une adresse e-mail valide, par exemple nom@exemple.ma.',
    );
  });

  it('refuse un nom composé uniquement d’espaces', () => {
    expect(schemaContact.safeParse({ ...contactValide, nom: '   ' }).success).toBe(false);
  });

  it.each(['application-mobile', 'saas', 'ia', 'donnees', 'tests-securite'])(
    'accepte le type de projet « %s »',
    (projet) => {
      expect(schemaContact.safeParse({ ...contactValide, projet }).success).toBe(true);
    },
  );

  it('propose un type de projet par pôle de services, plus « Autre »', () => {
    expect(Object.keys(typesProjet)).toHaveLength(services.length + 1);
  });

  it('refuse un type de projet inconnu', () => {
    expect(schemaContact.safeParse({ ...contactValide, projet: 'autre-chose' }).success).toBe(
      false,
    );
  });
});

describe('schemaAudit', () => {
  const auditValide = {
    adresseSite: 'monsite.ma',
    nom: 'Camille Martin',
    email: 'camille@exemple.ma',
    consentement: true,
  };

  it("ajoute https:// à l'adresse du site", () => {
    const resultat = schemaAudit.parse(auditValide);
    expect(resultat.adresseSite).toBe('https://monsite.ma/');
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
    ['monsite.ma', 'https://monsite.ma/'],
    ['http://monsite.ma/page', 'http://monsite.ma/page'],
    ['  https://www.monsite.ma  ', 'https://www.monsite.ma/'],
  ])('%s → %s', (saisie, attendu) => {
    expect(normaliserAdresseSite(saisie)).toBe(attendu);
  });

  it.each(['localhost', 'monsite', 'ftp://monsite.ma', ''])('refuse « %s »', (saisie) => {
    expect(normaliserAdresseSite(saisie)).toBeUndefined();
  });
});
