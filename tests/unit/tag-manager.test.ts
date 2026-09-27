import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { tagManagerAutorise, urlTagManager } from '../../src/lib/tag-manager';

describe('Google Tag Manager', () => {
  it('se charge seulement sur le site construit pour le domaine de production', () => {
    expect(tagManagerAutorise('www.digital-solutions.ma', site.domaine)).toBe(true);
    expect(tagManagerAutorise('digital-solutions.ma', site.domaine)).toBe(false);
    expect(tagManagerAutorise('asn-hrs20.vercel.app', site.domaine)).toBe(false);
    expect(tagManagerAutorise('localhost', site.domaine)).toBe(false);
  });

  it('sur Vercel, se charge en production et pas sur les aperçus', () => {
    expect(tagManagerAutorise('www.digital-solutions.ma', site.domaine, 'production')).toBe(true);
    expect(tagManagerAutorise('www.digital-solutions.ma', site.domaine, 'preview')).toBe(false);
    expect(tagManagerAutorise('www.digital-solutions.ma', site.domaine, 'development')).toBe(false);
    expect(tagManagerAutorise('localhost', site.domaine, 'production')).toBe(false);
  });

  it('construit l’adresse du conteneur de l’agence', () => {
    expect(urlTagManager(site.tagManager)).toBe(
      'https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN',
    );
    expect(() => urlTagManager('GTM-abc&x=1')).toThrow('Identifiant Google Tag Manager invalide');
  });
});
