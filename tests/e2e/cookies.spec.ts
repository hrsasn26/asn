import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

// Visiteur qui n'a pas encore choisi (playwright.config.ts enregistre un refus par défaut).
test.use({ storageState: { cookies: [], origins: [] } });

const bandeau = (page: Page) => page.getByRole('region', { name: 'Cookies' });

/**
 * Sert le site construit sous le domaine de production, seul domaine où Tag Manager se charge
 * (src/lib/consentement.ts), et remplace le script de Google par un script vide.
 * Renvoie la liste des requêtes vers Tag Manager.
 */
async function simulerProduction(page: Page, baseURL: string) {
  const requetes: string[] = [];
  await page.route('http://www.digital-solutions.ma/**', async (route) => {
    const url = new URL(route.request().url());
    const local = new URL(url.pathname + url.search, baseURL);
    await route.fulfill({ response: await route.fetch({ url: local.href }) });
  });
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    requetes.push(route.request().url());
    await route.fulfill({ contentType: 'text/javascript', body: 'window.gtmCharge = true;' });
  });
  return requetes;
}

test('le bandeau s’affiche tant que le visiteur n’a pas choisi', async ({ page }) => {
  await page.goto('/');
  await expect(bandeau(page)).toBeVisible();
  await expect(bandeau(page).getByRole('button', { name: 'Accepter' })).toBeVisible();
  await expect(bandeau(page).getByRole('button', { name: 'Refuser' })).toBeVisible();

  const resultat = await new AxeBuilder({ page }).include('[data-bandeau-cookies]').analyze();
  expect(resultat.violations).toEqual([]);

  await bandeau(page).getByRole('button', { name: 'Refuser' }).click();
  await expect(bandeau(page)).toBeHidden();
  await page.goto('/contact');
  await expect(bandeau(page)).toBeHidden();
});

test('le lien du pied de page affiche de nouveau le bandeau', async ({ page }) => {
  await page.goto('/');
  await bandeau(page).getByRole('button', { name: 'Accepter' }).click();
  await expect(bandeau(page)).toBeHidden();

  await page.getByRole('contentinfo').getByRole('button', { name: 'Gérer les cookies' }).click();
  await expect(bandeau(page)).toBeVisible();
  await expect(bandeau(page).getByRole('button', { name: 'Refuser' })).toBeFocused();
});

test('sans JavaScript, ni bandeau ni lien « Gérer les cookies »', async ({ browser }) => {
  const contexte = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexte.newPage();
  await page.goto('/');
  await expect(bandeau(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Gérer les cookies' })).toBeHidden();
  await contexte.close();
});

test('hors du domaine de production, Tag Manager ne se charge jamais', async ({ page }) => {
  const requetes: string[] = [];
  page.on('request', (requete) => {
    if (requete.url().includes('googletagmanager.com')) requetes.push(requete.url());
  });
  await page.goto('/');
  await bandeau(page).getByRole('button', { name: 'Accepter' }).click();
  await page.reload();
  await expect(bandeau(page)).toBeHidden();
  expect(requetes).toEqual([]);
});

test('sur le domaine de production, Tag Manager se charge après « Accepter » seulement', async ({
  page,
  baseURL,
}) => {
  const requetes = await simulerProduction(page, baseURL ?? '');
  const erreursCsp: string[] = [];
  page.on('console', (message) => {
    if (/content security policy/i.test(message.text())) erreursCsp.push(message.text());
  });

  await page.goto('http://www.digital-solutions.ma/');
  await expect(bandeau(page)).toBeVisible();
  expect(requetes).toEqual([]);

  await bandeau(page).getByRole('button', { name: 'Accepter' }).click();
  await expect.poll(() => page.evaluate(() => 'gtmCharge' in window)).toBe(true);
  expect(requetes).toEqual(['https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN']);

  // Le choix reste enregistré : Tag Manager se charge dès l'ouverture des pages suivantes.
  await page.goto('http://www.digital-solutions.ma/agence');
  await expect.poll(() => page.evaluate(() => 'gtmCharge' in window)).toBe(true);
  await expect(bandeau(page)).toBeHidden();

  // Retrait de l'accord : la page se recharge sans Tag Manager.
  await page.getByRole('contentinfo').getByRole('button', { name: 'Gérer les cookies' }).click();
  await Promise.all([
    page.waitForEvent('load'),
    bandeau(page).getByRole('button', { name: 'Refuser' }).click(),
  ]);
  expect(await page.evaluate(() => 'gtmCharge' in window)).toBe(false);
  expect(requetes).toHaveLength(2);
  expect(erreursCsp).toEqual([]);
});
