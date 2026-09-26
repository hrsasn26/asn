import { expect, test } from '@playwright/test';

test.describe('formulaire de contact', () => {
  test('affiche les erreurs quand les champs obligatoires sont vides', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click();

    await expect(page).toHaveTitle(/^Erreur : /);
    const resume = page.getByRole('alert');
    await expect(resume).toContainText('Le formulaire contient 4 erreurs');
    await expect(page.getByLabel(/^Nom/)).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Indiquez votre nom.').first()).toBeVisible();
  });

  test('conserve les valeurs saisies après une erreur', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel(/^Nom/).fill('Camille Martin');
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click();

    await expect(page.getByLabel(/^Nom/)).toHaveValue('Camille Martin');
  });

  test('envoie une demande valide', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel(/^Nom/).fill('Camille Martin');
    await page.getByLabel(/^E-mail/).fill('camille@exemple.ma');
    await page.getByLabel(/^Votre projet/).selectOption('site-web');
    await page.getByLabel(/^Votre message/).fill('Je souhaite créer un site vitrine.');
    await page.getByLabel(/J'accepte/).check();
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click();

    await expect(page.getByRole('status')).toContainText('Votre demande est envoyée');
  });

  test('propose WhatsApp avec un message déjà rempli', async ({ page }) => {
    await page.goto('/contact');
    // Le pied de page a le même lien : on vérifie celui du contenu de la page.
    const lien = page.getByRole('main').getByRole('link', { name: 'Nous écrire sur WhatsApp' });
    await expect(lien).toHaveAttribute('href', /^https:\/\/wa\.me\/212610732377\?text=Bonjour/);
  });
});

test.describe("formulaire d'audit gratuit", () => {
  test('envoie une demande avec une adresse sans https://', async ({ page }) => {
    await page.goto('/audit-gratuit');
    await page.getByLabel(/^Adresse de votre site/).fill('monsite.ma');
    await page.getByLabel(/^Nom/).fill('Camille Martin');
    await page.getByLabel(/^E-mail/).fill('camille@exemple.ma');
    await page.getByLabel('Sécurité').check();
    await page.getByLabel(/J'accepte/).check();
    await page.getByRole('button', { name: 'Recevoir mon audit gratuit' }).click();

    await expect(page.getByRole('status')).toContainText("Votre demande d'audit est envoyée");
  });

  test('refuse la demande sans consentement', async ({ page }) => {
    await page.goto('/audit-gratuit');
    await page.getByLabel(/^Adresse de votre site/).fill('monsite.ma');
    await page.getByLabel(/^Nom/).fill('Camille Martin');
    await page.getByLabel(/^E-mail/).fill('camille@exemple.ma');
    await page.getByRole('button', { name: 'Recevoir mon audit gratuit' }).click();

    await expect(page.getByRole('alert')).toContainText('Acceptez la politique de confidentialité');
  });
});
