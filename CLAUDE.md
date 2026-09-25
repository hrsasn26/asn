# Site web de l'agence

Site vitrine d'une agence de services numériques (nom à définir) qui cible les TPE, PME et particuliers. L'équipe est technique : ingénierie logicielle, développement fullstack, DevOps, QA.

## Référence

Tout le cadrage est dans [docs/brief-agence.md](docs/brief-agence.md) : offre de services, positionnement, arborescence, textes des pages Services, points légaux et prochaines étapes. Lis-le avant toute tâche de contenu ou de développement du site.

Les choix techniques, l'organisation du code et la mise en service sont dans [docs/stack-technique.md](docs/stack-technique.md).

## État du projet

- Offre et textes des pages Services : rédigés (voir le brief) et intégrés au site.
- Autres pages (Accueil, Méthode, Tarifs, L'agence, Contact) : structure en place, textes à rédiger (blocs `[À rédiger : …]`).
- Pages légales : à rédiger et à faire valider par un juriste.
- Technologies : Astro 7, TypeScript, Tailwind CSS 4, Node.js 24, pnpm. Déploiement Docker + Caddy sur un VPS en France.
- Déploiement : désactivé tant que la mise en service n'est pas faite (section 8 de `docs/stack-technique.md`). Un aperçu tourne sur Vercel (`asn-tau.vercel.app`, non indexé).
- Adaptateurs : Node par défaut, `@astrojs/vercel` seulement pendant un build Vercel. Tester les deux builds après un changement de configuration (`pnpm build` et `VERCEL=1 pnpm build`).

## Commandes

- `pnpm dev` : serveur de développement.
- `pnpm build` puis `pnpm check:content` : build et vérification des règles de contenu.
- `pnpm test` : tests unitaires. `pnpm test:e2e` : tests navigateurs (après `pnpm build`).
- `pnpm verify` : tous les contrôles de la CI, dans l'ordre.

## Règles de code

- Les prix sont uniquement dans `src/data/tarifs.ts`. Le nom, la zone, les délais et les engagements sont dans `src/data/site.ts`.
- Chaque page reprend les textes du brief mot pour mot et indique la section d'origine en commentaire.
- Les formulaires doivent fonctionner sans JavaScript. Tout nouveau formulaire utilise une Astro Action, un schéma Zod dans `src/lib/schemas.ts`, le champ piège et la case de consentement.
- Pas de style en ligne (`style="…"`) ni de script externe sans mise à jour de la CSP (`astro.config.mjs`).
- Toute nouvelle page doit passer les tests axe et Lighthouse de la CI.

## Règles de contenu

- Tout le contenu du site est en **français**, avec vouvoiement.
- Suivre le ton et les mots à éviter définis dans la section 4 du brief (pas de jargon technique comme DevOps, QA ou stack côté client).
- Ne jamais inventer de prix, de statistiques, de témoignages ou de références clients. Garder les placeholders entre crochets (`[Nom]`, `[X] €`, etc.) tant que l'information n'est pas fournie.
- Quand une décision change l'offre ou le positionnement, mettre à jour `docs/brief-agence.md` pour qu'il reste la source de vérité.
