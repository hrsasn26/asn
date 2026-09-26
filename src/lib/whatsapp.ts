import { estConfirme } from './placeholders';

/**
 * Lien « wa.me » qui ouvre une conversation WhatsApp avec un message déjà rempli.
 * C'est un simple lien : il fonctionne sans JavaScript et ne demande aucun script externe.
 *
 * @param numero Numéro au format international, espaces permis (ex. : « +212 6 10 73 23 77 »).
 * @param message Texte déjà rempli dans la conversation (facultatif).
 * @returns `undefined` tant que le numéro est un placeholder entre crochets.
 */
export function lienWhatsApp(numero: string, message?: string): string | undefined {
  if (!estConfirme(numero)) return undefined;

  const chiffres = numero.replace(/[\s.-]/g, '');
  // wa.me attend l'indicatif du pays, sans « + » ni zéro initial (8 à 15 chiffres, E.164).
  if (!/^\+[1-9]\d{7,14}$/.test(chiffres)) {
    throw new Error(
      `Numéro WhatsApp invalide : « ${numero} ». Format attendu : +212 6 XX XX XX XX.`,
    );
  }

  const lien = `https://wa.me/${chiffres.slice(1)}`;
  return message ? `${lien}?text=${encodeURIComponent(message)}` : lien;
}
