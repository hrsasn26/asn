import { expect, test } from '@playwright/test';

test('le menu mobile donne accès à toutes les pages', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Menu réservé aux petits écrans.');

  await page.goto('/');
  await page.getByText('Menu', { exact: true }).click();
  const menu = page.getByRole('navigation', { name: 'Navigation principale (mobile)' });
  await expect(menu.getByRole('link', { name: 'Tarifs' })).toBeVisible();
  await menu.getByRole('link', { name: 'Tarifs' }).click();
  await expect(page).toHaveURL(/\/tarifs$/);
});

test('le lien d’évitement mène au contenu principal', async ({ page, browserName, isMobile }) => {
  test.skip(isMobile || browserName === 'webkit', 'Tabulation clavier testée sur ordinateur.');

  await page.goto('/');
  await page.keyboard.press('Tab');
  const lien = page.getByRole('link', { name: 'Aller au contenu' });
  await expect(lien).toBeFocused();
  await lien.press('Enter');
  await expect(page).toHaveURL(/#contenu$/);
});
