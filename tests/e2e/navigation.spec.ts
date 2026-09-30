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

test('le pied de page donne l’e-mail, le téléphone, WhatsApp et l’adresse', async ({ page }) => {
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
  await expect(pied.getByText('N° 7, rue Tantane, 30000 Fès, Maroc')).toBeVisible();
});

test('le bouton WhatsApp flottant est sur toutes les pages', async ({ page }) => {
  for (const chemin of ['/', '/contact', '/services/sites-web', '/mentions-legales']) {
    await page.goto(chemin);
    // Hors du contenu et du pied de page : c'est le bouton flottant.
    const bouton = page.locator('body > a[aria-label="Nous écrire sur WhatsApp"]');
    await expect(bouton, chemin).toBeInViewport();
    await expect(bouton, chemin).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\/212610732377\?text=Bonjour/,
    );
  }
});

test('l’accueil propose WhatsApp au-dessus des deux boutons', async ({ page }) => {
  // Sans animation d'entrée : les boutons montent en place pendant 0,8 seconde, et deux mesures
  // successives ne tomberaient pas au même instant (écart de 12 px vu sur WebKit).
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const principal = page.getByRole('main');
  const whatsapp = principal.getByRole('link', { name: 'Nous écrire sur WhatsApp' });
  await expect(whatsapp).toHaveAttribute('href', /^https:\/\/wa\.me\/212610732377\?text=Bonjour/);
  const boiteWhatsApp = await whatsapp.boundingBox();
  const boiteProjet = await principal
    .getByRole('link', { name: 'Parler de mon projet' })
    .first()
    .boundingBox();
  expect(boiteWhatsApp!.y + boiteWhatsApp!.height).toBeLessThanOrEqual(boiteProjet!.y);
});
