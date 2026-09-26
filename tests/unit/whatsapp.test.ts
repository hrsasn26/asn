import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { lienWhatsApp } from '../../src/lib/whatsapp';

describe('lienWhatsApp', () => {
  it('construit le lien de l’agence avec le message déjà rempli', () => {
    const lien = new URL(lienWhatsApp(site.whatsapp, site.messageWhatsApp) ?? '');
    expect(lien.origin).toBe('https://wa.me');
    expect(lien.pathname).toBe('/212610732377');
    expect(lien.searchParams.get('text')).toBe(site.messageWhatsApp);
  });

  it('encode les espaces et les accents du message', () => {
    expect(lienWhatsApp('+212 6 10 73 23 77', 'Mon projet : créer un site')).toBe(
      'https://wa.me/212610732377?text=Mon%20projet%20%3A%20cr%C3%A9er%20un%20site',
    );
  });

  it('accepte les points et les tirets, sans message', () => {
    expect(lienWhatsApp('+212 6.10-73.23.77')).toBe('https://wa.me/212610732377');
  });

  it('ne donne pas de lien tant que le numéro est un placeholder', () => {
    expect(lienWhatsApp('[numéro WhatsApp]', 'Bonjour')).toBeUndefined();
  });

  it.each(['06 10 73 23 77', '+212 61', '+212 6 10 73 23 77 poste 2'])(
    'refuse le numéro « %s »',
    (numero) => {
      expect(() => lienWhatsApp(numero)).toThrow('Numéro WhatsApp invalide');
    },
  );
});
