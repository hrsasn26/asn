/** Chemin public d'une page, sans `index` ni extension `.html`. */
export function cheminPublic(pathname: string): string {
  const chemin = pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  return chemin === '' ? '/' : chemin;
}
