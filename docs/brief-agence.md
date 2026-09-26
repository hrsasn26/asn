# Brief agence : offre de services et contenus du site

> Document de travail de référence pour le site de l'agence.
> Il contient le positionnement, l'offre de services, l'arborescence du site et les textes des pages.
> Les éléments entre crochets `[...]` restent à compléter ou à confirmer.

## Sommaire

1. [Contexte](#1-contexte)
2. [Panorama des services d'une agence numérique](#2-panorama-des-services-dune-agence-numérique)
3. [Offre retenue](#3-offre-retenue)
4. [Positionnement et message](#4-positionnement-et-message)
5. [Arborescence du site](#5-arborescence-du-site)
6. [Contenus des pages](#6-contenus-des-pages)
7. [Points légaux](#7-points-légaux)
8. [Prochaines étapes](#8-prochaines-étapes)

---

## 1. Contexte

| | |
|---|---|
| **Nom de l'agence** | Digital Solutions |
| **Nom de domaine** | digital-solutions.ma (site : https://www.digital-solutions.ma) |
| **Clients cibles** | TPE, PME et particuliers, au Maroc |
| **Compétences de l'équipe** | Ingénierie logicielle, développement fullstack, DevOps, QA (tests) |
| **Compétences absentes** | Design graphique et UX/UI, marketing (publicité, réseaux sociaux, rédaction) |
| **Zone géographique** | Maroc. L'agence est à Fès : N° 7, rue Tantane, 30000 Fès (reçu le 26 septembre 2026, utile pour le référencement local) |

---

## 2. Panorama des services d'une agence numérique

Liste de référence des services qu'une agence de ce type propose en général, avec ce que nous retenons.

| Pôle | Services types | Retenu ? |
|---|---|---|
| Conseil et stratégie | Audit digital, feuille de route, accompagnement de projet | **Partiel** : audit technique uniquement |
| Design et identité visuelle | Logo, charte graphique, UX/UI, design system, vidéo, photo | **Via partenaire** |
| Développement web | Site vitrine, e-commerce, landing pages, applications web, refonte, sites multilingues | **Oui** |
| Applications mobiles | Natives, multiplateformes (React Native, Flutter), PWA | **Oui** (multiplateforme), avec une page dédiée |
| Logiciels SaaS | Plateformes en ligne par abonnement : comptes clients, abonnements, paiement | **Oui** |
| Marketing et acquisition | SEO, SEA, publicité sociale, GEO, emailing, rédaction | **Partiel** : SEO technique uniquement. Rédaction via partenaire. Pas de publicité. |
| Réseaux sociaux | Stratégie, community management, contenus, influence | **Non** |
| Data et performance | Suivi GA4 / Tag Manager, tableaux de bord, CRO, tests A/B | **Partiel** : mesure d'audience, tableaux de bord et rapports automatiques. Pas de CRO ni de tests A/B (marketing). |
| IA | Assistants (chatbots), recherche dans les documents, traitement de documents, rédaction assistée | **Oui**, avec une page dédiée |
| Automatisation | Automatisation (n8n, Make, Zapier), intégration CRM/ERP, WhatsApp Business | **Oui** |
| Tests et sécurité | Audit de sécurité, recette avant mise en ligne, tests automatiques, tests de charge | **Oui**, avec une page dédiée |
| Hébergement, maintenance, conformité | Hébergement, maintenance, sécurité, protection des données (loi 09-08), accessibilité | **Oui** |
| Formation | Prise en main des outils livrés, ateliers IA pour les équipes | **Oui** : prise en main incluse dans les projets, ateliers IA en option |

---

## 3. Offre retenue

Neuf pôles de services, plus un audit gratuit pour générer des contacts.

> **Décision du 25 septembre 2026 : aucun prix public.** Les prix sont donnés uniquement dans les devis, en privé. La page Tarifs est supprimée. `pnpm check:content` bloque tout montant affiché sur le site.

> Ajouts du 25 septembre 2026, à valider : pôles 3, 4, 5, 7 et 8 (sections 6.14 à 6.18), sites multilingues (pôle 1), WhatsApp Business (pôle 6) et formation à l'IA (pôle 5).

### Pôle 1 : Sites web
*Compétences : développement fullstack*
- Site vitrine (TPE, artisans, indépendants, particuliers)
- Site e-commerce (Shopify, WooCommerce ou sur mesure)
- Refonte ou migration d'un site existant
- Inclus par défaut : SEO technique, rapidité, accessibilité, conformité à la loi 09-08 (données personnelles)
- En option : site en plusieurs langues (français, arabe de droite à gauche, anglais). Traductions fournies par le client ou par un traducteur partenaire.
- En option : bouton WhatsApp (voir pôle 6)

### Pôle 2 : Applications sur mesure
*Compétences : ingénierie logicielle, fullstack*
- Outils métier : réservation, devis et facturation, gestion de stock, planning
- Espaces clients et portails
- MVP pour porteurs de projet : c'est la meilleure cible « particulier » pour notre équipe

### Pôle 3 : Applications mobiles
*Compétences : ingénierie logicielle, fullstack, QA*
- Applications iPhone et Android à partir d'un seul développement (React Native ou Flutter)
- Applications pour les clients (réservation, commande, fidélité) et pour les équipes (terrain, hors connexion)
- Publication sur l'App Store et Google Play, puis mises à jour imposées chaque année par Apple et Google

### Pôle 4 : Logiciels SaaS
*Compétences : ingénierie logicielle, fullstack, DevOps, QA*
- Plateformes en ligne vendues par abonnement, pour les porteurs de projet et les entreprises
- Comptes clients séparés, abonnements, paiement en ligne, espace d'administration
- Première version (MVP), puis hébergement, surveillance et évolutions

> **Stratégique :** un SaaS demande un hébergement et des évolutions en continu. C'est un revenu récurrent, comme le pôle 9.

### Pôle 5 : Intelligence artificielle
*Compétences : ingénierie logicielle, fullstack, QA*
- Assistants pour les clients : site web, WhatsApp
- Assistants pour les équipes : recherche dans les documents internes, avec la source
- Traitement de documents : lecture, extraction, classement
- Rédaction assistée, toujours relue par une personne
- Formation des équipes : ateliers pratiques avec leurs propres cas, et règles d'utilisation de l'IA pour l'entreprise

> Notre différence : une IA testée avec des cas réels, qui cite ses sources et dit quand elle ne sait pas. Pas de promesse de résultat.

### Pôle 6 : Automatisation et intégrations
*Compétences : fullstack, ingénierie logicielle*
- Connexion des outils entre eux par API : site, CRM, comptabilité, boutique en ligne
- Automatisation des tâches répétitives (n8n, Make, scripts sur mesure)
- Automatisations surveillées, avec une alerte en cas d'erreur
- WhatsApp Business : bouton sur le site, messages automatiques par la plateforme officielle de Meta, conversations envoyées dans le CRM

### Pôle 7 : Données et tableaux de bord
*Compétences : fullstack, ingénierie logicielle, QA*
- Mesure d'audience des sites : Matomo, Plausible ou Google Analytics, dans le respect de la loi 09-08
- Tableaux de bord de l'activité : ventes, stocks, rendez-vous, à partir des outils du client
- Rapports automatiques et alertes
- Hors offre : analyse marketing, publicité, CRO et tests A/B

### Pôle 8 : Tests et sécurité
*Compétences : QA, DevOps*
- Audit de sécurité de sites et d'applications, y compris développés par d'autres
- Tests avant une mise en ligne (recette), sur tous les écrans et navigateurs
- Ajout de tests automatiques à un projet existant
- Tests de charge avant un pic de visiteurs
- Toujours avec l'autorisation écrite du propriétaire (voir [section 7](#7-points-légaux))

> C'est notre cœur de métier (QA). L'audit gratuit sert de porte d'entrée : il regarde le site de l'extérieur, l'audit de sécurité va plus loin.

### Pôle 9 : Hébergement, maintenance et sécurité
*Compétences : DevOps, QA*
- Hébergement géré, nom de domaine, e-mails professionnels
- Maintenance corrective et évolutive en forfait mensuel
- Sauvegardes, surveillance, certificats SSL, mises à jour de sécurité
- Reprise de projet existant : audit du code, corrections, stabilisation

> **Stratégique :** ce pôle apporte un revenu récurrent. Proposer un forfait de maintenance à la fin de chaque projet.

### Pour attirer les premiers contacts : l'audit technique gratuit
Audit du site actuel du prospect : rapidité, sécurité, SEO technique, affichage mobile. Il montre notre expertise et amène des demandes de devis.

### Ce que nous ne proposons pas (pour l'instant)
- **Google Ads, Meta Ads, community management, influence** : métiers du marketing, hors de nos compétences.
- **Logo et identité visuelle** : à confier à un graphiste freelance partenaire.
- **Rédaction et SEO éditorial** : à confier à un rédacteur partenaire.

**Design UX/UI des sites :** deux options, travailler avec un designer freelance partenaire, ou partir de modèles de qualité que nous personnalisons. [choix à faire]

### Particularités de la cible « particuliers »
- Budgets plus serrés : proposer des offres simples, avec un **devis gratuit à prix fixe**.
- Obligations légales spécifiques : voir [section 7](#7-points-légaux).

---

## 4. Positionnement et message

### Promesse

> **Des sites et des applications fiables, testés, sécurisés et suivis dans la durée.**

> Décision du 26 septembre 2026 : le mot « ingénieurs » n'apparaît plus sur le site, ni dans la promesse.

### Différenciation
Beaucoup d'agences qui travaillent avec les TPE et PME montent des sites WordPress à partir de thèmes, sans tests ni vraie maintenance. Nos compétences DevOps et QA nous permettent de nous démarquer sur la **fiabilité** et le **suivi**. C'est un argument fort auprès de clients souvent échaudés par un prestataire disparu ou un site piraté.

### Traduire nos compétences en bénéfices clients
Les clients ne savent pas ce que veulent dire « DevOps » ou « QA ». Sur le site, on parle de ce qu'ils y gagnent :

| Notre compétence | Ce que le client comprend |
|---|---|
| DevOps | Votre site reste en ligne, rapide et sauvegardé chaque jour |
| QA | Tout est testé avant la mise en ligne, sans mauvaise surprise |
| Ingénierie logicielle | Un outil solide qui évolue avec votre activité |
| Fullstack | Un seul interlocuteur pour tout votre projet |

### Preuves à répéter
Chaque page s'appuie sur les mêmes preuves, plutôt que sur des promesses générales :
- les tests avant chaque mise en ligne ;
- un périmètre, un prix et un planning écrits dans le devis ;
- la propriété du code, du nom de domaine et des données ;
- un interlocuteur direct ;
- la maintenance possible après la mise en ligne.

Dès que possible, ajouter des preuves réelles : exemple de rapport, capture de test, délai constaté, processus de sauvegarde, cas client ou témoignage vérifiable (avec l'accord écrit du client).

### Ton et style
- **Vouvoiement**, ton professionnel et chaleureux.
- **Clair avant tout** : phrases courtes, un message par section.
- **Bénéfices avant fonctionnalités** : dire ce que le client y gagne, pas comment c'est fait.
- **Honnête** : aucune statistique, aucun témoignage ni aucune promesse de résultat inventés (ex. pas de « première place sur Google garantie »).
- **Rassurant, pas alarmiste** : décrire les risques sans formule anxiogène.
- **FAQ** : chaque réponse commence par une réponse directe (« Oui », « Non », « Cela dépend de… »), puis explique, en deux à cinq phrases si possible.
- **Aucune valeur non confirmée** : pas de délai, de durée, de ville, de pays, d'adresse ni de zone servie tant qu'ils ne sont pas confirmés, ni sur les pages, ni dans les données structurées, ni dans `llms.txt`. La phrase est retirée plutôt que publiée avec un placeholder (décision du 26 septembre 2026). Exceptions : les pages légales et les coordonnées de l'agence, obligatoires.
- **Pas de points d'exclamation.**
- **Mots à éviter sur le site** : DevOps, QA, stack, CI/CD, framework, « solutions innovantes », « optimiser », « digitaliser », « 360° », « ingénieurs ».
- **Publics non nommés** : le site ne nomme pas les publics visés (TPE, PME, particuliers). Les mots-clés visés ne les contiennent pas non plus. Il n'est pas nécessaire de les préciser (décision du 26 septembre 2026, à valider). Exception : les pages légales, qui parlent des clients particuliers (loi 31-08).

### Engagements à confirmer avant publication
Ces engagements sont forts commercialement, mais il faut pouvoir les tenir. Depuis le 26 septembre 2026, le pays d'hébergement et le délai de réponse ne sont plus affichés sur le site : ils reviendront une fois confirmés.
- [ ] Le client reste propriétaire de son code, de son nom de domaine et de ses données.
- [ ] Hébergement en [pays à définir]. Un hébergement au Maroc évite la déclaration de transfert de données à la CNDP.
- [ ] Devis à prix fixe après cadrage.
- [ ] Réponse aux demandes de contact sous [48 h ouvrées].
- [ ] Accord de confidentialité (NDA) possible pour les porteurs de projet.

---

## 5. Arborescence du site

```
Accueil                                   /
├── Services                              /services
│   ├── Sites web                         /services/sites-web
│   ├── Applications sur mesure           /services/applications-sur-mesure
│   ├── Applications mobiles              /services/applications-mobiles
│   ├── Logiciels SaaS                    /services/logiciels-saas
│   ├── Intelligence artificielle         /services/intelligence-artificielle
│   ├── Automatisation & intégrations     /services/automatisation-integrations
│   ├── Données & tableaux de bord        /services/donnees-tableaux-de-bord
│   ├── Tests & sécurité                  /services/tests-securite
│   └── Hébergement & maintenance         /services/hebergement-maintenance
├── Audit gratuit                         /audit-gratuit
├── Processus                             /processus
├── L'agence (équipe, valeurs)            /agence
├── Contact / Demande de devis            /contact
└── Mentions légales · CGV · Confidentialité
```

**Pied de page (toutes les pages) :** nom de l'agence et promesse, liens vers les services, liens légaux, puis la ligne « © [année] Digital Solutions. Tous droits réservés. » L'année est celle du dernier déploiement.

La page « Processus », avec une étape de tests bien visible, est l'endroit idéal pour mettre en avant la compétence QA.

---

## 6. Contenus des pages

> Sections 6.1 à 6.6 : textes validés, sauf les ajouts marqués « à valider ». Sections 6.7 à 6.13 et 6.14 à 6.18 (nouveaux services) : propositions à valider. Section 6.19 (visuels des en-têtes) : légende et textes alternatifs validés. Section 6.20 (surtitres et libellés du design) : proposition à valider.
> Adaptation au Maroc (25 septembre 2026) : prix en DH, loi 09-08 à la place du RGPD, délai de rétractation de 7 jours. Ces changements sont à revalider, y compris dans les sections 6.1 à 6.6.
> Révision du 26 septembre 2026, à valider : textes revus selon le document « Digital Solutions - Recommandations de wording ». Les en-têtes, les boutons, plusieurs cartes et les FAQ changent, y compris dans les sections 6.1 à 6.6. Les phrases qui contenaient une valeur non confirmée (délais, pays d'hébergement, ville, garantie, durée des sauvegardes) sont retirées. La section « L'équipe » de la page L'agence, masquée jusqu'à réception des vraies informations, est de nouveau affichée depuis la réception des noms et des rôles (section 6.10).

**Appels à l'action (tout le site) : trois familles**
- **« Parler de mon projet »** : bouton principal (en-tête, accueil), pour un premier échange. Chaque page de service a sa variante : « Parler de mon futur site », « Parler de mon application », etc.
- **« Demander un devis »** : quand le besoin est déjà cadré (page Hébergement et maintenance).
- **« Faire auditer mon site »** : l'audit gratuit, l'offre d'entrée.

---

### 6.1 Page « Services » (page d'ensemble)

**URL :** `/services`
**Balise title :** Création de sites web et d'applications sur mesure | Digital Solutions
**Meta description :** Sites web, applications web et mobiles, logiciels SaaS, IA, automatisation et maintenance : des projets testés, mis en ligne et suivis par la même équipe.
**Mots-clés visés (à valider) :** agence web Fès, création site web et application, développement application sur mesure

#### En-tête

**H1 :** Un partenaire technique pour créer, connecter et faire durer vos outils numériques

**Sous-titre :** Du site vitrine au logiciel métier, nous prenons en charge la conception, le développement, les tests, la mise en ligne et le suivi.

**Boutons :** [Parler de mon projet] [Faire auditer mon site]

> Le document de recommandations propose « outils digitaux » : « numériques » est plus simple et évite le vocabulaire marketing (section 4).
> Ancien H1 : « Des sites et des applications qui fonctionnent. Aujourd'hui, et dans cinq ans. »

#### Section : nos services

**Titre :** Des solutions pour faire avancer votre activité

> Cette section aide le visiteur à choisir la bonne page : une phrase par service, sans répéter le contenu de chaque offre. Elle est reprise sur l'accueil, avec un autre titre (section 6.7).
> Titre changé le 26 septembre 2026, à valider. Ancien titre : « Ce que nous faisons pour vous ».

**Carte 1 : Sites web**
Des sites rapides et crédibles, qui facilitent la prise de contact et l'achat.
- Site vitrine
- Boutique en ligne
- Refonte de site existant
- Sites en français, arabe et anglais *(ajout à valider)*

→ [Découvrir l'offre Sites web]

**Carte 2 : Applications sur mesure**
Des outils adaptés à votre façon de travailler, et non l'inverse.
- Outils métier
- Espaces clients et portails
- Première version de votre projet d'application

→ [Découvrir l'offre Applications]

**Carte 3 : Applications mobiles** *(proposition à valider)*
Une application iPhone et Android conçue, publiée et maintenue par la même équipe.
- Applications pour vos clients
- Applications pour vos équipes
- Publication sur l'App Store et Google Play

→ [Découvrir l'offre Applications mobiles]

**Carte 4 : Logiciels SaaS** *(proposition à valider)*
Une première version prête à vendre, puis un logiciel qui évolue avec vos clients.
- Comptes clients et abonnements
- Paiement en ligne
- Première version, puis évolutions

→ [Découvrir l'offre Logiciels SaaS]

**Carte 5 : Intelligence artificielle** *(proposition à valider)*
L'IA là où elle apporte un gain concret, avec des usages encadrés et des résultats vérifiés.
- Assistants pour vos clients et vos équipes
- Traitement de documents
- Formation de vos équipes

→ [Découvrir l'offre Intelligence artificielle]

**Carte 6 : Automatisation et intégrations**
Vos outils connectés entre eux : l'information circule sans être recopiée à la main.
- Connexion de vos outils
- Automatisation des tâches
- WhatsApp connecté à vos outils *(ajout à valider)*

→ [Découvrir l'offre Automatisation]

**Carte 7 : Données et tableaux de bord** *(proposition à valider)*
Des chiffres fiables et lisibles pour piloter votre activité.
- Mesure d'audience de votre site
- Tableaux de bord de votre activité
- Rapports automatiques

→ [Découvrir l'offre Données]

**Carte 8 : Tests et sécurité** *(proposition à valider)*
Les problèmes trouvés avant vos utilisateurs, même si nous n'avons pas développé votre projet.
- Audit de sécurité
- Tests avant une mise en ligne
- Tests automatiques et tests de charge

→ [Découvrir l'offre Tests et sécurité]

**Carte 9 : Hébergement et maintenance**
Votre site disponible, sauvegardé et à jour, sans vous occuper de la technique.
- Hébergement sécurisé
- Sauvegardes et mises à jour
- Reprise de site existant

→ [Découvrir nos forfaits]

#### Section : pourquoi nous

**Titre :** Pourquoi travailler avec nous

**Des méthodes solides**
Votre projet est construit avec les méthodes des grandes entreprises, adaptées à la taille de la vôtre.

**Tout est testé avant la mise en ligne**
Chaque page, chaque formulaire et chaque paiement est vérifié sur ordinateur, tablette et mobile. Vous ne découvrez pas les bugs à la place de vos clients.

**Un seul interlocuteur**
Du premier échange à la maintenance, vous parlez aux personnes qui construisent votre projet. Pas de sous-traitance cachée.

**Vous restez propriétaire**
Votre code, votre nom de domaine et vos données vous appartiennent. Si un jour vous changez de prestataire, vous repartez avec tout.

#### Section : notre processus

**Titre :** Comment se déroule votre projet

1. **On échange.** Un appel de 30 minutes, gratuit, pour comprendre votre besoin.
2. **On vous envoie un devis clair.** Un prix fixe, des délais et la liste précise de ce qui est inclus.
3. **On développe.** Vous suivez l'avancement et validez chaque étape.
4. **On teste.** Tout est vérifié avant la mise en ligne, sur tous les écrans.
5. **On met en ligne et on reste là.** On vous forme à l'utilisation, puis on assure la maintenance si vous le souhaitez.

#### Section : pour qui (retirée)

> Section retirée du site le 26 septembre 2026, à valider : le site ne nomme pas les publics visés (section 4). Ancien texte ci-dessous.

**Titre :** Nous accompagnons

**Les particuliers et porteurs de projet**
Un site personnel, un portfolio ou la première version de votre idée d'application.

**Les TPE, artisans et indépendants**
Un site vitrine qui inspire confiance, la prise de rendez-vous ou les demandes de devis en ligne.

**Les PME**
Des outils métier sur mesure, des logiciels qui communiquent entre eux et un hébergement fiable.

#### Section : audit gratuit

**Titre :** Votre site actuel est-il lent, vulnérable ou introuvable sur Google ?

Nous analysons gratuitement sa vitesse, sa sécurité et son référencement technique. Vous recevez un rapport clair, sans jargon, avec les actions prioritaires.

**Bouton :** [Demander mon audit gratuit]

#### FAQ

**Combien coûte un site ou une application ?**
Cela dépend du projet. Après un premier échange, nous vous remettons un devis gratuit, détaillé et à prix fixe : vous savez exactement ce que vous payez avant de vous engager.

**Combien de temps faut-il ?**
Cela dépend du projet. Nous fixons le planning ensemble après le premier échange, et il figure dans le devis.

**Je n'y connais rien en informatique. Est-ce un problème ?**
Non. Nous vous expliquons chaque choix simplement, et nous vous formons à l'utilisation de votre site ou de votre outil à la livraison.

**Vous occupez-vous du design ?**
Oui. Vous validez les maquettes avant le début du développement.

> Les délais indicatifs ([2 à 4 semaines] pour un site vitrine, [4 à 8 semaines] pour une boutique en ligne) et l'option design ([designer partenaire / modèles personnalisés]) reviendront une fois confirmés.

**J'ai déjà un site ou une application. Pouvez-vous le reprendre ?**
Oui. Nous commençons par un audit pour faire le point, puis nous vous proposons un plan : corriger, améliorer ou reconstruire si c'est plus raisonnable.

#### Appel à l'action final

**Titre :** Parlons de votre projet

Un échange de 30 minutes, gratuit et sans engagement, pour comprendre votre besoin et vous dire honnêtement ce que nous pouvons faire pour vous.

**Bouton :** [Parler de mon projet]

---

### 6.2 Page « Sites web »

**URL :** `/services/sites-web`
**Balise title :** Création de site vitrine et e-commerce | Digital Solutions
**Meta description :** Site vitrine, boutique en ligne ou refonte : des sites rapides, sécurisés et prêts pour le référencement.
**Mots-clés visés (à valider) :** création site vitrine, création site internet Fès, création boutique en ligne, refonte site web

#### En-tête

**H1 :** Un site rapide, crédible et pensé pour générer des contacts

**Sous-titre :** Site vitrine, boutique en ligne ou refonte : nous créons un site adapté au mobile, simple à modifier vous-même et techniquement prêt pour le référencement.

**Bouton :** [Parler de mon futur site]

> Ancien H1 : « Un site web rapide, sécurisé et facile à trouver sur Google ». Le document de recommandations demande une promesse de référencement technique solide, sans garantie de position.

#### Section : le problème

**Titre :** Votre site vous fait perdre des clients ?

- Il met plusieurs secondes à s'afficher, et les visiteurs partent avant de le voir.
- Il s'affiche mal sur téléphone.
- Personne ne le trouve sur Google.
- Chaque modification passe par un prestataire qui ne répond plus.

#### Section : nos offres

**Titre :** Trois façons de lancer ou de relancer votre présence en ligne

**Site vitrine**
Pour présenter clairement votre activité et vos réalisations, et être contacté facilement.
*Idéal pour :* artisans, indépendants.
- Formulaire de contact
- Prise de rendez-vous en ligne (en option)
- Liens vers vos réseaux sociaux et votre fiche Google

**Boutique en ligne**
Pour vendre en ligne, avec un parcours d'achat simple, des paiements sécurisés et une gestion adaptée à votre activité.
*Idéal pour :* commerçants, créateurs.
- Paiement sécurisé (carte bancaire via le CMI, paiement à la livraison…) *(modifié pour le Maroc, à valider)*
- Gestion des stocks et des commandes
- Frais de livraison et factures automatiques
- Shopify, WooCommerce ou sur mesure, selon votre volume de ventes

**Refonte de site**
Pour moderniser votre site sans perdre ce qui fonctionne : contenus, redirections, vitesse et affichage mobile sont traités dès le départ.
*Idéal pour :* tout site vieillissant ou qui ne vous apporte plus de contacts.
- Reprise de vos contenus
- Redirections des anciennes pages pour conserver votre référencement
- Nouveau design, plus rapide et adapté au mobile

**Sous les offres :** Chaque projet fait l'objet d'un devis gratuit et détaillé, à prix fixe.

#### Section : inclus dans chaque site

**Titre :** Inclus dans tous nos sites

**Surtitre :** Sans supplément *(design du 26 septembre 2026 : le surtitre reprend la fin de l'ancien titre « Inclus dans tous nos sites, sans supplément »)*

- **Adapté à tous les écrans** : ordinateur, tablette et téléphone.
- **Rapide** : nous mesurons la vitesse de chaque page avant la livraison.
- **Référencement technique** : structure des pages, balises, plan du site et données structurées pour que Google comprenne votre activité.
- **Sécurisé** : connexion HTTPS, protections contre le spam et les attaques courantes.
- **Conforme à la loi 09-08** : données personnelles protégées, bandeau cookies et pages légales mises en place.
- **Accessible** : lisible par tous, y compris par les personnes en situation de handicap.
- **Modifiable par vous** : un espace d'administration simple pour changer vos textes et vos images.
- **Formation incluse** : nous vous montrons comment gérer votre site.

#### Section : options *(ajout à valider)*

**Titre :** Les options

**Un site en plusieurs langues**
Français, arabe, anglais : chaque visiteur lit votre site dans sa langue. La version arabe s'affiche de droite à gauche, avec une mise en page adaptée. Chaque langue a ses propres pages, que Google peut référencer. Vous nous fournissez les textes traduits. Si besoin, nous vous mettons en relation avec un traducteur.

**WhatsApp sur votre site**
Un bouton pour vous écrire sur WhatsApp en un clic. Nous pouvons aussi relier WhatsApp à vos outils et envoyer des messages automatiques.

→ [Voir l'offre Automatisation]

#### Section : notre différence

**Titre :** Testé avant la mise en ligne. Vraiment.

Avant de livrer votre site, nous vérifions chaque page sur les principaux navigateurs et tailles d'écran. Nous testons chaque formulaire, chaque lien et chaque paiement. Vous ne découvrez pas les problèmes par un client mécontent.

#### Section : design

**Titre :** Un site à votre image

Vous validez les maquettes avant le début du développement : pas de mauvaise surprise à la livraison.

Vous n'avez pas encore de logo ? Nous pouvons vous mettre en relation avec un graphiste partenaire.

#### FAQ

**Pourrai-je modifier mon site moi-même ?**
Oui. Vous disposez d'un espace d'administration pour changer vos textes, vos images et ajouter des pages ou des articles. Nous vous formons à son utilisation à la livraison.

**Vous occupez-vous des textes et des photos ?**
Pas directement. Vous nous fournissez vos textes et vos photos, et nous vous aidons à les organiser. Si vous préférez déléguer, nous pouvons vous mettre en relation avec un rédacteur ou un photographe partenaire.

**Mon site sera-t-il bien référencé sur Google ?**
Il sera techniquement prêt. Nous nous occupons de toute la partie technique du référencement : vitesse, structure, balises, compatibilité mobile. Votre position dans Google dépend aussi de vos contenus et de la concurrence dans votre secteur : personne ne peut honnêtement vous garantir la première place.

**WordPress ou développement sur mesure ?**
Cela dépend de votre besoin. WordPress convient très bien à la plupart des sites vitrines. Le sur-mesure devient intéressant quand vous avez des fonctionnalités spécifiques ou de gros volumes.

**Combien de temps faut-il pour créer mon site ?**
Cela dépend du site et de la rapidité à laquelle nous recevons vos contenus. Nous fixons le planning ensemble, et il figure dans le devis.

**Que se passe-t-il après la mise en ligne ?**
Votre site vous appartient. Vous pouvez le gérer seul, ou nous confier son hébergement et sa maintenance avec l'un de nos [forfaits mensuels](#65-page--hébergement-et-maintenance-).

#### Appel à l'action final

**Titre :** Parlons de votre futur site

Décrivez-nous votre projet en quelques lignes. Nous revenons vers vous avec les prochaines étapes.

**Bouton :** [Parler de mon futur site]

> « Une première estimation » est retiré : le document de recommandations demande de ne pas la promettre tant que le processus interne ne permet pas de la fournir à chaque demande.

---

### 6.3 Page « Applications sur mesure »

**URL :** `/services/applications-sur-mesure`
**Balise title :** Applications web et mobiles sur mesure | Digital Solutions
**Meta description :** Outil métier, espace client, application mobile ou première version de votre projet : nous développons des applications sur mesure, testées et faites pour évoluer.
**Mots-clés visés (à valider) :** développement application sur mesure, logiciel sur mesure, création application mobile, développement MVP

#### En-tête

**H1 :** Un logiciel qui s'adapte à votre métier

**Sous-titre :** Réservation, devis, planning, espace client ou outil interne : nous développons les fonctions dont vous avez réellement besoin, puis nous les faisons évoluer avec vous.

**Bouton :** [Parler de mon projet]

> Ancien H1 : « Un outil conçu pour votre façon de travailler ».

#### Section : le problème

**Titre :** Vos outils actuels vous ralentissent ?

- Tout est géré dans des tableurs, avec des erreurs de copie.
- Vous payez plusieurs logiciels qui ne font qu'à moitié ce que vous voulez.
- Vos clients vous appellent pour des informations qu'ils pourraient trouver en ligne.
- Vous avez une idée d'application, mais vous ne savez pas par où commencer.

#### Section : ce que nous développons

**Titre :** Ce que nous pouvons construire pour vous

**Outils métier**
Prise de rendez-vous, devis et factures, gestion de stock, planning d'équipe : réunissez dans un seul outil ce qui est aujourd'hui dispersé entre tableurs, e-mails et logiciels mal adaptés.

**Première version de votre projet (MVP)**
Vous avez une idée d'application ? Lancez une première version utile, testez-la avec de vrais utilisateurs, puis investissez dans ce qui fonctionne.

**Espaces clients et portails**
Vos clients consultent leurs demandes, leurs documents et leur suivi en ligne, sans vous appeler.

> La carte « Applications mobiles » est retirée : l'offre a sa propre page (lien sous les cartes). La première version (MVP) passe en deuxième position pour rassurer sur le budget et le risque.

**Liens sous les cartes** *(ajout à valider)* : → [Voir l'offre Applications mobiles] → [Vous voulez vendre votre logiciel par abonnement ? Voir l'offre Logiciels SaaS]

#### Section : notre différence

**Titre :** Une application solide, pas un prototype fragile

**Pensée pour évoluer**
Nous concevons votre application pour que l'on puisse ajouter des fonctionnalités dans deux ans sans tout reconstruire.

**Testée automatiquement**
Chaque nouvelle version est vérifiée par des tests automatiques. Une amélioration ne casse pas ce qui fonctionnait déjà.

**Vos données protégées**
Sauvegardes quotidiennes et accès sécurisés.

**Un code qui vous appartient**
Le code est documenté et vous appartient. Vous restez libre de changer de prestataire si vous le souhaitez.

#### Section : processus

**Titre :** Comment nous travaillons

1. **Atelier de cadrage.** Nous listons ensemble les fonctionnalités et nous gardons l'essentiel pour la première version.
2. **Maquettes.** Vous voyez les écrans de votre application avant qu'une seule ligne de code soit écrite.
3. **Développement par étapes.** Une nouvelle version à tester régulièrement. Vous suivez l'avancement concrètement.
4. **Tests.** Tests automatiques et vérifications manuelles avant chaque mise en ligne.
5. **Mise en ligne et suivi.** Nous formons vos équipes, puis nous assurons la maintenance et les évolutions.

#### Encadré : porteurs de projet

**Titre :** Vous avez une idée d'application ? Commencez petit.

Plutôt que de tout développer d'un coup, nous construisons d'abord une version simple, avec les fonctionnalités essentielles. Vous la testez auprès de vrais utilisateurs, puis vous décidez de la suite en connaissance de cause. Vous dépensez moins, et vous apprenez plus vite.

**Bouton :** [Parler de mon idée]

#### FAQ

**Combien coûte une application sur mesure ?**
Cela dépend des fonctionnalités. Après l'atelier de cadrage, nous vous remettons un devis gratuit, à prix fixe.

**Combien de temps faut-il ?**
Cela dépend des fonctionnalités. Nous fixons le planning ensemble après le cadrage, et il figure dans le devis.

**Mon idée sera-t-elle protégée ?**
Oui. Nous pouvons signer un accord de confidentialité avant d'entrer dans les détails de votre projet.

**Serai-je propriétaire du code ?**
Oui. La cession des droits sur le code est prévue dans le contrat.

**J'ai déjà une application développée par un autre prestataire. Pouvez-vous la reprendre ?**
Oui. Nous commençons par un audit du code pour faire le point, puis nous vous proposons un plan : corriger, faire évoluer ou reconstruire certaines parties.

#### Appel à l'action final

**Titre :** Parlons de votre projet

Un échange de 30 minutes, gratuit et confidentiel, pour comprendre votre besoin et vous dire ce qui est réaliste, dans quel délai et pour quel budget.

**Bouton :** [Parler de mon projet]

---

### 6.4 Page « Automatisation et intégrations »

**URL :** `/services/automatisation-integrations`
**Balise title :** Automatisation et connexion de vos logiciels | Digital Solutions
**Meta description :** Connectez votre site, votre CRM et votre comptabilité. Automatisez les tâches répétitives et utilisez l'IA là où elle vous fait vraiment gagner du temps.
**Mots-clés visés (à valider) :** automatisation tâches entreprise, intégration logiciels, automatisation n8n, chatbot site web

#### En-tête

**H1 :** Faites circuler l'information sans la recopier

**Sous-titre :** Nous connectons vos outils et automatisons les tâches répétitives pour réduire la saisie manuelle, les oublis et les erreurs.

**Bouton :** [Parler de mes tâches répétitives]

> Ancien H1 : « Moins de saisie, moins d'erreurs, plus de temps pour votre métier ». Le bénéfice « ne plus recopier » parle plus que le nom des outils : n8n, Make et Zapier restent une preuve secondaire.

#### Section : le problème

**Titre :** Ça vous parle ?

- Vous recopiez les commandes du site dans votre logiciel de facturation.
- Vous envoyez les mêmes e-mails de relance à la main.
- Les informations clients sont éparpillées entre votre boîte mail, un tableur et votre CRM.
- Chaque semaine, vous exportez un fichier d'un outil pour l'importer dans un autre.

#### Section : ce que nous faisons

**Titre :** Trois façons de vous faire gagner du temps

**Connecter vos outils**
Site web, boutique, CRM, comptabilité, agenda, e-mailing : nous les relions pour éviter les doubles saisies. Chaque commande crée automatiquement sa facture, et chaque demande de contact arrive directement dans votre CRM.

**Automatiser les tâches répétitives**
Relances, notifications, rapports, mise à jour des stocks : chaque tâche part au bon moment, sans action de votre part. Selon le besoin, nous utilisons des outils éprouvés (n8n, Make, Zapier) ou un développement sur mesure.

**Intégrer l'IA, là où elle est utile**
Un assistant sur votre site qui répond aux questions fréquentes, le tri automatique de vos documents, l'extraction des informations de vos factures. Nous n'intégrons l'IA que là où elle vous fait vraiment gagner du temps, et nous vous expliquons où vont vos données.

**Lien sous les cartes** *(ajout à valider)* : → [Découvrir l'offre Intelligence artificielle]

#### Section : exemples

**Titre :** Quelques exemples concrets

**Pour un artisan :** une demande de devis arrive sur le site → la fiche client est créée → un devis prérempli est prêt à envoyer → une relance part automatiquement sans réponse sous 7 jours.

**Pour une boutique en ligne :** une commande est passée → la facture est créée dans le logiciel de comptabilité → le stock est mis à jour → le client reçoit son e-mail de suivi.

**Pour un cabinet ou un bureau :** les documents reçus par e-mail sont classés automatiquement dans le bon dossier client.

#### Section : WhatsApp *(ajout à valider)*

**Titre :** WhatsApp, connecté à vos outils

Vos clients vous écrivent déjà sur WhatsApp. Nous connectons WhatsApp Business à votre site et à vos outils, pour répondre plus vite sans rien perdre.

**Un bouton WhatsApp sur votre site**
Vos visiteurs vous écrivent en un clic, depuis leur téléphone ou leur ordinateur.

**Des messages automatiques**
Confirmation de commande, rappel de rendez-vous, suivi de livraison : le message part tout seul, au bon moment.

**Vos conversations dans vos outils**
Chaque demande reçue sur WhatsApp arrive dans votre CRM. Votre équipe voit l'historique de chaque client.

#### Section : notre différence

**Titre :** Des automatisations fiables, pas du bricolage

Une automatisation qui tombe en panne sans que personne ne le remarque peut faire plus de dégâts que pas d'automatisation du tout. Nous testons chaque scénario avant la mise en service, nous surveillons son fonctionnement et nous sommes alertés en cas d'erreur. Tout est documenté : vous savez ce qui tourne et pourquoi.

#### Section : processus

1. **Diagnostic.** Nous regardons avec vous les tâches qui vous prennent du temps et nous estimons le temps que vous pouvez gagner.
2. **Proposition.** Nous classons les automatisations par gain de temps et vous choisissez les priorités.
3. **Mise en place et tests.** Nous construisons chaque automatisation et la testons avec des cas réels.
4. **Suivi.** Nous surveillons le bon fonctionnement et nous adaptons les automatisations quand vos outils changent.

#### FAQ

**Quels logiciels pouvez-vous connecter ?**
La plupart des logiciels récents peuvent être connectés : CRM, comptabilité, boutique en ligne, agenda, e-mailing. Dites-nous lesquels vous utilisez, nous vérifions pour vous.

**Dois-je changer mes outils ?**
Non. Nous partons de ceux que vous utilisez déjà.

**Que se passe-t-il si une automatisation tombe en panne ?**
Nous sommes alertés et nous intervenons. Avec un forfait de maintenance, la correction est incluse.

**Faut-il un compte WhatsApp particulier ?** *(ajout à valider)*
Pour les messages automatiques, oui : un compte WhatsApp Business relié à la plateforme officielle de Meta. Nous le créons avec vous. Meta facture certains messages : nous estimons ce coût avec vous avant de commencer.

**Puis-je envoyer des promotions sur WhatsApp ?** *(ajout à valider)*
Seulement aux clients qui ont donné leur accord. Nous prévoyons la demande d'accord et la possibilité de se désinscrire.

**Mes données sont-elles en sécurité avec l'IA ?**
Cela dépend du service d'IA choisi. Avant de commencer, nous vous disons quel service traite vos données, dans quel pays, et s'il peut les utiliser pour entraîner ses modèles. Vous décidez en connaissance de cause.

> Pas de promesse générale sur la confidentialité d'un fournisseur d'IA tant que les fournisseurs et les contrats ne sont pas choisis (section 8).

**Combien ça coûte ?**
Cela dépend de la tâche à automatiser. Avant de commencer, nous estimons avec vous le temps gagné, puis nous vous remettons un devis gratuit, à prix fixe. Vous décidez en connaissance de cause.

#### Appel à l'action final

**Titre :** Quelles tâches pourriez-vous ne plus jamais faire ?

Listez-nous les tâches répétitives qui vous prennent du temps. Nous vous disons gratuitement ce qui peut être automatisé.

**Bouton :** [Parler de mes tâches répétitives]

---

### 6.5 Page « Hébergement et maintenance »

**URL :** `/services/hebergement-maintenance`
**Balise title :** Hébergement et maintenance de site web | Digital Solutions
**Meta description :** Hébergement sécurisé, sauvegardes, mises à jour et support : nous gardons votre site et vos applications en ligne, rapides et protégés. Forfaits mensuels.
**Mots-clés visés (à valider) :** maintenance site web, hébergement site internet, maintenance WordPress, reprise site web

#### En-tête

**H1 :** Votre site reste disponible, sauvegardé et à jour

**Sous-titre :** Nous gérons l'hébergement, les sauvegardes, la surveillance et les mises à jour, pour que vous n'ayez pas à vous occuper de la technique au quotidien.

**Boutons :** [Voir les forfaits] [Demander un devis]

> Ancien H1 : « Votre site toujours en ligne. Vous n'avez plus à y penser. » « Toujours en ligne » est une promesse absolue.

#### Section : le problème

**Titre :** Pourquoi un site a besoin de maintenance

- Les extensions et logiciels non mis à jour sont l'une des principales portes d'entrée des pirates.
- Un site en panne un week-end, ce sont des clients perdus sans que vous le sachiez.
- Sans sauvegarde, une erreur ou une attaque peut tout effacer.

#### Section : ce qui est inclus

**Titre :** Tout ce dont votre site a besoin

**Hébergement géré**
Un hébergement sécurisé, configuré et suivi, avec connexion HTTPS, nom de domaine et e-mails professionnels.

**Sauvegardes vérifiées**
Des sauvegardes automatiques, dont nous testons régulièrement la restauration : une sauvegarde jamais testée n'est pas une vraie sauvegarde.

**Surveillance 24 h/24**
Si votre site ne répond plus, nous sommes alertés immédiatement. Nous intervenons selon votre forfait.

**Mises à jour de sécurité testées**
Nous appliquons les mises à jour après avoir vérifié qu'elles ne cassent rien.

**Petites modifications**
Un texte à changer, une image à remplacer, une page à ajouter : envoyez-nous un message. Le volume inclus dépend de votre forfait.

**Rapport mensuel**
Chaque mois, un résumé clair : disponibilité du site, sauvegardes réalisées, mises à jour effectuées.

#### Section : forfaits

**Titre :** Choisissez votre forfait

| | **Essentiel** | **Sérénité** *(recommandé)* | **Pro** |
|---|---|---|---|
| **Pour qui** | Sites vitrines | Boutiques en ligne | Applications, sites critiques |
| Hébergement + HTTPS | ✓ | ✓ | ✓ |
| Sauvegardes | Hebdomadaires | Quotidiennes | Quotidiennes + copie externe |
| Surveillance 24 h/24 | ✓ | ✓ | ✓ |
| Mises à jour de sécurité | ✓ | ✓ | ✓ |
| Petites modifications | — | ✓ | ✓ |
| Rapport mensuel | — | ✓ | ✓ |

Le prix de chaque forfait dépend de votre site : il figure dans votre devis gratuit, avec le volume de modifications inclus.

> Valeurs retirées du site tant qu'elles ne sont pas confirmées : durée de conservation des sauvegardes ([30] jours), pays des serveurs, volume de modifications ([1 h/mois], [3 h/mois]), délais d'intervention ([48 h], [24 h], [4 h] ouvrées) et durée d'engagement ([Sans engagement / Engagement de 12 mois]).

**Bouton :** [Choisir mon forfait]

#### Section : reprise de site existant

**Titre :** Votre prestataire a disparu ? Votre site est cassé ?

Nous reprenons les sites et applications développés par d'autres. Nous commençons par un audit : état du code, sécurité, sauvegardes, accès. Ensuite, nous vous proposons un plan clair : corriger, stabiliser, ou reconstruire si c'est plus raisonnable.

**Bouton :** [Faire auditer mon site]

#### FAQ

**Pouvez-vous héberger un site que vous n'avez pas créé ?**
Oui. Nous faisons d'abord un audit pour vérifier son état, puis nous le migrons sur nos serveurs sans interruption de service.

**Que se passe-t-il si mon site est piraté ?**
Nous le restaurons à partir de la dernière sauvegarde saine, nous corrigeons la faille et nous renforçons la sécurité.

**À qui appartient mon nom de domaine ?**
À vous. Il est enregistré à votre nom.

**Puis-je partir si je change d'avis ?**
Oui. Nous vous remettons votre site complet, votre code et vos données.

#### Appel à l'action final

**Titre :** Confiez-nous la technique

Votre site est entre de bonnes mains, et vous pouvez vous concentrer sur votre activité.

**Bouton :** [Choisir mon forfait]

---

### 6.6 Page « Audit gratuit »

**URL :** `/audit-gratuit`
**Balise title :** Audit gratuit de votre site web | Digital Solutions
**Meta description :** Vitesse, sécurité, référencement, affichage mobile : recevez gratuitement un audit technique de votre site, avec un rapport clair et les actions prioritaires.

#### En-tête

**H1 :** Obtenez un diagnostic clair de votre site

**Sous-titre :** Nous vérifions gratuitement les principaux points techniques qui peuvent freiner votre site : vitesse, sécurité de base, référencement technique et affichage mobile.

> Ancien H1 : « Votre site est-il lent, vulnérable ou invisible sur Google ? » (la question reste le titre de l'encadré audit, section 6.1).

**Bouton :** [Demander mon audit] : il mène au formulaire, plus bas dans la page *(ajout du design du 26 septembre 2026)*.

#### Section : ce que nous vérifions

- **Vitesse** : combien de temps vos pages mettent à s'afficher, et ce qui les ralentit.
- **Sécurité de base** : certificat HTTPS, mises à jour et failles visibles de l'extérieur.
- **Référencement technique** : ce qui empêche Google de bien comprendre votre site.
- **Affichage mobile** : comment vos visiteurs voient et utilisent votre site sur téléphone.

#### Section : ce que vous recevez

- Un rapport écrit, sans jargon
- Les problèmes classés par priorité : ce qui est urgent, ce qui peut attendre
- Les actions recommandées pour chaque problème

> Retirés tant qu'ils ne sont pas confirmés : le délai du rapport ([5 jours ouvrés]) et l'appel d'explication ([20 minutes]).

#### Section : ce que l'audit gratuit ne couvre pas

L'audit gratuit regarde votre site de l'extérieur, sans accès au code ni au serveur. Il ne remplace pas un audit de sécurité complet. Les corrections ne sont pas incluses : vous les faites avec votre prestataire, ou nous vous proposons un devis.

→ [Voir l'offre Tests et sécurité]

#### Formulaire

- Adresse de votre site *(obligatoire)*
- Nom *(obligatoire)*
- E-mail *(obligatoire)*
- Téléphone *(facultatif)*
- Votre principale préoccupation : Vitesse / Sécurité / Référencement / Je ne sais pas
- Case de consentement (loi 09-08) + lien vers la politique de confidentialité

**Bouton :** [Recevoir mon audit gratuit]

**Réassurance sous le bouton :** Gratuit, sans engagement et sans relances insistantes.

---

### 6.7 Page « Accueil »

> Proposition à valider. Elle reprend la promesse (section 4) et plusieurs blocs de la page Services (section 6.1).

**URL :** `/`
**Balise title :** Sites web et applications sur mesure | Digital Solutions
**Meta description :** Nous créons, testons, hébergeons et maintenons vos sites et vos applications. Un interlocuteur direct, un devis à prix fixe et un suivi après la mise en ligne.
**Mots-clés visés (à valider) :** agence web Fès, création site internet, application sur mesure

#### En-tête

**H1 :** Des sites et des applications fiables, suivis dans la durée

**Sous-titre :** Sites web, applications et automatisations : nous concevons des outils rapides, sécurisés et faciles à faire évoluer. Et nous restons disponibles après la mise en ligne.

**Boutons :** [Parler de mon projet] [Faire auditer mon site]

> Le document de recommandations propose « Des solutions digitales fiables, conçues par des ingénieurs ». Décision du 26 septembre 2026 : pas de mot « ingénieurs » sur le site ; « sites et applications » est plus concret que « solutions digitales ».

#### Section : ce que vous y gagnez

**Titre :** Ce que vous y gagnez

Un projet qui fonctionne dès le lancement, qui reste facile à faire évoluer et qui ne vous rend pas dépendant d'un prestataire.

**Surveillé et sauvegardé**
Hébergement surveillé, sauvegardes et maintenance pour limiter les interruptions.

**Testé avant la mise en ligne**
Pages, formulaires, parcours et affichage sur mobile sont vérifiés avant la mise en ligne.

**Conçu pour évoluer**
Une base technique propre pour ajouter des fonctionnalités sans repartir de zéro.

**Un interlocuteur direct**
Vous échangez avec l'équipe qui conçoit et développe votre projet.

> Le document de recommandations propose le titre « Toujours disponible » : c'est une promesse absolue, que le texte de la carte ne tient pas (« pour limiter les interruptions »). Le titre devient « Surveillé et sauvegardé ».

#### Section : nos services

**Titre :** Des solutions digitales qui répondent à vos enjeux

Reprend les cartes de la section « Des solutions pour faire avancer votre activité » de la page Services (6.1).

> Titre changé le 26 septembre 2026, à valider. Ancien titre : « Ce que nous faisons pour vous ».

#### Section : pour qui (retirée)

Retirée le 26 septembre 2026, comme sur la page Services (6.1).

#### Section : processus en bref

**Titre :** Un projet en cinq étapes claires

Reprend les cinq étapes de la page Services (6.1).

**Lien :** [Découvrir notre processus]

#### Section : audit gratuit

Reprend la section « audit gratuit » de la page Services (6.1).

#### Section : nos engagements

**Titre :** Nos engagements

- Vous restez propriétaire de votre code, de votre nom de domaine et de vos données.
- Un périmètre, un prix fixe et un planning écrits avant de commencer.
- Des tests avant chaque mise en ligne.

> Ces engagements sont encore à confirmer (section 4). La réponse sous [48 h ouvrées] et l'hébergement en [pays à définir] sont retirés tant qu'ils ne sont pas confirmés.

#### Appel à l'action final

Reprend l'appel à l'action final de la page Services (6.1).

---

### 6.8 Page « Processus »

> Proposition à valider. Le brief demande une étape de tests bien visible sur cette page (section 5).
> Page renommée le 26 septembre 2026, à valider. Ancien nom : « Méthode », à l'adresse `/methode`. Les surtitres des sections sur les étapes (accueil, Services, pages de services) passent aussi de « Méthode » à « Processus ».

**URL :** `/processus`
**Balise title :** Notre processus : un projet clair, testé et suivi | Digital Solutions
**Meta description :** Échange gratuit, devis à prix fixe, maquettes, développement par étapes, tests complets et suivi après la mise en ligne : découvrez comment se déroule votre projet.

#### En-tête

**H1 :** Un projet clair, avec des validations à chaque étape

**Sous-titre :** Vous savez ce qui est prévu, ce que vous devez valider et ce que vous recevez. Les tests sont intégrés au projet, pas ajoutés à la fin.

#### Section : les étapes

**Titre :** Les étapes de votre projet

> Ce que vous recevez à chaque étape s'affiche dans un petit encadré, comme preuve de ce qui est livré.

1. **Un premier échange, gratuit.** Un appel de 30 minutes pour comprendre votre activité, votre besoin, vos contraintes et ce qui mérite vraiment d'être développé. Nous vous disons honnêtement si nous sommes la bonne équipe pour votre projet.
   *Vous recevez :* un premier avis sur votre projet.
2. **Un devis clair, à prix fixe.** Nous détaillons ce qui est inclus, le prix et les délais. Vous savez exactement ce que vous payez avant de vous engager.
   *Vous recevez :* un devis écrit, avec la liste précise de ce qui est livré.
3. **Les maquettes.** Vous voyez les écrans de votre site ou de votre application avant le début du développement. Vous demandez les modifications nécessaires, puis vous validez.
   *Vous recevez :* les maquettes à valider.
4. **Le développement, par étapes.** Nous construisons votre projet par petites étapes. Vous suivez l'avancement et vous validez chaque étape : vous n'attendez pas la livraison finale pour voir le résultat.
   *Vous recevez :* l'accès à une version de test, mise à jour régulièrement.
5. **Les tests.** Avant chaque mise en ligne, nous vérifions :
   - chaque page, sur ordinateur, tablette et mobile, dans les principaux navigateurs ;
   - chaque formulaire, chaque lien et chaque paiement ;
   - la vitesse d'affichage de chaque page ;
   - l'accessibilité, pour que tous vos visiteurs puissent utiliser votre site ;
   - la sécurité : connexion HTTPS, protections contre le spam et les attaques courantes.

   Pour les applications, des tests automatiques vérifient chaque nouvelle version : une amélioration ne casse pas ce qui fonctionnait déjà.
   *Vous recevez :* un site ou une application vérifiés, prêts à être mis en ligne.
6. **La mise en ligne et la formation.** Nous mettons votre projet en ligne, nous vous transmettons tous les accès, puis nous vous montrons comment l'utiliser et le modifier vous-même.
   *Vous recevez :* l'accès complet à votre site, à votre code et à vos données.
7. **Le suivi.** Si vous le souhaitez, nous hébergeons et maintenons votre projet avec un forfait mensuel : sauvegardes, mises à jour de sécurité, surveillance et petites modifications.
   *Vous recevez :* selon votre forfait, un rapport mensuel clair.

#### Section : pourquoi les tests

**Titre :** Pourquoi les tests comptent autant

Un bug découvert par un client coûte plus cher qu'un bug trouvé avant la mise en ligne : une vente perdue, une demande de contact jamais reçue, une image dégradée. C'est pourquoi les tests font partie de chaque projet et de chaque mise à jour.

#### Section : votre rôle

**Titre :** Ce dont nous avons besoin de votre part

- Vos textes et vos photos. Si vous préférez déléguer, nous vous mettons en relation avec un rédacteur ou un photographe partenaire.
- Vos accès : nom de domaine, hébergement actuel, outils à connecter.
- Un interlocuteur disponible pour valider chaque étape.

#### FAQ

**Combien de temps dure un projet ?**
Cela dépend du projet. Nous fixons le planning ensemble après le premier échange, et il figure dans le devis.

**Puis-je demander des changements en cours de projet ?**
Oui. Nous estimons l'effet sur le prix et sur le délai, puis vous décidez. Rien n'est ajouté à la facture sans votre accord.

**Que se passe-t-il si un problème apparaît après la mise en ligne ?**
Nous le corrigeons s'il est lié à notre travail, dans les conditions prévues au devis. Avec un forfait de maintenance, nous surveillons votre site et nous intervenons rapidement.

> La durée de la garantie ([pendant X mois après la livraison]) reste à définir dans les CGV.

#### Appel à l'action final

Reprend l'appel à l'action final de la page Services (6.1).

---

### 6.9 Page « Tarifs » (supprimée)

> Page supprimée le 25 septembre 2026 : aucun prix n'est affiché sur le site. Chaque prix est donné dans un devis.
> Les informations utiles restent ailleurs : devis gratuit à prix fixe (Processus, 6.8), forfaits de maintenance sans prix (6.5), modalités de paiement et droit de rétractation (CGV).

---

### 6.10 Page « L'agence »

> Proposition à valider. Aucune information sur l'équipe n'est inventée. Le document de recommandations demande une page plus humaine : vraie histoire, ville ou région, noms, rôles et photos. Les noms et les rôles sont reçus le 26 septembre 2026 : la section « L'équipe » est de nouveau affichée. L'histoire, la ville et les photos restent à fournir.

**URL :** `/agence`
**Balise title :** L'agence : une équipe technique à votre service | Digital Solutions
**Meta description :** Une équipe qui conçoit, teste, héberge et maintient des sites et des applications, avec un interlocuteur direct.

#### En-tête

**H1 :** Une équipe accessible, du premier échange au suivi

**Sous-titre :** Nous concevons des sites et des applications solides, avec un interlocuteur direct et une responsabilité claire sur la qualité technique. Nous sommes basés à Fès.

> Ancien H1 : « Une équipe d'ingénieurs, à la taille de votre projet ». La ville est revenue dans le sous-titre le 26 septembre 2026, avec l'adresse de l'agence.

#### Section : pourquoi nous avons créé l'agence

**Titre :** Pourquoi Digital Solutions existe

Beaucoup d'entreprises ont vécu la même situation : un site livré sans tests, un prestataire qui ne répond plus, un site piraté faute de mises à jour. Nous avons créé Digital Solutions pour proposer autre chose : des projets construits avec méthode, testés, et un suivi dans la durée.

> À ajouter quand elle sera rédigée : l'histoire de l'agence, en quelques phrases.

#### Section : nos compétences, en clair

**Titre :** Ce que nous savons faire, en clair

- **Concevoir des outils solides**, qui évoluent avec votre activité.
- **Prendre en charge tout votre projet**, de l'écran au serveur : vous avez un seul interlocuteur.
- **Garder votre site en ligne**, rapide et sauvegardé.
- **Tout tester** avant chaque mise en ligne.

#### Section : nos valeurs

**Titre :** Nos valeurs

**Fiabilité**
Nous livrons ce que nous avons vérifié.

**Transparence**
Un périmètre, un prix fixe et des choix expliqués clairement, sans jargon.

**Honnêteté**
Nous vous disons quand un projet n'est pas raisonnable. Nous ne promettons jamais de résultat que nous ne maîtrisons pas.

**Continuité**
Nous pouvons rester responsables de l'hébergement, de la maintenance et des évolutions.

**Indépendance**
Votre code, vos comptes, votre nom de domaine et vos données restent à votre nom.

#### Section : l'équipe

**Titre :** L'équipe

Une carte par personne : initiales, nom, rôle et une phrase qui relie la personne aux services.

**Hamza Legdani**, Architecte web et logiciels
Conçoit vos sites web, vos applications sur mesure et vos logiciels SaaS, puis les garde en ligne.

**Mohammed Reda Benaghmouch**, Expert qualité et tests
Teste chaque site et chaque application avant la mise en ligne, et vérifie leur sécurité.

**Saad Berrada**, Architecte mobile et IA
Conçoit vos applications mobiles, vos automatisations, vos tableaux de bord et vos outils d'intelligence artificielle.

> Noms et domaines de compétence donnés par l'agence le 26 septembre 2026 (ingénierie logicielle pour Hamza Legdani et Saad Berrada, QA pour Mohammed Reda Benaghmouch). Les titres traduisent ces domaines en mots compris des clients, d'après les services de chacun : pas de mot « ingénieur » ni « QA » (section 4), et pas « développeur » : l'agence conçoit toute la solution, pas seulement le code (demande du 26 septembre 2026). Ordre des cartes demandé par l'agence : Mohammed Reda Benaghmouch entre Hamza Legdani et Saad Berrada. Phrases de présentation et répartition des services entre Hamza Legdani et Saad Berrada : proposition à valider. Les initiales remplacent les photos jusqu'à leur réception.

#### Section : partenaires

**Titre :** Nos partenaires

Pour le design, le logo et la rédaction, nous travaillons avec des indépendants de confiance. Le développement, lui, n'est jamais sous-traité.

> Les noms des partenaires ([graphiste partenaire], [rédacteur partenaire]) seront ajoutés une fois choisis (section 8).

#### Appel à l'action final

Reprend l'appel à l'action final de la page Services (6.1). Le document de recommandations propose le bouton « Rencontrer l'équipe » : il reste « Parler de mon projet », car une rencontre n'est pas une offre confirmée.

---

### 6.11 Page « Contact »

> Proposition à valider. Le formulaire est déjà en place.

**URL :** `/contact`
**Balise title :** Contact et demande de devis gratuit | Digital Solutions
**Meta description :** Décrivez votre projet en quelques lignes : nous revenons vers vous avec les prochaines étapes. Échange gratuit et sans engagement.

#### En-tête

**H1 :** Parlons de votre projet

Expliquez-nous votre besoin en quelques lignes. Nous vous répondons avec les prochaines étapes et, lorsque c'est possible, une première orientation sur le périmètre.

#### Formulaire

- Nom *(obligatoire)*
- E-mail *(obligatoire)*
- Téléphone *(facultatif)*
- Votre projet : Site web / Application sur mesure / Application mobile / Logiciel SaaS / Intelligence artificielle / Automatisation et intégrations / Données et tableaux de bord / Tests et sécurité / Hébergement et maintenance / Autre *(facultatif)*. Un choix par pôle de services (ajout du 26 septembre 2026).
- Votre message *(obligatoire)*, avec l'aide : « Quelques lignes suffisent : objectif, utilisateurs, fonctionnalités importantes et délai souhaité. »
- Case de consentement (loi 09-08) + lien vers la politique de confidentialité

**Bouton :** [Envoyer ma demande]

**Réassurance sous le bouton :** Gratuit et sans engagement. Vos informations servent uniquement à traiter votre demande. Pas de relance commerciale insistante.

**Message après l'envoi :** Nous revenons vers vous avec les prochaines étapes.

#### Section : et ensuite

**Titre :** Et ensuite ?

1. Nous étudions votre demande.
2. Si nécessaire, nous organisons un appel gratuit pour mieux comprendre votre besoin.
3. Vous recevez un devis clair, à prix fixe, sans engagement.

#### Section : autres moyens

**Titre :** Autres moyens de nous joindre

- E-mail : contact@digital-solutions.ma
- Téléphone : +212 6 10 73 23 77
- WhatsApp : lien « Nous écrire sur WhatsApp » *(ajout du 26 septembre 2026, à valider)*
- Adresse : N° 7, rue Tantane, 30000 Fès

> WhatsApp : compte WhatsApp Business de l'agence (application gratuite), sur le même numéro que le téléphone, partagé par l'équipe : un téléphone principal et jusqu'à 4 postes reliés. Le lien « Nous écrire sur WhatsApp » (lien `wa.me`) ouvre la conversation avec un message déjà rempli : « Bonjour, je vous contacte depuis votre site. Mon projet : » *(à valider)*. Le texte du lien n'est pas le numéro : le lien du téléphone l'affiche déjà. Pas de bouton flottant sur les autres pages : il cacherait du contenu sur téléphone et concurrencerait le bouton principal.

> L'e-mail, le téléphone et l'adresse sont confirmés le 26 septembre 2026. Ce sont des informations obligatoires (loi 31-08, article 29). Les valeurs sont dans `src/data/site.ts`. La ligne « Adresse » remplace l'ancienne ligne « Zone : [Ville ou région] ». Code postal reçu : « 300000 », corrigé en 30000 (code postal de Fès, cinq chiffres) : à confirmer.

#### Encadré : audit

**Titre :** Vous avez déjà un site ?

Commencez par un audit gratuit : vitesse, sécurité, référencement technique et affichage mobile.

**Bouton :** [Faire auditer mon site]

---

### 6.12 Page « Réalisations » (supprimée)

> Page retirée du site le 26 septembre 2026, avec la section « Nos réalisations » de l'accueil. Elle pourra revenir quand des études de cas réelles, avec l'accord écrit des clients, seront prêtes.

---

### 6.13 Page « Blog » (supprimée)

> Page retirée du site le 26 septembre 2026, avec ses trois premiers articles et le flux RSS. Les textes restent dans l'historique Git.

---

### 6.14 Page « Applications mobiles »

> Proposition à valider.

**URL :** `/services/applications-mobiles`
**Balise title :** Création d'application mobile iPhone et Android | Digital Solutions
**Meta description :** Une application iPhone et Android pour vos clients ou vos équipes, testée sur de vrais téléphones et suivie après sa publication sur les stores.
**Mots-clés visés (à valider) :** création application mobile Fès, développement application iPhone Android, application mobile entreprise

#### En-tête

**H1 :** Votre application iPhone et Android, de la conception à la publication

**Sous-titre :** Pour vos clients ou pour vos équipes : une seule équipe conçoit les écrans, développe l'application, la teste sur de vrais téléphones et assure son suivi.

**Bouton :** [Parler de mon application]

#### Section : le problème

**Titre :** Une application mobile, c'est un vrai projet

- Vous ne savez pas si vous avez besoin d'une application ou d'un site adapté au mobile.
- Un devis pour iPhone, un autre pour Android : le budget double.
- Une application jamais mise à jour finit par mal fonctionner sur les nouveaux téléphones.
- Quand une application plante, les utilisateurs la suppriment et laissent une mauvaise note.

#### Section : ce que nous développons

**Titre :** Des applications pour vos clients et pour vos équipes

**Une application pour vos clients**
Réservation, commande, fidélité, suivi de livraison, espace client : vos services dans la poche de vos clients, avec des notifications pour les prévenir au bon moment.

**Une application pour vos équipes**
Pointage, suivi de chantier, inventaire, tournées, photos et signatures sur le terrain. L'application peut fonctionner sans connexion et envoyer les données dès que le réseau revient.

**Un seul développement pour iPhone et Android**
Quand c'est adapté à votre projet, nous développons une seule application pour les deux systèmes. Vous payez un seul projet, et les deux versions évoluent ensemble.

**La publication sur l'App Store et Google Play**
Nous préparons les fiches, les captures d'écran et les documents demandés par Apple et Google, et nous suivons la validation jusqu'à la publication.

#### Section : notre différence

**Titre :** Testée sur de vrais téléphones, suivie après la publication

**Testée sur de vrais téléphones**
Avant chaque publication, nous vérifions votre application sur plusieurs modèles d'iPhone et d'Android, avec des petits et des grands écrans.

**Connectée à vos outils**
Votre application utilise les mêmes données que votre site, votre boutique ou votre logiciel de gestion. Vous ne saisissez rien deux fois.

**Vos données protégées**
Connexion chiffrée, comptes utilisateurs sécurisés et respect de la loi 09-08 sur les données personnelles.

**Toujours à jour**
Apple et Google changent leurs règles chaque année. Avec un forfait de maintenance, nous mettons votre application à jour pour qu'elle reste disponible et compatible.

#### Section : processus

**Titre :** Comment nous travaillons

1. **Cadrage.** Nous listons les écrans et les fonctionnalités, et nous gardons l'essentiel pour la première version.
2. **Maquettes.** Vous voyez les écrans de votre application avant le début du développement.
3. **Développement par étapes.** Vous installez régulièrement une nouvelle version sur votre téléphone.
4. **Tests.** Tests automatiques et vérifications sur de vrais téléphones avant chaque publication.
5. **Publication et suivi.** Nous publions votre application sur l'App Store et Google Play, puis nous la gardons à jour.

#### FAQ

**Ai-je besoin d'une application ou d'un site adapté au mobile ?**
Pas toujours. Si vos clients vous consultent de temps en temps, un site rapide et adapté au mobile suffit souvent, et il coûte moins cher. Une application devient utile quand vos clients l'utilisent souvent, ou quand ils ont besoin des notifications, de l'appareil photo, de la localisation ou d'un mode sans connexion. Nous vous le disons honnêtement dès le premier échange.

**Combien coûte une application mobile ?**
Cela dépend des écrans et des fonctionnalités. Après le cadrage, nous vous remettons un devis gratuit, à prix fixe.

**Combien de temps faut-il ?**
Nous fixons le planning ensemble après le cadrage. Il faut aussi prévoir quelques jours pour la validation de l'application par Apple et Google.

**À qui appartient l'application ?**
À vous. Elle est publiée avec vos propres comptes développeur Apple et Google, et le code vous appartient. Apple et Google facturent ces comptes directement : nous vous aidons à les créer.

**Pouvez-vous reprendre une application existante ?**
Oui. Nous commençons par un audit du code pour faire le point, puis nous vous proposons un plan : corriger, faire évoluer ou reconstruire certaines parties.

#### Appel à l'action final

**Titre :** Parlons de votre application

Un échange de 30 minutes, gratuit et confidentiel, pour savoir si une application est la bonne réponse à votre besoin, et pour quel budget.

**Bouton :** [Parler de mon application]

---

### 6.15 Page « Logiciels SaaS »

> Proposition à valider.

**URL :** `/services/logiciels-saas`
**Balise title :** Développement de logiciel SaaS par abonnement | Digital Solutions
**Meta description :** Vous voulez vendre un logiciel en ligne par abonnement ? Nous développons votre SaaS : comptes clients, abonnements, paiement en ligne, sécurité et suivi.
**Mots-clés visés (à valider) :** développement SaaS Maroc, créer un logiciel SaaS, plateforme en ligne par abonnement

#### En-tête

**H1 :** Lancez votre SaaS avec une première version solide et prête à vendre

**Sous-titre :** Nous vous aidons à cadrer l'essentiel, à construire la plateforme et à gérer les comptes et les abonnements. Puis nous faisons évoluer le logiciel avec les retours de vos clients.

**Bouton :** [Parler de mon idée de SaaS]

> Ancien H1 : « Votre logiciel en ligne, vendu par abonnement ». Le document de recommandations demande de mettre l'accent sur le lancement et sur les retours des premiers clients, plus que sur la liste technique.

#### Section : définition

**Titre :** Un SaaS, en clair

Un SaaS (« logiciel en tant que service ») est un logiciel que vos clients utilisent en ligne, depuis leur navigateur ou leur téléphone. Ils n'installent rien et ils paient un abonnement. Vous gérez une seule version du logiciel pour tous vos clients.

#### Section : le problème

**Titre :** Les pièges d'un projet SaaS

- Vous voulez tout développer avant de trouver votre premier client.
- Les données d'un client s'affichent chez un autre, et la confiance est perdue.
- Le logiciel ralentit quand le nombre de clients augmente.
- Chaque nouvelle version casse une fonction que vos clients utilisaient.

#### Section : ce que nous construisons

**Titre :** Tout ce dont votre SaaS a besoin

**Commencer par l'essentiel**
Nous gardons les fonctions nécessaires pour vendre et apprendre vite de vos premiers clients. Le reste attend leurs retours.

**Comptes et abonnements**
Inscription, connexion sécurisée, utilisateurs et droits, formules, période d'essai, paiement en ligne et factures automatiques. Nous choisissons avec vous la solution de paiement adaptée à vos clients, au Maroc ou à l'international.

**Espace d'administration**
Vous suivez vos clients, vos abonnements et l'utilisation de votre logiciel, sans dépendre de nous.

**Connexion avec d'autres logiciels**
Vos clients relient votre SaaS à leurs propres outils : comptabilité, CRM, e-mailing. Votre logiciel devient plus utile, et plus difficile à remplacer.

#### Section : notre différence

**Titre :** Construit pour grandir

**Des bases solides**
Les données de chaque client restent séparées de celles des autres. Votre logiciel peut accueillir de nouveaux clients et de nouvelles fonctionnalités sans tout reconstruire.

**Testé à chaque version**
Des tests automatiques vérifient chaque nouvelle version avant sa mise en ligne. Vos clients ne découvrent pas les bugs à votre place.

**Sécurité et sauvegardes**
Connexions chiffrées, accès contrôlés, sauvegardes quotidiennes et surveillance 24 h/24.

**Des mises à jour sans surprise**
Nous préparons chaque mise en ligne pour éviter les coupures de service. En cas de problème, nous revenons à la version précédente en quelques minutes.

#### Section : processus

**Titre :** Du cadrage aux premiers clients

1. **Atelier de cadrage.** Nous listons les fonctions essentielles pour vos premiers clients et nous définissons les formules d'abonnement.
2. **Maquettes.** Vous voyez les écrans et vous pouvez les montrer à vos futurs clients avant le développement.
3. **Première version.** L'essentiel pour vendre et recueillir les avis de vos premiers clients.
4. **Tests et lancement.** Tests automatiques, vérifications manuelles, puis mise en ligne.
5. **Évolutions et suivi.** Nous hébergeons, surveillons et faisons évoluer votre logiciel selon les retours de vos clients.

#### FAQ

**Combien coûte le développement d'un SaaS ?**
Cela dépend des fonctionnalités. Après l'atelier de cadrage, nous vous remettons un devis gratuit, à prix fixe, pour la première version.

**Combien de temps faut-il ?**
Cela dépend des fonctions de la première version. Nous fixons le planning ensemble après le cadrage, et il figure dans le devis.

**Qui est propriétaire du logiciel ?**
Vous. Le code, les données et les comptes (hébergement, paiement, nom de domaine) sont à votre nom.

**Mon idée sera-t-elle protégée ?**
Oui. Nous pouvons signer un accord de confidentialité avant d'entrer dans les détails de votre projet.

**Pouvez-vous héberger et maintenir le logiciel après le lancement ?**
Oui. Nous proposons l'hébergement, la surveillance et les évolutions dans un forfait mensuel adapté à votre nombre de clients.

**Mes clients sont à l'étranger. Est-ce un problème ?**
Non, mais les règles changent selon les pays : protection des données, facturation, paiement. Nous en tenons compte dès le cadrage.

> À valider avec un juriste selon les pays visés.

#### Appel à l'action final

**Titre :** Parlons de votre idée de SaaS

Un échange de 30 minutes, gratuit et confidentiel, pour parler de votre idée, de vos futurs clients et de ce qui est réaliste pour une première version.

**Bouton :** [Parler de mon idée de SaaS]

---

### 6.16 Page « Intelligence artificielle »

> Proposition à valider.

**URL :** `/services/intelligence-artificielle`
**Balise title :** Intégration de l'intelligence artificielle en entreprise | Digital Solutions
**Meta description :** Assistant pour vos clients, recherche dans vos documents, lecture automatique des factures : nous intégrons l'IA là où elle vous fait gagner du temps.
**Mots-clés visés (à valider) :** intelligence artificielle entreprise Maroc, chatbot site web, assistant WhatsApp, IA pour entreprise

#### En-tête

**H1 :** Intégrez l'IA là où elle apporte un gain concret

**Sous-titre :** Assistants, traitement de documents et rédaction assistée : nous partons de vos tâches réelles, nous testons les résultats et nous encadrons l'utilisation de vos données.

> Ancien H1 : « L'intelligence artificielle, là où elle vous fait vraiment gagner du temps ». Pas de promesse générale sur la confidentialité d'un fournisseur d'IA tant que les fournisseurs et les contrats ne sont pas choisis (section 8).

**Bouton :** [Parler de mon projet IA]

#### Section : le problème

**Titre :** L'IA vous intéresse, mais par où commencer ?

- Vous entendez parler d'IA partout, sans savoir ce qu'elle peut faire pour votre activité.
- Vous répondez chaque jour aux mêmes questions, par téléphone, par e-mail ou sur WhatsApp.
- Vos équipes passent des heures à lire, recopier et classer des documents.
- Vos équipes utilisent déjà des outils d'IA, sans règles pour protéger vos données.

#### Section : ce que nous faisons

**Titre :** Ce que l'IA peut faire pour vous

**Un assistant pour vos clients**
Sur votre site ou sur WhatsApp, il répond aux questions fréquentes à partir de vos informations : horaires, tarifs, suivi de commande. Quand il ne sait pas, il transmet la demande à votre équipe.

**Un assistant pour vos équipes**
Vos collaborateurs retrouvent plus vite une procédure, une information produit ou un passage de contrat. Chaque réponse indique le document d'origine.

**Le traitement de vos documents**
Factures, bons de commande, formulaires : l'IA lit les documents, extrait les informations et les range dans vos outils. Votre équipe vérifie seulement les cas douteux.

**La rédaction assistée**
Réponses aux e-mails, fiches produits, comptes rendus de réunion : l'IA prépare un brouillon, vous le relisez et vous le validez.

#### Section : formation *(ajout à valider)*

**Titre :** Former vos équipes à l'IA

Vos équipes utilisent déjà des outils d'IA comme ChatGPT ? Nous organisons des ateliers pratiques, avec vos propres cas de travail. Vos équipes apprennent à :
- rédiger des demandes claires pour obtenir de bonnes réponses ;
- vérifier les réponses et repérer les erreurs ;
- savoir quelles informations ne jamais confier à un outil d'IA ;
- utiliser l'IA pour les tâches de tous les jours : e-mails, résumés, tableaux.

À la fin de l'atelier, vous recevez des règles d'utilisation simples, adaptées à votre entreprise.

> La durée et le nombre de participants ([à définir]) seront ajoutés une fois fixés.

**Bouton :** [Organiser un atelier]

#### Section : notre différence

**Titre :** Une IA testée et encadrée

**Testée avec vos vraies questions**
Avant la mise en service, nous vérifions les réponses sur une liste de cas réels, préparée avec vous. Nous corrigeons les erreurs avant vos clients.

**Honnête sur ses limites**
L'assistant cite ses sources et dit quand il ne sait pas. Pour les décisions importantes, une personne valide toujours le résultat.

**Vos données encadrées**
Nous limitons les données envoyées au strict nécessaire. Avant de commencer, nous vous disons quel service d'IA traite vos données, et dans quel pays.

**Suivie dans la durée**
Nous surveillons la qualité des réponses et les coûts d'utilisation. Nous mettons l'assistant à jour quand vos informations changent.

#### Section : processus

**Titre :** Comment nous travaillons

1. **Diagnostic.** Nous repérons avec vous les tâches où l'IA peut vous faire gagner du temps, et celles où elle n'est pas utile.
2. **Essai sur vos données.** Nous construisons un premier prototype avec vos documents et vos vraies questions.
3. **Tests.** Nous mesurons la qualité des réponses et nous corrigeons avant la mise en service.
4. **Mise en service et formation.** Nous intégrons l'IA dans vos outils et nous formons vos équipes.
5. **Suivi.** Nous surveillons les résultats et les coûts, et nous adaptons l'assistant.

#### FAQ

**L'IA peut-elle se tromper ?**
Oui. C'est pourquoi nous testons les réponses avant la mise en service, nous limitons l'assistant à vos informations et nous prévoyons une vérification par une personne là où une erreur aurait des conséquences.

**L'assistant comprend-il l'arabe et la darija ?**
Les services d'IA actuels comprennent le français, l'arabe et l'anglais. Pour la darija, les résultats varient : nous faisons des essais avec vos propres exemples avant de vous proposer une solution.

**Mes données sont-elles en sécurité ?**
Cela dépend du service d'IA choisi. Nous limitons les données envoyées au strict nécessaire. Avant de commencer, nous vous disons quel service traite vos données, dans quel pays, et s'il peut les utiliser pour entraîner ses modèles. Vous décidez en connaissance de cause.

**Combien ça coûte ?**
Cela dépend de l'assistant et de vos données. Nous vous remettons un devis gratuit, à prix fixe. Le service d'IA est facturé en plus, selon l'utilisation : nous estimons ce coût avec vous avant de commencer.

**Dois-je changer mes outils ?**
Non. Nous intégrons l'IA dans les outils que vous utilisez déjà : site, messagerie, CRM, dossiers partagés.

#### Appel à l'action final

**Titre :** Où l'IA peut-elle vous faire gagner du temps ?

Décrivez-nous les tâches qui vous prennent du temps. Nous vous disons gratuitement si l'IA peut vous aider, et comment.

**Bouton :** [Parler de mon projet IA]

---

### 6.17 Page « Données et tableaux de bord »

> Proposition à valider.

**URL :** `/services/donnees-tableaux-de-bord`
**Balise title :** Tableaux de bord et mesure d'audience | Digital Solutions
**Meta description :** Mesure d'audience de votre site et tableaux de bord de votre activité : vos chiffres clés sur un seul écran, fiables et mis à jour automatiquement.
**Mots-clés visés (à valider) :** tableau de bord entreprise, mesure d'audience site web, reporting automatique, Google Analytics

#### En-tête

**H1 :** Les bons chiffres, au même endroit

**Sous-titre :** Visiteurs de votre site, ventes, stocks, rendez-vous : nous réunissons les données de vos outils dans des tableaux de bord clairs et des rapports automatiques, avec des chiffres vérifiés.

> Ancien H1 : « Vos chiffres clés, sur un seul écran ». La fiabilité des chiffres est le principal argument de la page, avant leur présentation.

**Bouton :** [Parler de mes chiffres]

#### Section : le problème

**Titre :** Vous pilotez votre activité à l'aveugle ?

- Vous ne savez pas combien de visiteurs votre site reçoit, ni d'où ils viennent.
- Vos chiffres sont éparpillés entre votre boutique, votre comptabilité et plusieurs tableurs.
- Chaque fin de mois, vous passez des heures à préparer le même rapport.
- Deux tableaux donnent deux chiffres différents, et vous ne savez pas lequel croire.

#### Section : ce que nous faisons

**Titre :** Trois façons de mieux connaître votre activité

**La mesure d'audience de votre site**
Combien de visiteurs, d'où ils viennent, quelles pages mènent à une demande de devis ou à une vente. Nous installons un outil de mesure qui respecte la vie privée de vos visiteurs et la loi 09-08.

**Les tableaux de bord de votre activité**
Ventes, chiffre d'affaires, stocks, rendez-vous : vos données réunies depuis vos outils, sur un seul écran, sur ordinateur ou sur téléphone.

**Les rapports automatiques**
Un résumé clair chaque semaine ou chaque mois par e-mail, sans préparation de votre part. Et une alerte quand un chiffre sort de l'ordinaire : stock bas, baisse des ventes.

#### Section : notre différence

**Titre :** Des chiffres fiables

Un tableau de bord faux est pire que pas de tableau de bord du tout. Nous vérifions que chaque chiffre correspond à celui de vos logiciels, et nous testons les calculs avant la mise en service. Chaque indicateur est documenté : vous savez d'où vient le chiffre et comment il est calculé.

#### Section : nos limites

**Titre :** Ce que nous ne faisons pas

Nous mettons en place les outils et des chiffres fiables. L'analyse marketing, la publicité et les campagnes ne font pas partie de nos services. Si vous travaillez avec une agence marketing ou un consultant, nous leur donnons accès aux chiffres.

#### Section : processus

**Titre :** Comment nous travaillons

1. **Choix des indicateurs.** Nous définissons avec vous les chiffres qui comptent vraiment pour votre activité.
2. **Connexion des sources.** Nous relions vos outils : site, boutique, comptabilité, CRM, tableurs.
3. **Construction et vérification.** Nous construisons les tableaux de bord et nous vérifions chaque chiffre avec vous.
4. **Formation et suivi.** Nous vous montrons comment lire vos tableaux, puis nous les faisons évoluer avec vos besoins.

#### FAQ

**Quels outils utilisez-vous ?**
Pour la mesure d'audience : Matomo, Plausible ou Google Analytics, selon vos besoins. Pour les tableaux de bord : des outils éprouvés comme Looker Studio ou Metabase, ou un tableau de bord sur mesure dans votre application.

**Faut-il un bandeau cookies ?**
Cela dépend de l'outil de mesure. Certains outils fonctionnent sans cookie de suivi. Nous vous conseillons la solution la plus simple qui respecte la loi 09-08.

> À valider avec le juriste.

**Qui peut voir mes chiffres ?**
Seulement les personnes que vous choisissez. Chaque accès est personnel, et vous décidez qui voit quoi.

**Combien ça coûte ?**
Cela dépend du nombre de sources et d'indicateurs. Chaque projet fait l'objet d'un devis gratuit, à prix fixe.

#### Appel à l'action final

**Titre :** Quels chiffres aimeriez-vous voir chaque matin ?

Listez-nous les chiffres que vous suivez aujourd'hui et les outils qui les contiennent. Nous vous disons gratuitement ce qu'un tableau de bord peut vous apporter.

**Bouton :** [Parler de mes chiffres]

---

### 6.18 Page « Tests et sécurité »

> Proposition à valider.

**URL :** `/services/tests-securite`
**Balise title :** Audit de sécurité et tests de sites et d'applications | Digital Solutions
**Meta description :** Audit de sécurité, tests avant une mise en ligne, tests automatiques et tests de charge : nous vérifions vos sites et vos applications.
**Mots-clés visés (à valider) :** audit sécurité site web Maroc, test application web, test de charge, recette application

#### En-tête

**H1 :** Trouvez les problèmes avant vos utilisateurs

**Sous-titre :** Audit de sécurité, tests avant une mise en ligne, tests automatiques et tests de charge : nous vérifions votre site ou votre application, même si nous ne l'avons pas développé.

**Bouton :** [Faire vérifier mon projet]

> Ancien H1 : « Vos sites et vos applications, vérifiés avant vos clients ». Le texte dit « réduire les risques », jamais « sécuriser » : aucune formule ne doit suggérer une sécurité garantie.

#### Section : le problème

**Titre :** Vous n'êtes pas sûr de votre site ou de votre application ?

- Votre prestataire livre sans tester, et vos clients découvrent les bugs.
- Vous ne savez pas si votre site résiste aux attaques courantes.
- Chaque nouvelle version casse une fonction qui marchait.
- Vous préparez un lancement ou une campagne, et vous craignez que le site ne tienne pas.

#### Section : ce que nous faisons

**Titre :** Quatre façons de réduire les risques

**Audit de sécurité**
Nous recherchons les failles les plus courantes : mises à jour oubliées, mots de passe faibles, accès trop larges, formulaires mal protégés, serveur mal configuré. Vous recevez un rapport avec les failles classées par gravité, et les corrections à faire.

**Tests avant une mise en ligne**
Avant le lancement d'un site ou d'une nouvelle version, nous vérifions chaque parcours important : inscription, commande, paiement, formulaires. Sur ordinateur, tablette et mobile, dans les principaux navigateurs.

**Tests automatiques**
Nous ajoutons des tests automatiques à votre projet. À chaque nouvelle version, ils vérifient que ce qui fonctionnait fonctionne toujours.

**Tests de charge**
Nous simulons un grand nombre de visiteurs en même temps. Vous savez si votre site tient le jour d'un pic (soldes, fêtes, campagne publicitaire), et vous connaissez ses limites avant vos clients.

#### Section : notre différence

**Titre :** Des spécialistes des tests

Les tests sont au cœur de notre métier : nous testons chacun de nos propres projets avant la mise en ligne. Nous appliquons la même méthode à vos projets, même s'ils ont été développés par un autre prestataire ou par votre équipe. Nos rapports sont écrits sans jargon : chaque problème est expliqué, avec son effet sur votre activité et la correction à faire.

#### Section : nos règles

**Titre :** Nos règles

- Nous testons uniquement avec l'accord écrit du propriétaire du site ou de l'application.
- Nous gardons vos informations confidentielles, et nous pouvons signer un accord de confidentialité.
- Un audit réduit les risques, mais personne ne peut garantir qu'un site ne sera jamais piraté. Nous vous le disons honnêtement.

#### Section : processus

**Titre :** Comment nous travaillons

1. **Cadrage.** Nous définissons ensemble ce qui est testé, comment et quand. Vous signez une autorisation.
2. **Tests.** Nous vérifions votre site ou votre application, sans perturber vos clients.
3. **Rapport.** Vous recevez la liste des problèmes, classés par gravité, avec les corrections.
4. **Corrections.** Nous corrigeons nous-mêmes, ou nous accompagnons votre prestataire.
5. **Nouvelle vérification.** Nous vérifions que chaque correction fonctionne.

#### FAQ

**Quelle différence avec l'audit gratuit ?**
L'audit gratuit regarde votre site de l'extérieur : vitesse, sécurité de base, référencement technique et affichage mobile. L'audit de sécurité va plus loin : avec votre accord, nous examinons aussi le code, le serveur et les accès.
→ [Faire auditer mon site]

**Pouvez-vous tester un projet développé par un autre prestataire ?**
Oui, c'est même le cas le plus fréquent. Nous avons besoin de votre accord écrit et, pour aller plus loin, d'un accès au code ou au serveur.

**Les tests vont-ils perturber mon site ?**
Non. Nous planifions les tests avec vous. Les tests de charge se font hors des heures d'affluence, ou sur une copie de votre site.

**Combien ça coûte ?**
Cela dépend de la taille du site ou de l'application et des tests choisis. Après le cadrage, nous vous remettons un devis gratuit, à prix fixe.

**Que se passe-t-il après l'audit ?**
Vous êtes libre : vous corrigez avec votre prestataire, ou nous nous en chargeons. Avec un forfait de maintenance, nous surveillons ensuite votre site dans la durée.

#### Appel à l'action final

**Titre :** Faites vérifier votre site ou votre application

Un échange de 30 minutes, gratuit et confidentiel, pour définir ce qu'il faut tester en priorité.

**Bouton :** [Faire vérifier mon projet]

---

### 6.19 Visuels des en-têtes

> Légende et textes alternatifs validés le 26 septembre 2026. Maquettes reçues du designer le 26 septembre 2026, adaptées aux règles de ce brief. Sources et détail des adaptations : [design/heros/README.md](../design/heros/README.md).

Onze pages ont un visuel dans l'en-tête, à droite du texte (sous le texte sur téléphone) : des écrans sur ordinateur et sur téléphone, avec une ou deux cartes. Chaque visuel montre un projet du type décrit par la page, pour un client fictif. Les autres pages (Services, Processus, L'agence, Contact, pages légales) ont un en-tête sans visuel (design du 26 septembre 2026).

Les visuels des pages de services servent aussi de vignettes aux cartes des services (Accueil et Services). Le visuel de l'audit gratuit illustre l'encadré « Audit gratuit » de l'accueil.

**Règles :**
- Les clients, les noms, les chiffres et les adresses sont inventés. Aucun visuel ne présente un client fictif comme une réalisation de l'agence. La légende le dit sous chaque visuel.
- Aucun prix ni montant en dirhams, même dans les écrans d'un client.
- Aucune photo de stock : les photos des maquettes sont remplacées par des dessins.
- Aucun nom d'entreprise réelle, aucun membre de l'équipe inventé.
- Aucun engagement qui n'est pas encore confirmé (délai du rapport d'audit, durée de l'appel).
- Quand des clients auront donné leur accord écrit, leurs projets réels pourront remplacer ces exemples (voir section 6.12).

**Légende (sous chaque visuel) :** Exemple fictif : le client et les chiffres sont inventés.

**Légende (sous la grille des cartes des services) :** Visuels des cartes : exemples fictifs, les clients et les chiffres sont inventés. *(Ajout du design du 26 septembre 2026, à valider.)*

| Page | Visuel (client fictif) | Texte alternatif |
|---|---|---|
| Accueil | Site et prise de rendez-vous d'Anfa Dentaire, cabinet dentaire à Casablanca | Site et application de réservation d'un cabinet dentaire, sur ordinateur et sur téléphone |
| Sites web | Site du Riad Dar Nour, à Marrakech | Site d'un riad à Marrakech avec réservation en ligne, sur ordinateur et sur téléphone |
| Applications sur mesure | Planning d'atelier et devis du Garage Atlas | Application d'un garage : planning de l'atelier sur ordinateur, devis signé par le client sur téléphone |
| Applications mobiles | Carte de fidélité du Café Nour, application d'un technicien | Deux applications mobiles : la carte de fidélité d'un café et les interventions du jour d'un technicien |
| Logiciels SaaS | Kalendo, logiciel de réservation pour salons | Logiciel de réservation pour salons de beauté : agenda de l'équipe et page de réservation sur téléphone |
| Intelligence artificielle | Factures fournisseurs et assistant client de Transports Sebou | Lecture automatique des factures fournisseurs avec une erreur de TVA signalée, et assistant qui répond aux clients |
| Automatisation et intégrations | Demandes de devis de la Menuiserie Alami | Automatisation d'une demande de devis : contact créé, équipe prévenue et confirmation envoyée au client sur WhatsApp |
| Données et tableaux de bord | Tableau de bord de Maison Argan | Tableau de bord des ventes d'une boutique, sur ordinateur et sur téléphone, avec une alerte de stock faible |
| Tests et sécurité | Recette de la boutique Maison Argan | Rapport de tests avant une mise en ligne : parcours clients, audit de sécurité et test de charge |
| Hébergement et maintenance | Espace client du Riad Mogador, forfait Sérénité | Espace client d'un site hébergé : disponibilité, sauvegardes, certificat et mises à jour, avec les notifications sur téléphone |
| Audit gratuit | Rapport d'audit de www.votre-site.ma | Rapport d'audit gratuit : notes de vitesse, de sécurité et de référencement, avec les actions prioritaires |

### 6.20 Surtitres et libellés du design

> Proposition à valider. Ajoutés avec les maquettes du designer du 26 septembre 2026. Ils ne changent ni l'offre ni le sens des textes : ce sont des petites capitales au-dessus des titres, et quelques libellés. Les textes eux-mêmes sont ceux de la révision du 26 septembre 2026 (recommandations de wording) : les maquettes montraient encore les anciens textes.

**Présentation :**
- Chaque titre de section a un surtitre (tableau ci-dessous).
- La fin de chaque grand titre est en gras, par exemple « Parlons de votre **projet** » ou « Des sites et des applications fiables, **suivis dans la durée** ».
- En-tête des pages de services : « Service 01 · Sites web ». Le numéro suit l'ordre des services de la section 5. Les cartes des services portent le même numéro (01 à 09).
- Accueil, en-tête : pas de surtitre. Le surtitre « TPE · PME · Particuliers » est retiré le 26 septembre 2026 (section 4, publics non nommés).
- Libellés : « Idéal pour » (cartes d'offre, sans deux-points), « Vous recevez » (étapes de la page Processus, sans deux-points), « (facultatif) » après le libellé des champs facultatifs (les champs obligatoires n'ont plus de mention), « recommandé » (forfait Sérénité), « Erreur 404 » (page introuvable).
- Page Audit gratuit, « Ce que nous vérifions » : chaque point a un titre (« Vitesse ») et une phrase qui commence par une majuscule (« Combien de temps vos pages mettent à s'afficher, et ce qui les ralentit. »).
- Page Contact : « Et ensuite ? » reste un titre, présenté comme un surtitre au-dessus des trois étapes.

| Page | Section | Surtitre |
|---|---|---|
| Accueil | Ce que vous y gagnez | Vos bénéfices |
| Accueil | Des solutions digitales qui répondent à vos enjeux | Nos services |
| Accueil | Un projet en cinq étapes claires | Processus |
| Accueil, Services | Encadré audit gratuit | Audit gratuit |
| Accueil | Nos engagements | Engagements |
| Services | Des solutions pour faire avancer votre activité | Nos services |
| Services | Pourquoi travailler avec nous | Nos différences |
| Services | Comment se déroule votre projet | Processus |
| Toutes les pages avec une FAQ | Questions fréquentes | FAQ |
| Pages de services | Le problème | Le constat |
| Pages de services | Les étapes (« Comment nous travaillons », « Du cadrage aux premiers clients ») | Processus |
| Sites web | Trois façons de lancer ou de relancer votre présence en ligne | Nos formules |
| Sites web | Inclus dans tous nos sites | Sans supplément |
| Sites web | Les options | À la carte |
| Sites web | Testé avant la mise en ligne. Vraiment. | Qualité |
| Sites web | Un site à votre image | Design |
| Applications sur mesure, Applications mobiles, Logiciels SaaS, Intelligence artificielle, Automatisation, Données, Tests et sécurité | Ce que nous faisons (première section de l'offre) | Nos solutions |
| Applications sur mesure, Applications mobiles, Logiciels SaaS, Intelligence artificielle, Tests et sécurité | Notre différence | Notre différence |
| Applications sur mesure | Vous avez une idée d'application ? Commencez petit. | Porteurs de projet |
| Logiciels SaaS | Un SaaS, en clair | Définition |
| Intelligence artificielle | Former vos équipes à l'IA | Formation |
| Automatisation et intégrations | Quelques exemples concrets | Exemples |
| Automatisation et intégrations | WhatsApp, connecté à vos outils | À la carte |
| Automatisation et intégrations | Des automatisations fiables, pas du bricolage | Qualité |
| Données et tableaux de bord | Des chiffres fiables | Qualité |
| Données et tableaux de bord | Ce que nous ne faisons pas | Nos limites |
| Tests et sécurité | Nos règles | Confiance |
| Hébergement et maintenance | Tout ce dont votre site a besoin | Inclus |
| Hébergement et maintenance | Choisissez votre forfait | Forfaits |
| Hébergement et maintenance | Votre prestataire a disparu ? Votre site est cassé ? | Reprise de site |
| Audit gratuit | En-tête | Audit gratuit |
| Audit gratuit | Ce que nous vérifions | Périmètre |
| Audit gratuit | Ce que l'audit gratuit ne couvre pas | Limites |
| Audit gratuit | Ce que vous recevez | Livrables |
| Processus | Les étapes de votre projet | 7 étapes |
| Processus | Pourquoi les tests comptent autant | Qualité |
| Processus | Ce dont nous avons besoin de votre part | Votre rôle |
| L'agence | Pourquoi Digital Solutions existe | Notre histoire |
| L'agence | Ce que nous savons faire, en clair | Savoir-faire |
| L'agence | Nos valeurs | Valeurs |
| L'agence | L'équipe | Équipe |
| L'agence | Nos partenaires | Réseau |
| Contact | Autres moyens de nous joindre | Coordonnées |
| Contact | Vous avez déjà un site ? | Audit gratuit |

---

## 7. Points légaux

> À faire valider par un juriste avant la mise en ligne.
> L'agence et ses clients sont au Maroc : le droit marocain s'applique.

**Vente aux particuliers (loi 31-08 sur la protection du consommateur)**
- **Droit de rétractation de 7 jours** pour les contrats conclus à distance (article 36). Le délai passe à 30 jours si le fournisseur ne confirme pas par écrit les informations obligatoires. Le remboursement se fait sous 30 jours. À vérifier avec le juriste : le point de départ du délai pour une prestation de services, le cas d'un travail commencé avec l'accord du client avant la fin du délai, et les règles du démarchage.
- **Informations obligatoires** du fournisseur dans l'offre (article 29) : identité, adresse, téléphone, e-mail, numéro d'immatriculation.
- **CGV spécifiques** à la vente aux particuliers.

**Données personnelles (loi 09-08, CNDP)**
- **Déclaration préalable à la CNDP** des traitements du site (formulaires de contact et d'audit), avant la mise en ligne. Indiquer le numéro de récépissé dans les mentions légales et dans la politique de confidentialité.
- **Transfert de données à l'étranger** (article 43) : Brevo (envoi des e-mails), WhatsApp (Meta, messages reçus sur le numéro de l'agence) et un hébergeur hors du Maroc reçoivent des données. Le transfert est à déclarer à la CNDP. Vérifier que le pays de destination est sur la liste des pays reconnus par la CNDP.
- **Droits des personnes** : information (article 5), accès (article 7), rectification et suppression (article 8), opposition (article 9).
- **Cookies** : consentement avant tout cookie de suivi. Le site n'en utilise pas pour l'instant.

**Site de l'agence**
- Mentions légales : raison sociale, forme juridique, capital, siège, registre du commerce, ICE, identifiant fiscal, taxe professionnelle, directeur de la publication, hébergeur.
- Politique de confidentialité, gestion des cookies.
- Consentement explicite sur tous les formulaires (contact, devis, audit).

**Offre aux clients**
- Nos sites clients doivent aussi respecter la loi 09-08 : déclaration à la CNDP, pages légales, consentement. Argument commercial possible [à valider] : nous préparons les pages et nous expliquons la démarche au client.
- L'**European Accessibility Act** concerne seulement les clients qui vendent aux particuliers dans l'Union européenne.
- **Tests et audit de sécurité** : accord écrit du propriétaire avant tout test. Accéder sans autorisation à un système informatique est puni par le Code pénal (articles 607-3 et suivants, issus de la loi 07-03) [à vérifier par le juriste]. Prévoir un modèle d'autorisation de test.
- **Messages WhatsApp automatiques** : la prospection par message électronique demande le consentement préalable de la personne (loi 09-08, article 10) [à vérifier par le juriste]. Prévoir la demande d'accord et la désinscription.

### Parties retirées des pages légales

Depuis le 26 septembre 2026, les pages Mentions légales, CGV et Confidentialité n'affichent que les parties sans placeholder. Le bandeau « Projet de texte : à faire valider par un juriste » n'est plus affiché, mais les textes restent des projets à faire valider. Les parties ci-dessous attendent une information ou une clause : quand elle est disponible, remettez la phrase sur la page.

Les valeurs de `src/data/` (modalités de paiement, garantie, durée d'engagement) reviennent seules : la phrase s'affiche quand la valeur n'a plus de crochets (fonction `estConfirme`).

**Mentions légales**
- Éditeur : « Le site www.digital-solutions.ma est édité par Digital Solutions, [forme juridique] au capital de [montant] DH. » Attention : `pnpm check:content` bloque les montants en dirhams, la règle devra accepter le capital.
- Siège social : l'adresse de l'agence (N° 7, rue Tantane, 30000 Fès) est affichée depuis le 26 septembre 2026, avec l'intitulé « Adresse ». Si c'est aussi le siège social inscrit au registre du commerce, remplacez l'intitulé par « Siège social ».
- Registre du commerce : [ville], numéro [numéro]
- Identifiant commun de l'entreprise (ICE) : [numéro]
- Identifiant fiscal (IF) : [numéro]
- Taxe professionnelle : [numéro]
- Directeur de la publication : « [Prénom Nom], [fonction]. »
- Hébergement : « [Nom de l'hébergeur], [adresse], [téléphone]. »
- Données personnelles : « Déclaration auprès de la CNDP : [numéro de récépissé]. »

**Conditions générales de vente**
- 2. Devis et commande : [Conditions d'acompte à définir]
- 3. Prix et paiement : « Modalités de paiement : [à définir : acompte à la commande, solde à la livraison, etc.] » (valeur `offre.modalitesPaiement`, revient seule) ; [Prix HT ou TTC, délais de paiement et pénalités de retard : à définir]
- 6. Tests et livraison : [Procédure de validation et délai : à définir] ; « Garantie : nous corrigeons les défauts liés à notre travail [pendant X mois après la livraison : garantie à définir]. » (valeur `offre.garantie`, revient seule)
- 7. Propriété : [Modalités de la cession des droits : à faire valider]
- 8. Hébergement et maintenance : durée d'engagement [Sans engagement / Engagement de 12 mois] (valeur `engagementMaintenance`, revient seule) ; [Conditions de résiliation : à définir]
- 9. Droit de rétractation : [Point de départ du délai, cas d'un travail commencé avec votre accord avant la fin du délai, démarchage et remboursement : à faire valider par un juriste]
- Section « Responsabilité » : [À définir]. La section est retirée et les suivantes sont renumérotées : remettez-la en 10.
- Droit applicable : [Juridiction compétente : à définir]

**Politique de confidentialité**
- Responsable du traitement : « Déclaration auprès de la CNDP : [numéro de récépissé]. » (l'adresse est affichée depuis le 26 septembre 2026)
- Base légale (consentement, article 4 de la loi 09-08, donné par la case du formulaire ou en écrivant sur WhatsApp) : [À confirmer par le juriste]
- Brevo : [Vérifier la localisation des données, le contrat de sous-traitance et la déclaration du transfert à la CNDP]
- WhatsApp (Meta) : [Vérifier les conditions de WhatsApp Business et la déclaration du transfert à la CNDP]
- Destinataires : « Notre hébergeur : [nom de l'hébergeur, pays]. »
- Section « Combien de temps nous les gardons » : [Durée à définir, par exemple 3 ans après notre dernier échange]. Après son retour, remettez aussi « combien de temps nous les gardons » dans la meta description et dans `llms.txt`.
- Cookies : [À mettre à jour si un outil de mesure d'audience est ajouté]

---

## 8. Prochaines étapes

- [x] Choisir le nom de l'agence et réserver le nom de domaine : Digital Solutions, `digital-solutions.ma`
- [x] Créer le logo (fait par l'équipe), puis l'intégrer : en-tête, pied de page, favicon et image de partage (`pnpm image:partage`). Reçu et intégré le 26 septembre 2026 (sources dans `design/logo/`).
- [ ] Relier le domaine au site et créer l'adresse e-mail de contact, `contact@digital-solutions.ma` (affichée sur le site depuis le 26 septembre 2026 ; voir la section « Nom de domaine » de [stack-technique.md](stack-technique.md))
- [ ] Fixer la grille de prix interne, pour les devis. Elle n'est pas publiée sur le site.
- [ ] Confirmer les engagements listés en [section 4](#engagements-à-confirmer-avant-publication)
- [ ] Choisir l'option design : designer partenaire ou modèles personnalisés
- [ ] Trouver les partenaires : graphiste, rédacteur, traducteur (arabe, anglais)
- [ ] Relire et valider les textes proposés : Accueil, Processus, L'agence, Contact (sections 6.7 à 6.11)
- [ ] Relire et valider les pages des nouveaux services : Applications mobiles, Logiciels SaaS, Intelligence artificielle, Données et tableaux de bord, Tests et sécurité (sections 6.14 à 6.18)
- [ ] Relire et valider les ajouts dans les pages existantes : options Sites web (langues, WhatsApp), section WhatsApp (Automatisation), formation à l'IA
- [x] Valider la légende et les textes alternatifs des visuels des en-têtes (section 6.19)
- [ ] Remplacer les visuels des en-têtes par des projets réels quand des clients auront donné leur accord écrit (section 6.19)
- [ ] Relire et valider la révision des textes du 26 septembre 2026 (recommandations de wording, section 6)
- [ ] Confirmer les valeurs retirées du site, puis les réafficher : délai de réponse, délais des projets, pays d'hébergement, zone servie (données structurées, llms.txt), durée de conservation des sauvegardes, volume de modifications et délais d'intervention des forfaits, durée d'engagement, garantie
- [ ] Fournir l'histoire de l'agence et les photos de l'équipe (section 6.10). Les noms, les rôles et la ville (Fès) sont reçus le 26 septembre 2026 : la section « L'équipe » est affichée.
- [x] Donner le numéro de téléphone et l'adresse de l'agence : reçus le 26 septembre 2026, affichés sur Contact, les pages légales, L'agence (ville), dans les données structurées et dans llms.txt
- [ ] Créer le compte WhatsApp Business de l'agence sur le +212 6 10 73 23 77 (lien affiché sur la page Contact depuis le 26 septembre 2026) : profil sans prix, vérification en deux étapes, jusqu'à 4 postes de l'équipe reliés
- [ ] Préparer des preuves concrètes : exemple de rapport d'audit, captures de tests, exemples de livrables, cas clients et témoignages avec l'accord écrit des clients
- [x] Intégrer le design du site : maquettes du designer, intégrées le 26 septembre 2026 (section « Design » de [stack-technique.md](stack-technique.md))
- [ ] Relire et valider les surtitres et les libellés ajoutés par le design (section 6.20)
- [ ] Préparer un modèle d'autorisation de test pour les audits de sécurité, validé par le juriste
- [ ] Choisir les fournisseurs d'IA (données non utilisées pour l'entraînement, transfert hors du Maroc à déclarer à la CNDP)
- [x] Choisir les technologies du site et commencer le développement (voir [stack-technique.md](stack-technique.md))
- [ ] Faire valider les CGV, les mentions légales et la politique de confidentialité par un juriste (droit marocain)
- [ ] Fournir les informations et les clauses des pages légales, puis remettre les parties retirées (section 7, « Parties retirées des pages légales »)
- [ ] Déclarer les traitements du site à la CNDP, avec le transfert des données vers Brevo, WhatsApp (Meta) et l'hébergeur
