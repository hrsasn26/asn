import { describe, expect, it } from 'vitest';
import { creerLimiteur } from '../../src/lib/rate-limit';

describe('creerLimiteur', () => {
  it('bloque au-delà du maximum, puis autorise après la fenêtre', () => {
    let maintenant = 0;
    const limiteur = creerLimiteur({ maxEnvois: 2, fenetreMs: 1000, maintenant: () => maintenant });

    expect(limiteur.autoriser('1.2.3.4')).toBe(true);
    expect(limiteur.autoriser('1.2.3.4')).toBe(true);
    expect(limiteur.autoriser('1.2.3.4')).toBe(false);
    expect(limiteur.autoriser('5.6.7.8')).toBe(true);

    maintenant = 1000;
    expect(limiteur.autoriser('1.2.3.4')).toBe(true);
  });
});
