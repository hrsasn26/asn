import { expect, test } from '@playwright/test';
import { site } from '../../src/data/site';

/**
 * Tag Manager est écrit dans le HTML seulement quand le site est construit pour le domaine de
 * production (src/lib/tag-manager.ts). Les tests tournent sur un build local : la balise doit
 * être absente. Pour vérifier le build de production :
 *   SITE_URL=https://www.digital-solutions.ma pnpm build
 *   SITE_URL=https://www.digital-solutions.ma pnpm test:e2e --grep production
 */
const buildProduction = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).hostname === site.domaine
  : false;

test('ni bandeau ni bouton pour les cookies', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('region', { name: 'Cookies' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /cookies|accepter|refuser/i })).toHaveCount(0);
});

test('hors du build de production, Tag Manager est absent du HTML et ne se charge jamais', async ({
  page,
}) => {
  test.skip(buildProduction, 'build de production');
  const requetes: string[] = [];
  page.on('request', (requete) => {
    if (requete.url().includes('googletagmanager.com')) requetes.push(requete.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(0);
  expect(requetes).toEqual([]);
  expect(await page.evaluate(() => 'dataLayer' in window)).toBe(false);
});

test('sur le build de production, Tag Manager est dans <head> et se charge à l’ouverture', async ({
  page,
}) => {
  test.skip(!buildProduction, 'build local');
  const requetes: string[] = [];
  await page.route('https://www.googletagmanager.com/**', async (route) => {
    requetes.push(route.request().url());
    await route.fulfill({ contentType: 'text/javascript', body: 'window.gtmCharge = true;' });
  });
  const erreursCsp: string[] = [];
  page.on('console', (message) => {
    if (/content security policy/i.test(message.text())) erreursCsp.push(message.text());
  });

  await page.goto('/');
  await expect.poll(() => page.evaluate(() => 'gtmCharge' in window)).toBe(true);
  await expect(page.locator('head > script[src*="googletagmanager.com"]')).toHaveCount(1);
  expect(requetes).toEqual(['https://www.googletagmanager.com/gtm.js?id=GTM-WRR53MWN']);
  expect(await page.evaluate(() => (window as { dataLayer?: unknown[] }).dataLayer?.[0])).toEqual(
    expect.objectContaining({ event: 'gtm.js' }),
  );
  expect(erreursCsp).toEqual([]);
});
