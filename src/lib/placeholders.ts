/**
 * Une valeur de `src/data/` est confirmée quand elle ne contient plus de placeholder entre
 * crochets (« [numéro de téléphone] »). Le site n'affiche pas une valeur non confirmée : la
 * ligne qui la cite reste cachée, puis elle apparaît quand la vraie valeur remplace le
 * placeholder.
 */
export function estConfirme(valeur: string): boolean {
  return !/\[[^\]\n]+\]/.test(valeur);
}
