import { describe, expect, it } from 'vitest';
import { offre, site } from '../../src/data/site';
import { estConfirme } from '../../src/lib/placeholders';

describe('estConfirme', () => {
  it('accepte une valeur sans crochets', () => {
    expect(estConfirme('contact@digital-solutions.ma')).toBe(true);
    expect(estConfirme('05 22 00 00 00')).toBe(true);
  });

  it('refuse une valeur qui contient un placeholder', () => {
    expect(estConfirme('[numéro de téléphone]')).toBe(false);
    expect(estConfirme('pendant [X mois] après la livraison')).toBe(false);
  });

  it('cache les valeurs du site encore entre crochets', () => {
    expect(estConfirme(site.email)).toBe(true);
    expect(estConfirme(site.telephone)).toBe(false);
    expect(estConfirme(offre.garantie)).toBe(false);
  });
});
