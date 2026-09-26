import { expect, type Page, test } from '@playwright/test';

/**
 * Sert le site construit sous le domaine de production, seul domaine où Tag Manager se charge
 * (src/lib/tag-manager.ts), et remplace le script de Google par un script vide.
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

test('ni bandeau ni bouton pour les cookies', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /cookies|accepter|refuser/i })).toHaveCount(0);
});

test('hors du domaine de production, Tag Manager ne se charge jamais', async ({ page }) => {
  const requetes: string[] = [];
  page.on('request', (requete) => {
    if (requete.url().includes('googletagmanager.com')) requetes.push(requete.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(requetes).toEqual([]);
});

test('sur le domaine de production, Tag Manager se charge à l’ouverture', async ({
  page,
  baseURL,
}) => {
  const requetes = await simulerProduction(page, baseURL ?? '');
  const erreursCsp: string[] = [];
  page.on('console', (message) => {
    if (/content security policy/i.test(message.text())) erreursCsp.push(message.text());
  });

  await page.goto('http://www.digital-solutions.ma/');
  await expect.poll(() => page.evaluate(() => 'gtmCharge' in window)).toBe(true);
  expect(requetes).toEqual(['https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN']);
  expect(await page.evaluate(() => (window as { dataLayer?: unknown[] }).dataLayer?.[0])).toEqual(
    expect.objectContaining({ event: 'gtm.js' }),
  );
  expect(erreursCsp).toEqual([]);
});
