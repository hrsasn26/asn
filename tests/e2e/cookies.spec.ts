import { expect, type Page, test } from '@playwright/test';

const pied = (page: Page) => page.getByRole('contentinfo');

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

const gtmCharge = (page: Page) => page.evaluate(() => 'gtmCharge' in window);

test('pas de bandeau des cookies', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Accepter', exact: true })).toHaveCount(0);
});

test('sans JavaScript, pas de bouton pour les cookies', async ({ browser }) => {
  const contexte = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexte.newPage();
  await page.goto('/');
  await expect(page.getByRole('button', { name: /les cookies/ })).toBeHidden();
  await contexte.close();
});

test('hors du domaine de production, Tag Manager ne se charge jamais', async ({ page }) => {
  const requetes: string[] = [];
  page.on('request', (requete) => {
    if (requete.url().includes('googletagmanager.com')) requetes.push(requete.url());
  });
  await page.goto('/');
  await expect(pied(page).getByRole('button', { name: 'Refuser les cookies' })).toBeVisible();
  expect(requetes).toEqual([]);
});

test('sur le domaine de production, Tag Manager se charge par défaut, sauf après un refus', async ({
  page,
  baseURL,
}) => {
  const requetes = await simulerProduction(page, baseURL ?? '');
  const erreursCsp: string[] = [];
  page.on('console', (message) => {
    if (/content security policy/i.test(message.text())) erreursCsp.push(message.text());
  });

  await page.goto('http://www.digital-solutions.ma/');
  await expect.poll(() => gtmCharge(page)).toBe(true);
  expect(requetes).toEqual(['https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN']);

  // Refus : la page se recharge sans Tag Manager, et le choix reste enregistré.
  await Promise.all([
    page.waitForEvent('load'),
    pied(page).getByRole('button', { name: 'Refuser les cookies' }).click(),
  ]);
  await expect(pied(page).getByRole('button', { name: 'Accepter les cookies' })).toBeVisible();
  expect(await gtmCharge(page)).toBe(false);
  await page.goto('http://www.digital-solutions.ma/agence');
  await expect(pied(page).getByRole('button', { name: 'Accepter les cookies' })).toBeVisible();
  expect(await gtmCharge(page)).toBe(false);
  expect(requetes).toHaveLength(1);

  // Nouvel accord : Tag Manager se charge de nouveau.
  await Promise.all([
    page.waitForEvent('load'),
    pied(page).getByRole('button', { name: 'Accepter les cookies' }).click(),
  ]);
  await expect.poll(() => gtmCharge(page)).toBe(true);
  expect(requetes).toHaveLength(2);
  expect(erreursCsp).toEqual([]);
});
