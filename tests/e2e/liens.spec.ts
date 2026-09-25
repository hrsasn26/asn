import { expect, test } from '@playwright/test';

test('tous les liens internes fonctionnent', async ({ page, request, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'ordinateur-chromium', 'Un seul navigateur suffit.');

  const aVisiter = ['/'];
  const visites = new Set<string>();
  const erreurs: string[] = [];

  while (aVisiter.length > 0) {
    const chemin = aVisiter.shift() as string;
    if (visites.has(chemin)) continue;
    visites.add(chemin);

    const reponse = await request.get(chemin);
    if (reponse.status() >= 400) {
      erreurs.push(`${chemin} : ${reponse.status()}`);
      continue;
    }
    if (!reponse.headers()['content-type']?.includes('text/html')) continue;

    await page.goto(chemin);
    const liens = await page
      .locator('a[href]')
      .evaluateAll((elements) => elements.map((element) => (element as HTMLAnchorElement).href));
    for (const lien of liens) {
      const url = new URL(lien);
      if (url.origin !== new URL(baseURL as string).origin) continue;

      // Un lien vers une ancre doit viser un élément existant.
      if (url.hash && url.pathname === new URL(page.url()).pathname) {
        const id = decodeURIComponent(url.hash.slice(1));
        if ((await page.locator(`[id="${id}"]`).count()) === 0) {
          erreurs.push(`${chemin} : ancre ${url.hash} introuvable`);
        }
      }
      aVisiter.push(url.pathname);
    }
  }

  expect(erreurs).toEqual([]);
  expect(visites.size).toBeGreaterThan(10);
});
