# Visuels des en-têtes

Sources des images affichées dans l'en-tête de onze pages : des écrans (ordinateur, téléphone, cartes) pour un client fictif. Textes du site : section 6.19 de [docs/brief-agence.md](../../docs/brief-agence.md).

## Fichiers

| Page | Source | Client fictif |
|---|---|---|
| `/` | `accueil.html` | Anfa Dentaire, cabinet dentaire |
| `/services/sites-web` | `sites-web.html` | Riad Dar Nour, Marrakech |
| `/services/applications-sur-mesure` | `applications-sur-mesure.html` | Garage Atlas |
| `/services/applications-mobiles` | `applications-mobiles.html` | Café Nour, technicien de maintenance |
| `/services/logiciels-saas` | `logiciels-saas.html` | Kalendo, réservation pour salons |
| `/services/intelligence-artificielle` | `intelligence-artificielle.html` | Transports Sebou |
| `/services/automatisation-integrations` | `automatisation-integrations.html` | Menuiserie Alami |
| `/services/donnees-tableaux-de-bord` | `donnees-tableaux-de-bord.html` | Maison Argan |
| `/services/tests-securite` | `tests-securite.html` | Boutique Maison Argan |
| `/services/hebergement-maintenance` | `hebergement-maintenance.html` | Riad Mogador |
| `/audit-gratuit` | `audit-gratuit.html` | www.votre-site.ma |

- Chaque source est une page HTML de 1040 × 720 px, avec des styles en ligne. Elle n'est pas servie par le site : seules les images le sont. La règle « pas de style en ligne » du site ne s'applique donc pas ici.
- `polices/` : Inter, Cormorant Garamond, JetBrains Mono et Source Serif 4 (licence SIL Open Font License, fichiers `OFL-*.txt`), sous-ensemble latin.

## Régénérer les images

```sh
pnpm image:heros            # tous les visuels (environ 20 secondes par visuel)
pnpm image:heros accueil    # un seul visuel
```

Le script `scripts/generer-heros.mjs` :

1. vérifie chaque source avec les règles de contenu du site (aucun prix, mots à éviter, pas de « ! », aucune ressource externe) ;
2. ouvre la source dans Chromium et fait une capture au double de sa taille, sur fond transparent ;
3. écrit dans `src/assets/heros/` une image AVIF par largeur (`<nom>-<largeur>.avif`) et une image WebP pour les anciens navigateurs (`<nom>.webp`).

Les largeurs, les textes alternatifs et la légende sont dans `src/data/maquettes.ts`. `pnpm test` vérifie que chaque visuel a sa source, ses images et un texte alternatif, et que les sources respectent les règles de contenu.

Pour ajouter un visuel : créez `design/heros/<nom>.html` (élément racine `id="maquette"`), ajoutez son texte alternatif dans `src/data/maquettes.ts`, lancez `pnpm image:heros <nom>`, puis passez `maquette="<nom>"` au composant `Hero` de la page.

## Origine et adaptations

Maquettes reçues du designer le 26 septembre 2026 (archive « Hero mockups for Digital Solutions »). Les écrans, les couleurs et la mise en page sont repris tels quels. Changements faits pour respecter les règles du site (`CLAUDE.md`) :

- **Aucun prix ni montant en dirhams**, même dans les écrans d'un client : prix des soins, des chambres, des cafés et des abonnements, devis du garage, revenu mensuel du logiciel, montants du tableau de bord.
- **Aucune photo de stock** : les photos Pexels (cabinet dentaire, praticienne, patio et chambres du riad) sont remplacées par des dessins en SVG et par des initiales.
- **Aucune réalisation inventée** : « Site, réservation et tableau de bord livrés par nos soins » est retiré ; la légende « Exemple fictif » accompagne chaque visuel.
- **Aucune entreprise réelle** : fournisseurs, opérateurs et logiciels cités dans les factures et les tableaux de bord sont remplacés par des noms fictifs ou génériques. « Transports Benjelloun » devient « Transports Sebou ».
- **Aucun membre de l'équipe inventé** : le prénom de l'ingénieur qui lance les tests est retiré.
- **Aucun engagement non confirmé** : délai du rapport d'audit (« sous 48 h ») et durée de l'appel (« 30 min ») retirés ; sauvegardes et surveillance décrites comme dans la section 6.5 du brief.
- **Pas de numéro, d'adresse ou de domaine réel** : numéros masqués ou fictifs ; le site audité devient `www.votre-site.ma`.
- **Polices** : Inter remplace la police système d'Apple (SF Pro), JetBrains Mono celle du terminal : le rendu est le même sur tous les ordinateurs.
