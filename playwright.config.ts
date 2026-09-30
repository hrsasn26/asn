import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
const CI = Boolean(process.env.CI);

// Permet d'utiliser un Chromium déjà installé (ex. : PW_CHROMIUM_PATH=/opt/pw-browsers/chromium).
const chromium = process.env.PW_CHROMIUM_PATH
  ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
  : {};

/**
 * Les tests tournent sur le site construit (`pnpm build`), sur Chromium (ordinateur et mobile) et
 * WebKit, le moteur de Safari (ordinateur) : c'est la promesse « testé avant la mise en ligne »
 * du brief. Décision du 30 septembre 2026 : plus de projet Firefox (peu de visiteurs, liste
 * déroulante du système) ni iPad (Safari à une autre largeur : rien de plus que les deux autres).
 *
 * Chaque test ne tourne que là où son résultat peut changer :
 * - contenu : le HTML est le même dans tous les navigateurs (données structurées, llms.txt,
 *   liens internes, Tag Manager). Un seul navigateur suffit : Chromium, taille ordinateur ;
 * - accessibilité (axe) : elle dépend de la mise en page, pas du moteur. Chromium, tailles
 *   ordinateur et mobile ;
 * - le reste (affichage, formulaires, animations, navigation) : les trois projets.
 * En local, `pnpm test:e2e:rapide` ne lance que les deux projets Chromium.
 */
const contenu = [
  '**/donnees-structurees.spec.ts',
  '**/cookies.spec.ts',
  '**/llms.spec.ts',
  '**/liens.spec.ts',
];
const accessibilite = ['**/accessibilite.spec.ts'];
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: 0,
  reporter: CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    locale: 'fr-FR',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'ordinateur-chromium', use: { ...devices['Desktop Chrome'], ...chromium } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'], ...chromium }, testIgnore: contenu },
    {
      name: 'ordinateur-webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: [...contenu, ...accessibilite],
    },
  ],
  webServer: {
    command: 'node dist/server/entry.mjs',
    url: `http://127.0.0.1:${PORT}/robots.txt`,
    reuseExistingServer: !CI,
    env: {
      HOST: '127.0.0.1',
      PORT: String(PORT),
      MAIL_TRANSPORT: 'log',
      FORM_RATE_LIMIT_MAX: '1000',
    },
  },
});
