import { expect, test, type Page } from '@playwright/test';
import { pages } from './pages';

/** Meta description d'une page du site construit. */
async function metaDescription(page: Page, chemin: string) {
  const reponse = await page.goto(chemin);
  expect(reponse?.status(), chemin).toBe(200);
  return page.locator('meta[name="description"]').getAttribute('content');
}

test('llms.txt liste chaque page avec sa meta description', async ({ page, request }) => {
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

test('llms.txt cite les prix de départ affichés sur les pages de services', async ({
  page,
  request,
}) => {
  const texte = (await (await request.get('/llms.txt')).text()).replace(/\s+/g, ' ');
  const prix = [...texte.matchAll(/à partir de (\d[\d ]* DH TTC)/g)].map(([, montant]) => montant);
  expect(prix.length).toBeGreaterThan(0);

  const affiches = new Set<string>();
  for (const chemin of pages.filter((p) => p.startsWith('/services/'))) {
    await page.goto(chemin);
    for (const montant of await page
      .locator('#tarifs li strong, #forfaits td strong')
      .allTextContents()) {
      affiches.add(montant.replace(/\s+/g, ' ').trim());
    }
  }
  // Chaque prix de la liste est affiché sur une page, et la liste a une ligne par prix affiché.
  for (const montant of prix) expect([...affiches]).toContain(montant);
  expect(new Set(prix)).toEqual(affiches);
});
