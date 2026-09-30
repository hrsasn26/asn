import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from './pages';

// axe lit le DOM et les styles calculés : le résultat ne dépend pas du moteur du navigateur.
// Ces tests tournent sur Chromium seulement, en tailles ordinateur et mobile (playwright.config.ts).
for (const chemin of pages) {
  test(`${chemin} respecte les règles d’accessibilité WCAG 2.1 AA vérifiables automatiquement`, async ({
    page,
  }) => {
    await page.goto(chemin);
    const resultat = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(resultat.violations).toEqual([]);
  });
}
