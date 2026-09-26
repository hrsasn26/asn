// @ts-check
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField, fontProviders } from 'astro/config';
import { site as infos } from './src/data/site.ts';

// Vercel définit la variable VERCEL pendant ses builds.
const surVercel = Boolean(process.env.VERCEL);

// Adresse de production : domaine de l'agence (src/data/site.ts).
const urlProduction = `https://${infos.domaine}`;

// Adresse publique du site. Elle sert aux URL canoniques et au sitemap.
// En production, la CI la fournit avec la variable SITE_URL. Sur Vercel, sans SITE_URL,
// on utilise le domaine de l'agence : les aperçus pointent vers les pages de production.
// Ailleurs (poste de développement, CI), l'adresse locale garde les tests sur le même domaine.
// `||` et non `??` : le Dockerfile définit SITE_URL à une chaîne vide si l'argument manque.
const site = process.env.SITE_URL || (surVercel ? urlProduction : 'http://localhost:4321');
const { hostname, protocol } = new URL(site);

// Adresses de Google Tag Manager et de Google Ads (conversions et remarketing), pour la CSP.
// Tag Manager se charge pour tous les visiteurs (src/components/TagManager.astro).
// Une autre sorte de balise (Google Analytics, par exemple) demande ses propres adresses.
// Les balises « HTML personnalisé » et les variables « JavaScript personnalisé » de Tag
// Manager ne fonctionnent pas : elles demandent 'unsafe-inline' ou 'unsafe-eval'.
const google = {
  script: [
    'https://www.googletagmanager.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://www.google.com',
    'https://pagead2.googlesyndication.com',
  ],
  img: [
    'https://www.googletagmanager.com',
    'https://googleads.g.doubleclick.net',
    'https://www.google.com',
    'https://www.google.co.ma',
    'https://pagead2.googlesyndication.com',
  ],
  connect: [
    'https://www.googletagmanager.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://www.google.com',
    'https://www.google.co.ma',
    'https://google.com',
    'https://pagead2.googlesyndication.com',
  ],
  frame: [
    'https://www.googletagmanager.com',
    'https://td.doubleclick.net',
    'https://bid.g.doubleclick.net',
  ],
};

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
    {
      // Aperçu des e-mails des formulaires (src/lib/emails.ts), avec `pnpm dev` seulement :
      // /apercu-email/contact et /apercu-email/audit. Absent du site construit.
      name: 'apercu-email',
      hooks: {
        'astro:config:setup': ({ command, injectRoute }) => {
          if (command === 'dev') {
            injectRoute({
              pattern: '/apercu-email/[formulaire]',
              entrypoint: './src/dev/apercu-email.ts',
              prerender: false,
            });
          }
        },
      },
    },
  ],
  build: {
    format: 'directory',
  },
  // Police du site : Manrope (licence SIL OFL), servie par le site lui-même, sans requête vers
  // un service externe. Fichier variable (graisses 200 à 800), sous-ensemble latin.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/polices/manrope-latin.woff2'],
            weight: '200 800',
            style: 'normal',
          },
        ],
      },
    },
  ],
  markdown: {
    // Shiki utilise des styles en ligne, incompatibles avec la CSP.
    syntaxHighlight: false,
  },
  security: {
    // Astro ajoute les empreintes des scripts et des styles de chaque page.
    csp: {
      directives: [
        "default-src 'self'",
        `img-src 'self' data: ${google.img.join(' ')}`,
        `connect-src 'self' ${google.connect.join(' ')}`,
        `frame-src ${google.frame.join(' ')}`,
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        resources: ["'self'", ...google.script],
      },
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
        values: ['mailjet', 'log'],
        optional: true,
      }),
      MAILJET_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAILJET_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
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
