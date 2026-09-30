#!/usr/bin/env node
/**
 * Vérifie le contenu du site construit (`pnpm build`) avec les règles du brief :
 * placeholders restants, mots à éviter, points d'exclamation, prix affichés.
 *
 * Prix (brief, section 6.22) : un montant affiché doit figurer dans src/data/prix.json et être
 * suivi de « TTC » ou de « HT ». Tant que les mentions légales n'ont pas les identifiants de
 * l'entreprise, ou que les prix n'ont pas de date de fin de validité, le script le signale.
 *
 * Usage : node scripts/check-content.mjs [--strict] [--base-url http://localhost:4321]
 *
 * - Sans --base-url, le script démarre le serveur construit (dist/server/entry.mjs).
 * - Avec --strict (mise en production), les placeholders et une URL de site locale
 *   sont des erreurs. Sans --strict, ce sont des avertissements.
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import {
  analyserPrixStructures,
  analyserTexte,
  conditionsPrix,
  contientPrix,
  extrairePrixStructures,
  extraireTexte,
  extraireTexteMarkdown,
  prixDeclares,
} from './lib/content-rules.mjs';

const { values: options } = parseArgs({
  options: {
    strict: { type: 'boolean', default: false },
    'base-url': { type: 'string' },
  },
});

const SITEMAP = 'dist/client/sitemap-0.xml';
if (!existsSync(SITEMAP)) {
  console.error(`${SITEMAP} introuvable : lancez d'abord « pnpm build ».`);
  process.exit(1);
}

// Prix de départ du site : source unique, lue aussi par src/lib/prix.ts.
const donneesPrix = JSON.parse(readFileSync('src/data/prix.json', 'utf8'));
const prix = prixDeclares(donneesPrix);

// Toutes les pages du sitemap, plus la page 404 et le fichier llms.txt (Markdown).
const chemins = [
  ...[...readFileSync(SITEMAP, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    ([, url]) => new URL(url ?? '').pathname,
  ),
  '/404',
  '/llms.txt',
];

let serveur;
let baseUrl = options['base-url'];
if (!baseUrl) {
  const port = '4399';
  baseUrl = `http://127.0.0.1:${port}`;
  serveur = spawn(process.execPath, ['dist/server/entry.mjs'], {
    env: { ...process.env, HOST: '127.0.0.1', PORT: port, MAIL_TRANSPORT: 'log' },
    stdio: 'ignore',
  });
  await attendreServeur(baseUrl);
}

let erreurs = 0;
let avertissements = 0;
let prixAffiches = false;
/** @type {string[]} */
let mentionsLegales = [];

try {
  for (const chemin of chemins) {
    const reponse = await fetch(new URL(chemin, baseUrl));
    const contenu = await reponse.text();
    const fragments = chemin.endsWith('.txt')
      ? extraireTexteMarkdown(contenu)
      : extraireTexte(contenu);
    const problemes = [
      ...analyserTexte(fragments, { strict: options.strict, prix }),
      ...analyserPrixStructures(extrairePrixStructures(contenu), prix),
    ];
    prixAffiches ||= contientPrix(fragments);
    if (chemin === '/mentions-legales') mentionsLegales = fragments;

    const canonique = contenu.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
    if (options.strict && /\/\/(localhost|127\.0\.0\.1)/.test(canonique)) {
      problemes.push({
        niveau: 'erreur',
        regle: 'URL du site',
        extrait: `${canonique} : définissez SITE_URL avant le build`,
      });
    }

    signaler(chemin, problemes);
  }
} finally {
  serveur?.kill();
}

if (prixAffiches) {
  signaler(
    'Prix affichés',
    conditionsPrix({ mentionsLegales, validite: donneesPrix.validite, strict: options.strict }),
  );
}

console.log(
  `\n${chemins.length} pages et fichiers vérifiés : ${erreurs} erreur(s), ${avertissements} avertissement(s).`,
);
if (avertissements > 0 && !options.strict) {
  console.log('Les avertissements bloqueront la mise en production (mode --strict).');
}
process.exit(erreurs > 0 ? 1 : 0);

/**
 * Affiche les problèmes d'une page et les compte.
 * @param {string} titre
 * @param {{ niveau: string, regle: string, extrait: string }[]} problemes
 */
function signaler(titre, problemes) {
  if (problemes.length === 0) return;
  console.log(`\n${titre}`);
  for (const [cle, nombre] of regrouper(problemes)) {
    const [niveau, regle, extrait] = JSON.parse(cle);
    const symbole = niveau === 'erreur' ? '✖' : '⚠';
    console.log(`  ${symbole} ${regle} : ${extrait}${nombre > 1 ? ` (×${nombre})` : ''}`);
  }
  erreurs += problemes.filter((p) => p.niveau === 'erreur').length;
  avertissements += problemes.filter((p) => p.niveau === 'avertissement').length;
}

/** @param {{ niveau: string, regle: string, extrait: string }[]} problemes */
function regrouper(problemes) {
  /** @type {Map<string, number>} */
  const groupes = new Map();
  for (const { niveau, regle, extrait } of problemes) {
    const cle = JSON.stringify([niveau, regle, extrait]);
    groupes.set(cle, (groupes.get(cle) ?? 0) + 1);
  }
  return groupes;
}

/** @param {string} url */
async function attendreServeur(url) {
  const limite = Date.now() + 15_000;
  while (Date.now() < limite) {
    try {
      await fetch(url);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  serveur?.kill();
  throw new Error(`Le serveur ne répond pas sur ${url}`);
}
