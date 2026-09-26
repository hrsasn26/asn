import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import {
  cookiesGoogle,
  lireChoix,
  tagManagerActif,
  tagManagerAutorise,
  urlTagManager,
} from '../../src/lib/consentement';

describe('cookies de Google', () => {
  it('lit seulement un choix connu', () => {
    expect(lireChoix('accepte')).toBe('accepte');
    expect(lireChoix('refuse')).toBe('refuse');
    expect(lireChoix(null)).toBeUndefined();
    expect(lireChoix('oui')).toBeUndefined();
  });

  it('active Tag Manager par défaut, sauf après un refus', () => {
    expect(tagManagerActif(undefined)).toBe(true);
    expect(tagManagerActif('accepte')).toBe(true);
    expect(tagManagerActif('refuse')).toBe(false);
  });

  it('charge Tag Manager seulement sur le domaine de production', () => {
    expect(tagManagerAutorise('www.digital-solutions.ma', site.domaine)).toBe(true);
    expect(tagManagerAutorise('digital-solutions.ma', site.domaine)).toBe(false);
    expect(tagManagerAutorise('asn-hrs20.vercel.app', site.domaine)).toBe(false);
    expect(tagManagerAutorise('localhost', site.domaine)).toBe(false);
  });

  it('construit l’adresse du conteneur de l’agence', () => {
    expect(urlTagManager(site.tagManager)).toBe(
      'https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN',
    );
    expect(() => urlTagManager('GTM-abc&x=1')).toThrow('Identifiant Google Tag Manager invalide');
  });

  it('trouve les cookies de Google', () => {
    expect(cookiesGoogle('_gcl_au=1.1; theme=clair; _ga=GA1; _ga_ABC=GS1; _gid=2')).toEqual([
      '_gcl_au',
      '_ga',
      '_ga_ABC',
      '_gid',
    ]);
    expect(cookiesGoogle('')).toEqual([]);
  });
});
