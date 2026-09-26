# Stack technique du site

> Décision du 25 septembre 2026. Ce document explique les choix techniques du site de l'agence, l'organisation du code et la mise en service.
> Le contenu et l'offre restent dans [brief-agence.md](brief-agence.md).

## Sommaire

1. [Principes](#1-principes)
2. [Stack retenue](#2-stack-retenue)
3. [Architecture](#3-architecture)
4. [Organisation du code](#4-organisation-du-code)
5. [Modifier le contenu](#5-modifier-le-contenu)
6. [Tests et intégration continue](#6-tests-et-intégration-continue)
7. [Déploiement](#7-déploiement)
8. [Mise en service](#8-mise-en-service)
9. [Décisions ouvertes](#9-décisions-ouvertes)

---

## 1. Principes

- **Le site est notre première preuve.** Il doit réussir les contrôles de notre propre audit gratuit : vitesse, sécurité, référencement technique et affichage mobile.
- **Il applique nos promesses** : tests avant la mise en ligne, protection des données personnelles (loi 09-08), accessibilité. Aucun prix public : chaque prix est donné dans un devis.
- **Le site contient surtout des pages statiques.** Seules les pages avec formulaire (Contact et Audit gratuit) passent par le serveur.
- **Il envoie très peu de JavaScript.** Le menu mobile et la FAQ utilisent des éléments HTML natifs (`<details>`). Les formulaires fonctionnent sans JavaScript. Les animations sont en CSS.

## 2. Stack retenue

| Couche | Choix | Raison |
|---|---|---|
| Framework | Astro 7, TypeScript strict | Pages en HTML statique. Composants typés. Formulaires côté serveur avec Astro Actions. |
| Environnement | Node.js 24 LTS, pnpm 10 | Astro 7 demande Node 22.12 ou plus. |
| Styles | Tailwind CSS 4 | Les couleurs sont des jetons dans `src/styles/global.css`. Elles changeront avec le design. |
| Images | Illustrations SVG originales, icônes Lucide (`@lucide/astro`, licence ISC), visuels des en-têtes en AVIF | SVG intégré dans la page : aucune requête, aucune photo de stock, couleurs du site. Les visuels des en-têtes sont des maquettes d'écrans pour des clients fictifs, rendues en images (`pnpm image:heros`). |
| Formulaires | Astro Actions + Zod, adaptateur `@astrojs/node` | Validation côté serveur, messages d'erreur en français, champ piège anti-spam, limite de débit par adresse IP. |
| E-mails | Brevo (API transactionnelle) | Chaque demande arrive par e-mail à l'équipe. Serveurs hors du Maroc : transfert à déclarer à la CNDP. |
| SEO | `@astrojs/sitemap`, JSON-LD | Balises title et meta du brief. Données structurées : ProfessionalService, Service, BreadcrumbList. |
| Sécurité | CSP d'Astro + en-têtes HTTP dans Caddy | Astro calcule les empreintes des scripts et des styles de chaque page. Caddy ajoute HSTS, X-Frame-Options, etc. |
| Serveur web | Caddy 2 | HTTPS automatique, compression, cache long des fichiers `/_astro/`. |
| Hébergement | VPS (hébergeur et pays à choisir, voir section 9), Docker Compose | La même plateforme que notre offre « Hébergement géré » : le site est notre premier client. |

**Pourquoi pas WordPress ?** Il demande une base de données et des extensions à mettre à jour. Notre message s'oppose justement aux sites WordPress mal maintenus. Nous pouvons quand même le proposer aux clients.

**Pourquoi pas Next.js ?** Il envoie plus de JavaScript au navigateur et il est trop complexe pour un site vitrine.

**Point de vigilance :** Cloudflare a racheté l'équipe d'Astro en janvier 2026. Astro reste open source (licence MIT). Le site n'utilise aucun service Cloudflare.

## 3. Architecture

```
Visiteur ──HTTPS──▶ Caddy (certificat, en-têtes de sécurité, compression)
                      │
                      ▼
                    Serveur Node (Astro)
                      ├── pages statiques, générées au build
                      └── /contact et /audit-gratuit, rendues à la demande
                              │
                              ▼
                            Brevo ──▶ e-mail à l'équipe
```

- Un formulaire envoyé sans JavaScript revient sur la même page, avec les erreurs ou le message de confirmation.
- Astro refuse les envois qui viennent d'un autre site (contrôle de l'en-tête `Origin`).
- La limite de débit lit l'adresse IP transmise par Caddy (`X-Forwarded-For`). Astro fait confiance à cet en-tête seulement pour le domaine de `SITE_URL`. En préproduction, tous les visiteurs partagent donc la même limite : augmentez `FORM_RATE_LIMIT_MAX` si nécessaire.

## 4. Organisation du code

```
src/
  actions/index.ts        Formulaires : validation, anti-spam, envoi de l'e-mail
  assets/heros/           Visuels des en-têtes (images générées par pnpm image:heros)
  components/             Composants des pages (Hero, MaquetteHero, Section, FAQ, formulaires…)
    illustrations/        Illustrations SVG des en-têtes sans visuel (Services, Méthode, L'agence…)
  data/
    site.ts               Nom, zone, délais, engagements (placeholders du brief)
    forfaits.ts           Forfaits de maintenance (sans prix)
    navigation.ts         Menus
    couleurs.ts           Couleur de chaque service et palette des icônes
    methode.ts            Les cinq étapes d'un projet (accueil, services)
    maquettes.ts          Visuels des en-têtes : textes alternatifs, légende, largeurs
  layouts/BaseLayout.astro  Structure commune : <head>, SEO, en-tête, pied de page
  lib/                    Schémas des formulaires, envoi d'e-mail, limite de débit, SEO
  pages/                  Une page par URL de l'arborescence (section 5 du brief)
  styles/global.css       Tailwind, jetons de design et animations
scripts/check-content.mjs Vérification des règles de contenu
scripts/generer-image-partage.mjs  Image de partage public/og.png
scripts/generer-heros.mjs Visuels des en-têtes, depuis les maquettes de design/heros/
design/heros/             Maquettes HTML des visuels des en-têtes et leurs polices (non servies)
tests/unit/               Tests unitaires (Vitest)
tests/e2e/                Tests dans les navigateurs (Playwright + axe)
deploy/                   Docker Compose, Caddyfile, script de déploiement
```

## 5. Modifier le contenu

- **Textes des pages** : dans `src/pages/`. Chaque page indique la section du brief d'où viennent ses textes.
- **Prix** : aucun sur le site. Chaque prix est donné dans un devis. Les forfaits de maintenance (sans prix) sont dans `src/data/forfaits.ts`.
- **Nom, domaine, zone, délais, engagements** : dans `src/data/site.ts`. Le domaine sert aussi d'adresse de production dans `astro.config.mjs`.
- **Illustrations** : dans `src/components/illustrations/`. Elles sont décoratives (`aria-hidden`) et utilisent les jetons de couleur de `global.css` : elles suivent le design quand il change.
- **Visuels des en-têtes** (onze pages, section 6.19 du brief) : des maquettes d'écrans pour des clients fictifs, avec la légende « Exemple fictif ». Les sources HTML sont dans `design/heros/`. Après une modification, lancez `pnpm image:heros` : le script vérifie les règles de contenu sur les sources (le texte d'une image échappe à `pnpm check:content`), puis écrit les images AVIF et WebP dans `src/assets/heros/`. Le composant `MaquetteHero` les sert telles quelles, sans conversion par Astro : la page Audit gratuit, rendue par le serveur, ne convertit rien à chaque visite. Textes alternatifs et légende : `src/data/maquettes.ts`. Détails : `design/heros/README.md`.
- **Couleurs des icônes** : dans `src/data/couleurs.ts`. Chaque service a sa couleur : carte du service et illustration de la page Services. Les icônes des grilles d'avantages suivent la palette, dans l'ordre. Les classes sont écrites en entier (`bg-teal-700`) : Tailwind ne détecte pas les classes construites.
- **Image de partage** (aperçu sur les réseaux sociaux) : lancez `pnpm image:partage` après un changement du nom de l'agence. Le script affiche le nom dès qu'il n'est plus un placeholder.

**Animations.** Elles sont en CSS seul, dans `src/styles/global.css` :
- en-tête : une barre aux couleurs des services se remplit à l'ouverture de chaque page (`anim-chargement`), le nom de l'agence change de couleur au survol ; sur téléphone, les trois traits du bouton « Menu » se changent en croix et les liens du menu glissent en place l'un après l'autre (`animate-glisse`, délai `--delai-glisse`) ;
- le héros s'anime à l'ouverture de la page : le titre, le sous-titre et les boutons montent en place (`anim-montee`), un trait se dessine sous le mot clé du titre (propriété `motCle` du composant `Hero`), des points et des halos de couleur apparaissent derrière le visuel ou l'illustration (`anim-halo`) et descendent moins vite que la page au défilement (`anim-parallaxe`) ; le visuel (propriété `maquette`) monte en place sans changer d'opacité, car c'est souvent le plus grand élément de la page ; sur téléphone, le visuel s'affiche sous le texte, une illustration est cachée, et deux halos restent dans les coins ;
- les pages sans héros illustré (Contact, pages légales, 404) ont des halos et des points derrière le titre (propriété `decor` du composant `Section`, composant `DecorTitre`) ;
- les illustrations s'animent à l'ouverture de la page : le fond d'abord (`anim-fond`), puis les éléments (classes `anim-entree`, `anim-zoom`, `anim-trace`, `anim-pousse`, `anim-ecrit`, `anim-flux`, `anim-aiguille`, `anim-tourne`, `anim-sonne`, `anim-saut`, `anim-cherche`) ;
- l'ordre d'apparition se règle avec `delai-300` (300 ms) ; `puis-200` compte à partir du délai du parent ;
- les cartes, les titres, les paragraphes, les listes et les questions de la FAQ montent en place pendant le défilement (`apparition`, décalage possible avec la variable `--decalage`), la frise des étapes se remplit (`anim-frise`) ;
- les icônes des cartes, les numéros des étapes, les coches et les icônes d'alerte grandissent quand elles entrent dans l'écran (`apparition-zoom`) ;
- le bandeau d'appel final (`CtaFinal`) : des halos de couleur grandissent quand il entre dans l'écran, la flèche du bouton avance au survol ;
- les liens vers une autre page (« Voir l'offre … → », composant `LienFleche`) : la flèche avance au survol ; tous les liens changent de couleur en douceur, et le soulignement des liens dans le texte s'éloigne au survol ;
- page Contact : le titre monte en place avec le trait souligné (composant `Souligne`, aussi utilisé par `Hero`), les icônes de contact apparaissent, l'avion en papier du bouton s'envole au survol ;
- page Méthode : une frise relie les cartes des étapes et se remplit au défilement, les numéros et les icônes grandissent en entrant dans l'écran, les points de l'étape des tests ont une coche verte ;
- page L'agence : les points de « Ce que nous savons faire » ont une icône en couleur, les avatars de l'équipe grandissent en entrant dans l'écran, les paragraphes montent en place ;
- pages Services : les listes de problèmes ont une icône d'alerte orange, les cartes d'offre ont des coches vertes ; dans le tableau des forfaits, la colonne recommandée est en couleur et sa pastille grandit (le tableau défile sur téléphone : classes `repere` et `apparition-zoom-repere`) ;
- pages légales : une barre de lecture en haut de l'écran se remplit pendant le défilement (composant `BarreLecture`, classe `anim-progression`), les intertitres, les paragraphes et les listes montent en place (composant `Prose`) ;
- page 404 : le mot « introuvable » est souligné, la boussole arrive en tournant puis cherche le nord ;
- page Audit gratuit : les titres montent en place, les quatre points vérifiés ont une icône en couleur qui apparaît, les éléments reçus ont une coche verte, la loupe du bouton s'incline au survol ;
- formulaires (Contact et Audit gratuit) : le libellé et la bordure du champ actif passent en bleu ; en cas d'erreur, le résumé des erreurs tremble et un halo rouge l'entoure (`anim-alerte`), et une icône d'alerte apparaît devant chaque message d'erreur ; le message de confirmation affiche une coche qui se dessine ;
- dans le pied de page, une barre aux couleurs des services se remplit de gauche à droite (`anim-barre`), les trois colonnes et la ligne du copyright montent en place, et chaque service a une pastille de sa couleur ;
- clavier : le lien « Aller au contenu » descend en place (`animate-descend`), le contour du focus se resserre autour de l'élément ;
- les cartes des services, les boutons et les liens du menu réagissent au survol ; les réponses de la FAQ se déroulent ; entre deux pages, l'ancienne page monte en s'effaçant et la nouvelle arrive par le bas, l'en-tête reste en place (transitions de page du navigateur).

Règles, vérifiées par `tests/e2e/animations.spec.ts` pour les deux premières :
- aucune animation si le visiteur a demandé à réduire les animations sur son appareil ;
- une animation qui démarre seule s'arrête avant 5 secondes (WCAG 2.2.2) : pas de boucle infinie ;
- le texte n'est jamais animé en opacité : son contraste reste lisible et vérifiable par axe et Lighthouse ;
- les champs d'un formulaire ne bougent jamais : un clic pendant le mouvement peut tomber sur le mauvais champ (constaté en CI sur WebKit, avec une case à cocher de l'audit) ;
- un trait qui se dessine (`anim-trace`) a besoin de l'attribut `pathLength="1"`.

Deux pièges pour les animations liées au défilement :
- Lightning CSS (utilisé par Tailwind) fusionne `animation-timeline` dans le raccourci `animation`, que les navigateurs refusent. Écrivez les propriétés détaillées (`animation-name`, `animation-duration`, etc.) ;
- un parent en `overflow: hidden` ou `overflow: auto` devient un conteneur de défilement et bloque la timeline `view()`. Utilisez `overflow: clip` ou rien (exemple : `CtaFinal`, qui coupe ses halos avec `overflow-clip`). Si le conteneur doit défiler (tableau des forfaits), donnez-lui la classe `repere` et utilisez `apparition-zoom-repere` dans ses enfants.

Un lien qui glisse au survol doit être en `inline-block` ou `inline-flex`. Il perd alors l'exception des liens dans le texte : sa zone cliquable doit mesurer au moins 24 px de haut (WCAG 2.5.8, vérifié par Lighthouse). Les liens du pied de page ont donc `py-0.5`.

Un élément animé en `translate` ou avec un `view-transition-name` crée un contexte d'empilement. L'en-tête a donc `relative z-30` : sans cela, le titre animé du héros passe au-dessus du menu mobile ouvert.

Limite connue : Firefox ne prend pas encore en charge les animations liées au défilement. Il affiche ces blocs sans mouvement (le contenu reste complet). Les animations à l'ouverture de la page fonctionnent dans tous les navigateurs.

**Placeholders.** Les informations non confirmées restent entre crochets : `[Ville ou région]`, `[pays à définir]`, `[À rédiger : …]`. Le script `pnpm check:content` les liste. En mode `--strict`, il bloque la mise en production tant qu'il en reste.

**Règles du brief vérifiées automatiquement** (section 4) :
- mots à éviter : DevOps, QA, stack, CI/CD, framework, « solutions innovantes », « optimiser », « digitaliser », « 360° » ;
- pas de point d'exclamation ;
- aucun prix affiché (« 5 000 DH », « [X] DH », « 300 € ») : les prix sont donnés dans les devis ;
- aucune mention de la France, du RGPD ou de la CNIL : le site vise des projets au Maroc ;
- pas de placeholder collé à un mot (ex. : « sous [48 h ouvrées]avec »). Astro supprime parfois l'espace entre une valeur `{…}` et le texte de la ligne suivante : écrivez `{' '}` ou gardez la valeur sur la même ligne.

## 6. Tests et intégration continue

| Outil | Ce qu'il vérifie |
|---|---|
| Prettier, ESLint, `astro check` | Format, qualité et types du code. |
| Vitest | Règles de validation des formulaires, limite de débit, règles de contenu (aussi sur les sources des visuels des en-têtes). |
| `check-content` | Placeholders, mots à éviter, points d'exclamation, espaces manquantes, sur le HTML final. |
| Playwright | Chaque page du sitemap sur Chromium, Firefox et WebKit, en tailles ordinateur, mobile et tablette. Envoi des formulaires, erreurs, menu mobile, lien d'évitement, liens internes. Pas de défilement horizontal. Animations : moins de 5 secondes, aucune en mode « réduire les animations » (pages, formulaire en erreur, menu mobile), barre de lecture qui se remplit. |
| axe-core | Accessibilité de chaque page (WCAG 2.1 AA). Il ne trouve qu'une partie des problèmes : faites aussi une vérification manuelle au clavier et au lecteur d'écran. |
| Lighthouse CI | Seuils : performance 95, accessibilité 100, bonnes pratiques 100, SEO 100. Dix pages clés. |
| Build Docker | L'image se construit. |

La CI (`.github/workflows/ci.yml`) lance tous ces contrôles sur chaque pull request et sur `main`.

**Commandes locales :**

```sh
pnpm install          # dépendances
pnpm dev              # serveur de développement (http://localhost:4321)
pnpm build            # build de production
pnpm start            # lance le build (HOST et PORT configurables)
pnpm test             # tests unitaires
pnpm test:e2e         # tests navigateurs (après pnpm build)
pnpm check:content    # règles de contenu (après pnpm build)
pnpm image:partage    # régénère public/og.png (Chromium nécessaire)
pnpm image:heros      # régénère les visuels des en-têtes (Chromium nécessaire)
pnpm verify           # tous les contrôles, dans l'ordre de la CI
```

Pour les tests navigateurs, installez les navigateurs une fois : `pnpm exec playwright install --with-deps`.

## 7. Déploiement

Le workflow `.github/workflows/deploy.yml` se lance après une CI réussie sur `main` :

1. Il construit l'image Docker et la publie sur GitHub Container Registry (`ghcr.io/hrsasn26/asn`).
2. Il déploie l'image en préproduction.
3. Il vérifie le contenu en mode strict. Tant qu'il reste un placeholder, la production est bloquée.
4. Il déploie en production après une validation manuelle.

Le script `deploy/deployer.sh` copie `compose.yaml` et `Caddyfile` sur le serveur, lance la nouvelle image, puis vérifie que le site répond.

Renovate (`renovate.json`) propose les mises à jour des dépendances chaque lundi. La CI les teste avant la fusion.

### Aperçu sur Vercel

Le site peut aussi être déployé sur Vercel (projet `asn`, domaine `asn-tau.vercel.app`).

- Pendant un build Vercel (variable `VERCEL` définie), Astro utilise l'adaptateur `@astrojs/vercel`. Partout ailleurs (Docker, CI, poste de développement), il utilise l'adaptateur Node.
- Sans `SITE_URL`, les URL canoniques utilisent le domaine de l'agence, `https://www.digital-solutions.ma` (champ `domaine` de `src/data/site.ts`).
- `vercel.json` ajoute les en-têtes de sécurité et `X-Robots-Tag: noindex` : Google n'indexe pas le site tant qu'il contient des placeholders.
- Variables d'environnement à définir dans Vercel pour les formulaires :
  - `MAIL_TRANSPORT=log` pour tester : les demandes apparaissent dans les journaux Vercel, sans e-mail ;
  - ou `MAIL_TRANSPORT=brevo` avec `BREVO_API_KEY`, `MAIL_FROM` et `MAIL_TO` pour de vrais envois.
  Sans ces variables, les formulaires affichent un message d'erreur.
- La limite d'envois est en mémoire. Sur Vercel, chaque instance de fonction a son propre compteur : la protection contre le spam est plus faible que sur le VPS.

### Nom de domaine

Le domaine de l'agence est `digital-solutions.ma`. L'adresse officielle du site est **`https://www.digital-solutions.ma`** : l'adresse sans `www` redirige vers elle.

**Pour afficher l'aperçu Vercel sur ce domaine :**

1. Dans Vercel, projet `asn`, menu **Settings → Domains** : ajoutez `www.digital-solutions.ma`, puis `digital-solutions.ma` avec l'option de redirection vers `www.digital-solutions.ma`.
2. Chez le bureau d'enregistrement du domaine, créez les enregistrements DNS que Vercel affiche : un enregistrement `A` pour `digital-solutions.ma` et un enregistrement `CNAME` pour `www`. Copiez les valeurs exactes depuis Vercel.
3. Attendez la propagation DNS. Vercel crée le certificat HTTPS tout seul.

Le site reste non indexé (`X-Robots-Tag: noindex` dans `vercel.json`) tant que les textes et les pages légales ne sont pas validés.

**Pour la production sur le VPS**, voir la section 8 : les mêmes enregistrements DNS pointent alors vers l'adresse IP du serveur.

**E-mails :** pour envoyer les formulaires depuis une adresse `@digital-solutions.ma`, authentifiez le domaine dans Brevo (enregistrements DNS SPF, DKIM et DMARC fournis par Brevo).

## 8. Mise en service

Le déploiement est désactivé tant que ces étapes ne sont pas faites.

1. **Serveur** : un VPS avec Docker (hébergeur et pays à choisir, voir section 9). Créez un utilisateur de déploiement et un dossier (par exemple `/srv/site`).
2. **Configuration du serveur** : copiez `.env.example` dans ce dossier sous le nom `.env`, puis remplissez les valeurs. En production : `SITE_DOMAIN=www.digital-solutions.ma` et `DOMAINES_REDIRIGES=digital-solutions.ma`.
3. **Accès à l'image** : sur le serveur, connectez Docker à `ghcr.io` avec un jeton GitHub en lecture seule (`read:packages`), ou rendez le paquet public.
4. **DNS** : faites pointer `digital-solutions.ma` et `www.digital-solutions.ma` vers le serveur (enregistrements `A`, et `AAAA` si le serveur a une adresse IPv6). Caddy obtient les certificats HTTPS tout seul et redirige l'adresse sans `www`.
5. **Brevo** : créez une clé d'API et authentifiez le domaine `digital-solutions.ma` (voir « Nom de domaine » ci-dessus).
6. **GitHub** :
   - variables du dépôt : `DEPLOY_ENABLED=true`, `SITE_URL=https://www.digital-solutions.ma` ;
   - environnements `preprod` et `production`, chacun avec les variables `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_URL` et les secrets `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS` ;
   - sur l'environnement `production`, ajoutez une validation manuelle (« Required reviewers »).
7. **Renovate** : installez l'application Renovate sur le dépôt.
8. **Surveillance** : configurez une sonde de disponibilité externe, hors du VPS, avec une alerte vers l'équipe.

En préproduction, mettez `ROBOTS_TAG=noindex` dans `.env` pour que Google n'indexe pas le site.

## 9. Décisions ouvertes

| Sujet | État | Effet sur la stack |
|---|---|---|
| Hébergeur précis | Scaleway ou OVHcloud, à choisir. Alternative : Clever Cloud (moins d'exploitation). Un hébergement hors du Maroc est un transfert de données à l'étranger (loi 09-08, article 43) : à déclarer à la CNDP. Un hébergeur au Maroc évite ce transfert. À valider avec le juriste. | Avec Clever Cloud, `deploy/` est remplacé par un déploiement par `git push`. Avec un hébergeur au Maroc, `deploy/` ne change pas. |
| Design | Modèle personnalisé ou designer partenaire (section 8 du brief). | Remplacer les jetons de `global.css`. Ajouter la police avec l'API Fonts d'Astro (police auto-hébergée). En attendant, le site utilise la police du système. |
| Interface d'édition (CMS) | À décider si nous vendons des sites Astro aux clients. | Ajouter Keystatic (contenus dans Git) pour le tester sur notre site d'abord. |
| Mesure d'audience | Matomo ou Plausible, sans cookie si possible. À valider avec le juriste (loi 09-08, consentement aux cookies). | Pas encore intégrée. Il faudra ajouter son domaine à la CSP (`astro.config.mjs`). |
| Vercel : aperçu ou production | Vercel sert d'aperçu. Vercel est une entreprise américaine : l'utiliser en production doit rester compatible avec l'engagement « Hébergement en [pays à définir] » (section 4 du brief) et avec les règles de transfert de données à l'étranger de la loi 09-08. À valider avec le juriste. | En production sur Vercel : retirer `X-Robots-Tag: noindex` de `vercel.json`, choisir la région des fonctions et remplacer la limite d'envois en mémoire. |
| Accusé de réception au prospect | Non mis en place. Un e-mail automatique vers une adresse saisie dans un formulaire peut servir à envoyer du spam à des tiers. | À ajouter avec un texte validé si le besoin est confirmé. |
