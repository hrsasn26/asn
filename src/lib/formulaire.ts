import { isInputError, type SafeResult } from 'astro:actions';

/**
 * Prépare l'affichage d'un formulaire après un envoi sans JavaScript :
 * erreurs par champ, résumé des erreurs, message général et valeurs saisies.
 */
export async function etatFormulaire(
  resultat: SafeResult<Record<string, unknown>, { envoye: boolean }> | undefined,
  requete: Request,
  ordreChamps: string[],
) {
  const erreursChamps: Record<string, string[] | undefined> =
    resultat?.error && isInputError(resultat.error) ? resultat.error.fields : {};

  const resume = ordreChamps.flatMap((name) => {
    const message = erreursChamps[name]?.[0];
    return message ? [{ name, message }] : [];
  });

  const messageGeneral =
    resultat?.error && !isInputError(resultat.error) ? resultat.error.message : undefined;

  const saisie = requete.method === 'POST' ? await requete.formData() : undefined;
  const valeur = (name: string) => {
    const brut = saisie?.get(name);
    return typeof brut === 'string' ? brut : undefined;
  };

  return {
    envoye: resultat?.data?.envoye === true,
    enErreur: resume.length > 0 || messageGeneral !== undefined,
    erreursChamps,
    resume,
    messageGeneral,
    valeur,
  };
}
