import { describe, expect, it } from 'vitest';
import { services } from '../../src/data/navigation';
import {
  formaterMontant,
  NIVEAUX,
  offre,
  offreDeReference,
  offres,
  offresDuService,
  prixComplet,
  prixHt,
  prixTtc,
  ttc,
} from '../../src/lib/prix';

describe('formaterMontant', () => {
  it('sépare les milliers par une espace insécable', () => {
    expect(formaterMontant(500)).toBe('500 DH');
    expect(formaterMontant(4800)).toBe('4 800 DH');
    expect(formaterMontant(120000)).toBe('120 000 DH');
    expect(formaterMontant(1200000)).toBe('1 200 000 DH');
  });
});

describe('prix d’une offre', () => {
  it('affiche le prix TTC, puis le prix HT', () => {
    expect(ttc(4000)).toBe(4800);
    expect(prixTtc({ ht: 12500 })).toBe('15 000 DH TTC');
    expect(prixHt({ ht: 12500 })).toBe('12 500 DH HT');
    expect(prixComplet('site-vitrine')).toBe('4 800 DH TTC (4 000 DH HT)');
    expect(prixComplet('forfait-essentiel')).toBe('600 DH TTC (500 DH HT) par mois');
  });

  it('n’affiche aucun montant pour une offre sur devis', () => {
    expect(prixTtc({ ht: null })).toBe('');
    expect(prixHt({ ht: null })).toBe('');
    expect(() => prixComplet('recette')).toThrow();
  });

  it('refuse une offre inconnue', () => {
    expect(() => offre('site-vitrin')).toThrow();
  });
});

describe('src/data/prix.json', () => {
  it('donne un identifiant unique à chaque offre', () => {
    const ids = offres.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('rattache chaque offre à une page de service', () => {
    const pages = services.map(({ href }) => href);
    for (const { id, service } of offres) expect(pages, id).toContain(service);
  });

  it('cite une offre de référence par pôle, avec un prix', () => {
    for (const { href } of services) {
      expect(
        offres.filter((o) => o.service === href && o.reference),
        href,
      ).toHaveLength(1);
      expect(offreDeReference(href)?.ht, href).toEqual(expect.any(Number));
    }
  });

  it('décrit chaque offre et lui donne un prix TTC entier', () => {
    for (const { id, nom, description, ht, niveau, unite } of offres) {
      expect(nom, id).not.toBe('');
      expect(description, id).toMatch(/\.$/);
      if (ht !== null) expect(Number.isInteger((ht * 120) / 100), id).toBe(true);
      if (niveau !== null) expect(Object.keys(NIVEAUX), id).toContain(niveau);
      if (unite !== null) expect(['mois', 'jour', 'langue'], id).toContain(unite);
    }
  });

  it('classe les projets d’un pôle du niveau le plus simple au plus avancé', () => {
    for (const { href } of services) {
      const rangs = offresDuService(href, 'projet')
        .filter(({ niveau }) => niveau !== null)
        .map(({ niveau }) => NIVEAUX[niveau as keyof typeof NIVEAUX].rang);
      expect(rangs, href).toEqual([...rangs].sort((a, b) => a - b));
    }
  });
});
