# Site web de l'agence

Site vitrine de Digital Solutions, une agence de services numériques au Maroc qui cible les TPE, PME et particuliers. Domaine : `https://www.digital-solutions.ma`. L'équipe est technique : ingénierie logicielle, développement fullstack, DevOps, QA.

## Référence

Tout le cadrage est dans [docs/brief-agence.md](docs/brief-agence.md) : offre de services, positionnement, arborescence, textes des pages, points légaux et prochaines étapes. Lis-le avant toute tâche de contenu ou de développement du site.

Les choix techniques, l'organisation du code et la mise en service sont dans [docs/stack-technique.md](docs/stack-technique.md).

## État du projet

- Offre : neuf pôles de services (section 3 du brief). Textes des quatre premières pages Services validés, sauf les ajouts marqués « à valider » (options Sites web, WhatsApp, formation IA). Pages Applications mobiles, Logiciels SaaS, Intelligence artificielle, Données et tableaux de bord, Tests et sécurité : textes proposés (sections 6.14 à 6.18), à valider.
- Autres pages (Accueil, Processus, L'agence, Contact) : textes proposés dans le brief (sections 6.7 à 6.11) et intégrés. Ils restent à valider.
- Révision du 26 septembre 2026 (document « Recommandations de wording ») : en-têtes, boutons, cartes et FAQ revus sur tout le site, à valider. Plus de mot « ingénieurs ». Les phrases avec une valeur non confirmée (délais, pays d'hébergement, ville, garantie, sauvegardes) sont retirées, sauf dans les pages légales et les coordonnées. La section « L'équipe » de L'agence est masquée jusqu'à réception des vraies informations.
- Pages Réalisations et Blog : supprimées le 26 septembre 2026 (sections 6.12 et 6.13 du brief).
- Marché : projets au Maroc. Droit marocain (loi 09-08 et CNDP pour les données personnelles, loi 31-08 pour les consommateurs). Ne pas citer la France, le RGPD, la CNIL ou le droit français sur le site.
- Prix : aucun prix public. Pas de page Tarifs : chaque prix est donné en privé, dans un devis.
- Pages légales : projets de texte avec placeholders, à faire valider par un juriste marocain.
- Design : maquettes du designer du 26 septembre 2026, intégrées sur toutes les pages (section « Design » de `docs/stack-technique.md`). Police Manrope, servie par le site. Surtitres des sections : section 6.20 du brief.
- Logo : reçu le 26 septembre 2026, sources dans `design/logo/` (voir son README). Composant `Logo` (symbole de deux demi-disques et nom sur deux lignes) : version couleur dans l'en-tête, version blanche dans le pied de page. Le symbole sert aussi pour le favicon, l'icône Apple, les données structurées et l'image de partage.
- Images : visuels des en-têtes (maquettes d'écrans pour des clients fictifs, section 6.19 du brief, sources dans `design/heros/` ; légende et textes alternatifs validés), aussi en vignette sur les cartes des services, image de partage `public/og.png`, icônes Lucide dans les messages d'erreur. Pas de photo de stock ni de photo d'équipe inventée.
- Technologies : Astro 7, TypeScript, Tailwind CSS 4, Node.js 24, pnpm. Déploiement Docker + Caddy sur un VPS (hébergeur et pays à choisir).
- Déploiement : désactivé tant que la mise en service n'est pas faite (section 8 de `docs/stack-technique.md`). Un aperçu tourne sur Vercel (`asn-tau.vercel.app`, non indexé). Le domaine est à relier à Vercel ou au VPS (section « Nom de domaine » de `docs/stack-technique.md`).
- Adaptateurs : Node par défaut, `@astrojs/vercel` seulement pendant un build Vercel. Tester les deux builds après un changement de configuration (`pnpm build` et `VERCEL=1 pnpm build`).

## Commandes

- `pnpm dev` : serveur de développement.
- `pnpm build` puis `pnpm check:content` : build et vérification des règles de contenu.
- `pnpm test` : tests unitaires. `pnpm test:e2e` : tests navigateurs (après `pnpm build`).
- `pnpm verify` : tous les contrôles de la CI, dans l'ordre.
- `pnpm image:partage` : régénère l'image de partage après un changement du nom de l'agence, du logo ou des couleurs.
- `pnpm image:logo` : régénère les icônes du logo (`favicon.ico`, `apple-touch-icon.png`, `logo.png`) après un changement dans `design/logo/`.
- `pnpm image:heros [nom]` : régénère les visuels des en-têtes après un changement dans `design/heros/`.

## Règles de code

- Aucun prix ni montant sur le site. `pnpm check:content` bloque tout prix affiché et toute mention de la France, du RGPD ou de la CNIL. Le nom, le domaine, les coordonnées et les appels à l'action sont dans `src/data/site.ts`. Les forfaits de maintenance (sans prix) sont dans `src/data/forfaits.ts`.
- Appels à l'action : trois familles (section 6 du brief). « Parler de mon projet » (bouton principal, avec une variante par page de service), « Demander un devis » (besoin déjà cadré), « Faire auditer mon site » (audit gratuit).
- Chaque page reprend les textes du brief mot pour mot et indique la section d'origine en commentaire.
- Les formulaires doivent fonctionner sans JavaScript. Tout nouveau formulaire utilise une Astro Action, un schéma Zod dans `src/lib/schemas.ts`, le champ piège et la case de consentement.
- Pas de style en ligne (`style="…"`) ni de script externe sans mise à jour de la CSP (`astro.config.mjs`).
- Toute nouvelle page doit passer les tests axe et Lighthouse de la CI.
- Couleurs, tailles de titres et largeur du contenu : les jetons de `src/styles/global.css` (`encre`, `bleu`, `doux`, `discret`, `surface`, `text-section`…), jamais de couleur en dur. Les mises en page passent par les composants `Hero`, `Section` (dispositions `colonnes`, `centre`, `pile`) et `Encadre` (tons `gris`, `sombre`, `cadre`).
- Chaque section a un surtitre (petites capitales au-dessus du titre). Un nouveau surtitre s'ajoute d'abord dans la section 6.20 du brief.
- Les visuels des en-têtes (`Hero maquette="…"`) sont des images avec un texte alternatif et la légende « Exemple fictif » (`src/data/maquettes.ts`). Leur texte respecte les mêmes règles que le site : aucun prix ni montant, aucune entreprise réelle, aucun engagement non confirmé. `pnpm test` et `pnpm image:heros` le vérifient sur les sources.
- Placeholders surlignés en jaune : un texte qui peut contenir un placeholder passe par le composant `Texte` (phrase entière dans une chaîne modèle). Les composants de liste (`FeatureGrid`, `Steps`, `ListePoints`…) et `Prose` (pages légales) le font déjà.
- Accessibilité, écarts assumés avec les maquettes : liens soulignés dans le texte (WCAG 1.4.1), bordure des champs plus foncée (contraste de 3:1, WCAG 1.4.11), gris des surtitres et des mentions « facultatif » un peu plus foncé (contraste de 4,5:1 sur le fond gris).
- Animations : CSS seul, avec les utilitaires de `src/styles/global.css` (section « Animations » de `docs/stack-technique.md`). Aucune animation en mode « réduire les animations », aucune animation automatique de plus de 5 secondes, jamais d'animation d'opacité sur du texte, jamais de mouvement sur les champs d'un formulaire.
- Une valeur `{…}` suivie de texte à la ligne suivante peut perdre son espace au rendu : écrire `{' '}` ou garder la valeur sur la même ligne. `pnpm check:content` détecte le cas pour les placeholders.

## Règles de contenu

- Tout le contenu du site est en **français**, avec vouvoiement.
- Suivre le ton et les mots à éviter définis dans la section 4 du brief (pas de jargon technique comme DevOps, QA ou stack côté client, pas de mot « ingénieurs »). `pnpm check:content` bloque ces mots.
- FAQ : chaque réponse commence par une réponse directe (« Oui », « Non », « Cela dépend de… »).
- Ne jamais inventer de prix, de statistiques, de témoignages ou de références clients. Une phrase qui dépend d'une valeur non confirmée (délai, pays, ville, durée) n'est pas publiée : elle reste dans le brief avec son placeholder. Exceptions : les pages légales et les coordonnées gardent leurs placeholders entre crochets (`[numéro de téléphone]`, etc.) jusqu'à validation.
- Quand une décision change l'offre ou le positionnement, mettre à jour `docs/brief-agence.md` pour qu'il reste la source de vérité.
