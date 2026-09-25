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
- **Il applique nos promesses** : tests avant la mise en ligne, RGPD, accessibilité, hébergement en France ou en Europe.
- **Le site contient surtout des pages statiques.** Seules les pages avec formulaire (Contact et Audit gratuit) passent par le serveur.
- **Il envoie très peu de JavaScript.** Le menu mobile et la FAQ utilisent des éléments HTML natifs (`<details>`). Les formulaires fonctionnent sans JavaScript.

## 2. Stack retenue

| Couche | Choix | Raison |
|---|---|---|
| Framework | Astro 7, TypeScript strict | Pages en HTML statique. Composants typés. Formulaires côté serveur avec Astro Actions. |
| Environnement | Node.js 24 LTS, pnpm 10 | Astro 7 demande Node 22.12 ou plus. |
| Styles | Tailwind CSS 4 | Les couleurs sont des jetons dans `src/styles/global.css`. Elles changeront avec le design. |
| Contenu long | Content collections Astro (Markdown + schéma Zod) | Le blog et les réalisations sont dans Git. Le build échoue si un champ obligatoire manque. |
| Formulaires | Astro Actions + Zod, adaptateur `@astrojs/node` | Validation côté serveur, messages d'erreur en français, champ piège anti-spam, limite de débit par adresse IP. |
| E-mails | Brevo (API transactionnelle) | Entreprise française. Chaque demande arrive par e-mail à l'équipe. |
| SEO | `@astrojs/sitemap`, `@astrojs/rss`, JSON-LD | Balises title et meta du brief. Données structurées : ProfessionalService, Service, BreadcrumbList, BlogPosting. |
| Sécurité | CSP d'Astro + en-têtes HTTP dans Caddy | Astro calcule les empreintes des scripts et des styles de chaque page. Caddy ajoute HSTS, X-Frame-Options, etc. |
| Serveur web | Caddy 2 | HTTPS automatique, compression, cache long des fichiers `/_astro/`. |
| Hébergement | VPS en France (Scaleway ou OVHcloud), Docker Compose | La même plateforme que notre offre « Hébergement géré » : le site est notre premier client. |

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
  components/             Composants des pages (Hero, Section, FAQ, formulaires…)
  content/                Blog et réalisations (Markdown)
  content.config.ts       Schéma des articles et des études de cas
  data/
    site.ts               Nom, zone, délais, engagements (placeholders du brief)
    tarifs.ts             Tous les prix (placeholders du brief)
    navigation.ts         Menus
  layouts/BaseLayout.astro  Structure commune : <head>, SEO, en-tête, pied de page
  lib/                    Schémas des formulaires, envoi d'e-mail, limite de débit, SEO
  pages/                  Une page par URL de l'arborescence (section 5 du brief)
  styles/global.css       Tailwind et jetons de design
