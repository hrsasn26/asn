/**
 * Limite le nombre d'envois de formulaire par adresse IP.
 * Le stockage est en mémoire : il suffit pour un seul serveur.
 */
export function creerLimiteur({
  maxEnvois,
  fenetreMs,
  maintenant = () => Date.now(),
}: {
  maxEnvois: number;
  fenetreMs: number;
  maintenant?: () => number;
}) {
  const envois = new Map<string, number[]>();

  return {
    /** Retourne `true` si l'envoi est autorisé, et l'enregistre. */
    autoriser(cle: string): boolean {
      const t = maintenant();
      const recents = (envois.get(cle) ?? []).filter((date) => t - date < fenetreMs);

      // Nettoyage des clés expirées pour que la mémoire ne grossisse pas.
      if (envois.size > 10_000) {
        for (const [autreCle, dates] of envois) {
          if (dates.every((date) => t - date >= fenetreMs)) envois.delete(autreCle);
        }
      }

      if (recents.length >= maxEnvois) {
        envois.set(cle, recents);
        return false;
      }
      recents.push(t);
      envois.set(cle, recents);
      return true;
    },
  };
}
