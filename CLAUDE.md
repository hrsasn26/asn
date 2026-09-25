# Site web de l'agence

Site vitrine de Digital Solutions, une agence de services numériques au Maroc qui cible les TPE, PME et particuliers. Domaine : `https://www.digital-solutions.ma`. L'équipe est technique : ingénierie logicielle, développement fullstack, DevOps, QA.

## Référence

Tout le cadrage est dans [docs/brief-agence.md](docs/brief-agence.md) : offre de services, positionnement, arborescence, textes des pages, points légaux et prochaines étapes. Lis-le avant toute tâche de contenu ou de développement du site.

Les choix techniques, l'organisation du code et la mise en service sont dans [docs/stack-technique.md](docs/stack-technique.md).

## État du projet

- Offre : neuf pôles de services (section 3 du brief). Textes des quatre premières pages Services validés, sauf les ajouts marqués « à valider » (options Sites web, WhatsApp, formation IA). Pages Applications mobiles, Logiciels SaaS, Intelligence artificielle, Données et tableaux de bord, Tests et sécurité : textes proposés (sections 6.14 à 6.18), à valider.
- Autres pages (Accueil, Méthode, Tarifs, L'agence, Contact, Réalisations, Blog) : textes proposés dans le brief (sections 6.7 à 6.13) et intégrés. Ils restent à valider.
- Blog : trois premiers articles dans `src/content/blog/`, à valider.
- Marché : Maroc. Prix en DH, droit marocain (loi 09-08 et CNDP pour les données personnelles, loi 31-08 pour les consommateurs). Ne pas citer le RGPD, la CNIL ou le droit français sur le site.
- Pages légales : projets de texte avec placeholders, à faire valider par un juriste marocain.
- Images : illustrations SVG originales (`src/components/illustrations/`), icônes Lucide, image de partage `public/og.png`. Pas de photo de stock ni de photo d'équipe inventée.
- Technologies : Astro 7, TypeScript, Tailwind CSS 4, Node.js 24, pnpm. Déploiement Docker + Caddy sur un VPS en France.
- Déploiement : désactivé tant que la mise en service n'est pas faite (section 8 de `docs/stack-technique.md`). Un aperçu tourne sur Vercel (`asn-tau.vercel.app`, non indexé). Le domaine est à relier à Vercel ou au VPS (section « Nom de domaine » de `docs/stack-technique.md`).
- Adaptateurs : Node par défaut, `@astrojs/vercel` seulement pendant un build Vercel. Tester les deux builds après un changement de configuration (`pnpm build` et `VERCEL=1 pnpm build`).

## Commandes

- `pnpm dev` : serveur de développement.
- `pnpm build` puis `pnpm check:content` : build et vérification des règles de contenu.
- `pnpm test` : tests unitaires. `pnpm test:e2e` : tests navigateurs (après `pnpm build`).
- `pnpm verify` : tous les contrôles de la CI, dans l'ordre.
- `pnpm image:partage` : régénère l'image de partage après un changement du nom de l'agence.

## Règles de code

- Les prix sont uniquement dans `src/data/tarifs.ts`. Le nom, la zone, les délais et les engagements sont dans `src/data/site.ts`.
- Chaque page reprend les textes du brief mot pour mot et indique la section d'origine en commentaire.
- Les formulaires doivent fonctionner sans JavaScript. Tout nouveau formulaire utilise une Astro Action, un schéma Zod dans `src/lib/schemas.ts`, le champ piège et la case de consentement.
- Pas de style en ligne (`style="…"`) ni de script externe sans mise à jour de la CSP (`astro.config.mjs`).
- Toute nouvelle page doit passer les tests axe et Lighthouse de la CI.
- Les illustrations sont décoratives (`aria-hidden`) et utilisent les classes de couleur Tailwind, jamais de couleur en dur ni de style en ligne.
- Une valeur `{…}` suivie de texte à la ligne suivante peut perdre son espace au rendu : écrire `{' '}` ou garder la valeur sur la même ligne. `pnpm check:content` détecte le cas pour les placeholders.

## Règles de contenu

- Tout le contenu du site est en **français**, avec vouvoiement.
- Suivre le ton et les mots à éviter définis dans la section 4 du brief (pas de jargon technique comme DevOps, QA ou stack côté client).
- Ne jamais inventer de prix, de statistiques, de témoignages ou de références clients. Garder les placeholders entre crochets (`[Ville ou région]`, `[X] DH`, etc.) tant que l'information n'est pas fournie.
- Quand une décision change l'offre ou le positionnement, mettre à jour `docs/brief-agence.md` pour qu'il reste la source de vérité.
