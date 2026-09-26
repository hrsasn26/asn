import { expect, test } from '@playwright/test';

// Pages dont les illustrations ont les animations les plus longues, pages avec formulaire,
// et page avec la frise des étapes.
const chemins = [
  '/',
  '/contact',
  '/audit-gratuit',
  '/services/intelligence-artificielle',
  '/methode',
];

for (const chemin of chemins) {
  test.describe(chemin, () => {
    // WCAG 2.2.2 : une animation qui démarre seule doit s'arrêter avant 5 secondes.
    test('les animations automatiques s’arrêtent avant 5 secondes', async ({ page, isMobile }) => {
      await page.goto(chemin);
      const fins = await page.evaluate(() =>
        document
          .getAnimations()
          // Les animations liées au défilement suivent le visiteur : elles ne démarrent pas seules.
          .filter((animation) => animation.timeline instanceof DocumentTimeline)
          .map((animation) => Number(animation.effect?.getComputedTiming().endTime)),
      );
      // Sur ordinateur, l'illustration est visible : ses animations doivent exister.
      if (!isMobile) expect(fins.length).toBeGreaterThan(0);
      for (const fin of fins) {
        expect(fin).toBeLessThanOrEqual(5000);
      }
    });

    test('aucune animation quand le visiteur a réduit les animations', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(chemin);
      const nombre = await page.evaluate(() => document.getAnimations().length);
      expect(nombre).toBe(0);
    });
  });
}
