import { expect, test } from '@playwright/test';

test('le menu mobile donne accès à toutes les pages', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Menu réservé aux petits écrans.');

  await page.goto('/');
  await page.getByText('Menu', { exact: true }).click();
  const menu = page.getByRole('navigation', { name: 'Navigation principale (mobile)' });
  await expect(menu.getByRole('link', { name: 'Processus' })).toBeVisible();
  await menu.getByRole('link', { name: 'Processus' }).click();
  await expect(page).toHaveURL(/\/processus$/);
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

test('le pied de page donne l’e-mail, le téléphone et WhatsApp', async ({ page }) => {
  await page.goto('/');
  const pied = page.getByRole('contentinfo');
  await expect(pied.getByRole('link', { name: 'contact@digital-solutions.ma' })).toHaveAttribute(
    'href',
    'mailto:contact@digital-solutions.ma',
  );
  await expect(pied.getByRole('link', { name: '+212 6 10 73 23 77' })).toHaveAttribute(
    'href',
    'tel:+212610732377',
  );
  await expect(pied.getByRole('link', { name: 'Nous écrire sur WhatsApp' })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/212610732377\?text=Bonjour/,
  );
});
