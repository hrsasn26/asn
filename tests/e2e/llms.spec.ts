import { expect, test, type Page } from '@playwright/test';
import { pages } from './pages';

/** Meta description d'une page du site construit. */
async function metaDescription(page: Page, chemin: string) {
  const reponse = await page.goto(chemin);
  expect(reponse?.status(), chemin).toBe(200);
  return page.locator('meta[name="description"]').getAttribute('content');
}

test('llms.txt liste chaque page avec sa meta description', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'ordinateur-chromium', 'Un seul navigateur suffit.');

  const reponse = await request.get('/llms.txt');
  expect(reponse.status()).toBe(200);
  expect(reponse.headers()['content-type']).toContain('text/plain');
  const texte = await reponse.text();

  // Format llms.txt : un titre, puis un résumé en citation (la description de l'accueil).
  const [titre, , resume] = texte.split('\n');
  expect(titre).toMatch(/^# \S/);
  expect(resume).toBe(`> ${await metaDescription(page, '/')}`);

  const liens = [...texte.matchAll(/^- \[[^\]]+\]\(([^)]+)\): (.+)$/gm)].map(([, url, note]) => ({
    chemin: new URL(url ?? '').pathname,
    note,
  }));
  expect(liens.map(({ chemin }) => chemin).sort()).toEqual(
    pages.filter((chemin) => chemin !== '/').sort(),
  );
  for (const { chemin, note } of liens) {
    expect(note, chemin).toBe(await metaDescription(page, chemin));
  }
});