scripts/check-content.mjs Vérification des règles de contenu
tests/unit/               Tests unitaires (Vitest)
tests/e2e/                Tests dans les navigateurs (Playwright + axe)
deploy/                   Docker Compose, Caddyfile, script de déploiement
```

## 5. Modifier le contenu

- **Textes des pages** : dans `src/pages/`. Chaque page indique la section du brief d'où viennent ses textes.
- **Prix** : uniquement dans `src/data/tarifs.ts`. Un prix apparaît sur plusieurs pages : vous le modifiez une seule fois.
- **Nom, zone, délais, engagements** : dans `src/data/site.ts`.
- **Article de blog** : ajoutez un fichier Markdown dans `src/content/blog/`. Les champs obligatoires sont dans `src/content.config.ts`.
- **Étude de cas** : ajoutez un fichier Markdown dans `src/content/realisations/`. Uniquement des projets réels, avec l'accord du client.

**Placeholders.** Les informations non confirmées restent entre crochets : `[Nom]`, `[X] €`, `[À rédiger : …]`. Le script `pnpm check:content` les liste. En mode `--strict`, il bloque la mise en production tant qu'il en reste.

**Règles du brief vérifiées automatiquement** (section 4) :
- mots à éviter : DevOps, QA, stack, CI/CD, framework, « solutions innovantes », « optimiser », « digitaliser », « 360° » ;
- pas de point d'exclamation.

## 6. Tests et intégration continue

| Outil | Ce qu'il vérifie |
|---|---|
| Prettier, ESLint, `astro check` | Format, qualité et types du code. |
| Vitest | Règles de validation des formulaires, limite de débit, règles de contenu. |
| `check-content` | Placeholders, mots à éviter, points d'exclamation, sur le HTML final. |
| Playwright | Chaque page du sitemap sur Chromium, Firefox et WebKit, en tailles ordinateur, mobile et tablette. Envoi des formulaires, erreurs, menu mobile, lien d'évitement, liens internes. Pas de défilement horizontal. |
| axe-core | Accessibilité de chaque page (WCAG 2.1 AA). Il ne trouve qu'une partie des problèmes : faites aussi une vérification manuelle au clavier et au lecteur d'écran. |
| Lighthouse CI | Seuils : performance 95, accessibilité 100, bonnes pratiques 100, SEO 100. Six pages clés. |
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

## 8. Mise en service

Le déploiement est désactivé tant que ces étapes ne sont pas faites.

1. **Serveur** : un VPS en France avec Docker. Créez un utilisateur de déploiement et un dossier (par exemple `/srv/site`).
2. **Configuration du serveur** : copiez `.env.example` dans ce dossier sous le nom `.env`, puis remplissez les valeurs.
3. **Accès à l'image** : sur le serveur, connectez Docker à `ghcr.io` avec un jeton GitHub en lecture seule (`read:packages`), ou rendez le paquet public.
4. **DNS** : faites pointer le domaine (et `www`) vers le serveur. Caddy obtient le certificat HTTPS tout seul.
5. **Brevo** : créez une clé d'API et validez l'adresse d'expédition.
6. **GitHub** :
   - variables du dépôt : `DEPLOY_ENABLED=true`, `SITE_URL` (ex. `https://www.exemple.fr`) ;
   - environnements `preprod` et `production`, chacun avec les variables `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `DEPLOY_URL` et les secrets `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS` ;
   - sur l'environnement `production`, ajoutez une validation manuelle (« Required reviewers »).
7. **Renovate** : installez l'application Renovate sur le dépôt.
8. **Surveillance** : configurez une sonde de disponibilité externe, hors du VPS, avec une alerte vers l'équipe.

En préproduction, mettez `ROBOTS_TAG=noindex` dans `.env` pour que Google n'indexe pas le site.

## 9. Décisions ouvertes

| Sujet | État | Effet sur la stack |
|---|---|---|
| Hébergeur précis | Scaleway ou OVHcloud, à choisir. Alternative : Clever Cloud (moins d'exploitation). | Avec Clever Cloud, `deploy/` est remplacé par un déploiement par `git push`. |
| Design | Modèle personnalisé ou designer partenaire (section 8 du brief). | Remplacer les jetons de `global.css`. Ajouter la police avec l'API Fonts d'Astro (police auto-hébergée). En attendant, le site utilise la police du système. |
| Interface d'édition (CMS) | À décider si nous vendons des sites Astro aux clients. | Ajouter Keystatic (contenus dans Git) pour le tester sur notre site d'abord. |
| Mesure d'audience | Matomo (liste officielle de la CNIL) ou Plausible. À valider avec le juriste. | Pas encore intégrée. Il faudra ajouter son domaine à la CSP (`astro.config.mjs`). |
| Accusé de réception au prospect | Non mis en place. Un e-mail automatique vers une adresse saisie dans un formulaire peut servir à envoyer du spam à des tiers. | À ajouter avec un texte validé si le besoin est confirmé. |
