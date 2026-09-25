import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
const CI = Boolean(process.env.CI);

// Permet d'utiliser un Chromium déjà installé (ex. : PW_CHROMIUM_PATH=/opt/pw-browsers/chromium).
const chromium = process.env.PW_CHROMIUM_PATH
  ? { launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH } }
  : {};

/**
 * Les tests tournent sur le site construit (`pnpm build`), dans les principaux navigateurs
 * et tailles d'écran : c'est la promesse « testé avant la mise en ligne » du brief.
 */
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
    { name: 'ordinateur-firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'ordinateur-webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'], ...chromium } },
    { name: 'tablette-webkit', use: { ...devices['iPad (gen 7)'] } },
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
