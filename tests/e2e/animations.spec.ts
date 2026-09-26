import { expect, test } from '@playwright/test';

// Pages dont les illustrations ont les animations les plus longues, pages avec formulaire,
// page avec la frise des étapes, pages légales (barre de lecture) et page d'erreur.
const chemins = [
  '/',
  '/contact',
  '/audit-gratuit',
  '/services/intelligence-artificielle',
  '/services/hebergement-maintenance',
  '/methode',
  '/mentions-legales',
  '/confidentialite',
  '/page-inexistante',
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

test.describe('barre de lecture', () => {
  test('elle se remplit pendant le défilement', async ({ page }) => {
    await page.goto('/confidentialite');
    const compatible = await page.evaluate(() => CSS.supports('animation-timeline: scroll()'));
    test.skip(!compatible, 'Navigateur sans animation liée au défilement : la barre reste vide.');

    const largeur = async () => (await page.locator('.anim-progression').boundingBox())?.width ?? 0;
    const ecran = page.viewportSize()?.width ?? 0;
    // En haut de la page, la barre est vide.
    expect(await largeur()).toBeLessThan(1);
    // En bas de la page, elle occupe toute la largeur de l'écran.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(largeur).toBeGreaterThan(ecran - 1);
  });
});

test.describe('formulaire en erreur', () => {
  test('le résumé des erreurs s’anime moins de 5 secondes', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    const fins = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((animation) => animation.timeline instanceof DocumentTimeline)
        .map((animation) => Number(animation.effect?.getComputedTiming().endTime)),
    );
    expect(fins.length).toBeGreaterThan(0);
    for (const fin of fins) expect(fin).toBeLessThanOrEqual(5000);
  });

  test('aucune animation quand le visiteur a réduit les animations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  });
});

test.describe('menu mobile', () => {
  test('les liens s’animent à l’ouverture, sauf en mode réduit', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Menu réservé aux petits écrans.');
    await page.goto('/');
    await page.getByText('Menu', { exact: true }).click();
    const menu = page.getByRole('navigation', { name: 'Navigation principale (mobile)' });
    await expect(menu.getByRole('link', { name: 'Contact' })).toBeVisible();
    const nombre = () => menu.evaluate((nav) => nav.getAnimations({ subtree: true }).length);
    expect(await nombre()).toBeGreaterThan(0);

    // Mode « réduire les animations » : le menu s'ouvre sans animation.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.getByText('Menu', { exact: true }).click();
    await expect(menu.getByRole('link', { name: 'Contact' })).toBeVisible();
    expect(await nombre()).toBe(0);
  });
});
