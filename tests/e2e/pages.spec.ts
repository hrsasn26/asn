import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from './pages';

for (const chemin of pages) {
  test.describe(chemin, () => {
    test('s’affiche correctement', async ({ page }) => {
      const reponse = await page.goto(chemin);
      expect(reponse?.status()).toBe(200);
      await expect(page).toHaveTitle(/\S/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

      // Pas de défilement horizontal, quelle que soit la taille d'écran.
      const largeurs = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth,
        ecran: window.innerWidth,
      }));
      expect(largeurs.page).toBeLessThanOrEqual(largeurs.ecran);
    });

    test('respecte les règles d’accessibilité WCAG 2.1 AA vérifiables automatiquement', async ({
      page,
    }) => {
      await page.goto(chemin);
      const resultat = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(resultat.violations).toEqual([]);
    });
  });
}
