// @ts-check
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

// Vercel définit la variable VERCEL pendant ses builds.
const surVercel = Boolean(process.env.VERCEL);

// Adresse publique du site. Elle sert aux URL canoniques, au sitemap et au flux RSS.
// En production, la CI la fournit avec la variable SITE_URL. Sur Vercel, sans SITE_URL,
// on utilise le domaine de production du projet (ex. : asn-tau.vercel.app).
// `||` et non `??` : le Dockerfile définit SITE_URL à une chaîne vide si l'argument manque.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4321';
const { hostname, protocol } = new URL(site);

export default defineConfig({
  site,
  trailingSlash: 'never',
  // Pages statiques par défaut. Seules les pages avec formulaire sont rendues par le serveur.
  output: 'static',
  // Serveur Node (Docker + Caddy) par défaut ; fonctions Vercel pendant un build Vercel.
  adapter: surVercel ? vercel() : node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      // Les pages rendues par le serveur ne sont pas détectées automatiquement.
      customPages: ['/contact', '/audit-gratuit'].map((chemin) => new URL(chemin, site).href),
    }),
  ],
  build: {
    format: 'directory',
  },
  markdown: {
    // Shiki utilise des styles en ligne, incompatibles avec la CSP.
    syntaxHighlight: false,
  },
  security: {
    // Astro ajoute les empreintes des scripts et des styles de chaque page.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
    },
    // Caddy transmet l'adresse IP du visiteur dans X-Forwarded-For.
    // Astro ne lit cet en-tête que pour les domaines listés ici.
    allowedDomains: [{ hostname, protocol: protocol.replace(':', '') }],
  },
  env: {
    schema: {
      MAIL_TRANSPORT: envField.enum({
        context: 'server',
        access: 'secret',
        values: ['brevo', 'log'],
        optional: true,
      }),
      BREVO_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Demandes autorisées par adresse IP toutes les 10 minutes (formulaires).
      FORM_RATE_LIMIT_MAX: envField.number({ context: 'server', access: 'secret', default: 5 }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
