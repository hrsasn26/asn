# Logo

Archive du logo reçue le 26 septembre 2026 (« logo-3c »). Les fichiers sont gardés tels quels : ce sont les sources. Le site ne les sert pas.

Le symbole : deux demi-disques décalés, celui du haut en bleu nuit, celui du bas en bleu. Le logo horizontal met le nom sur deux lignes à droite du symbole : « Digital » en gras, « Solutions » en gris, en dessous.

## Fichiers

| Fichier | Contenu | Fond |
|---|---|---|
| `svg/symbole-couleur.svg` | Symbole, bleu nuit et bleu | Clair |
| `svg/symbole-blanc.svg` | Symbole, blanc et bleu clair | Sombre |
| `svg/symbole-noir.svg` | Symbole, une seule couleur (bleu nuit) | Clair, impression en une couleur |
| `svg/logo-horizontal-couleur.svg` | Symbole et nom | Clair |
| `svg/logo-horizontal-blanc.svg` | Symbole et nom | Sombre |
| `svg/icone-app.svg` | Symbole blanc sur un carré bleu nuit aux coins arrondis | – |
| `png/` | Les mêmes, en PNG (1024 px pour le symbole et l'icône, favicons de 16 et 32 px, icône Apple de 180 px) | – |

Les SVG de `logo-horizontal-*` n'indiquent ni la police ni la taille du texte : leur rendu change d'un logiciel à l'autre. La référence est le PNG.

## Couleurs

| Version | Demi-disque du haut | Demi-disque du bas | « Digital » | « Solutions » |
|---|---|---|---|---|
| Couleur | `#0b1b33` (`encre`) | `#1d4ed8` (`bleu`) | `#0b1b33` (`encre`) | `#4b5770` (`texte`) |
| Blanche | `#ffffff` | `#6d9bff` (`nuit-logo-bleu`) | `#ffffff` | `#b8c2d6` (`nuit-logo-nom`) |

Entre parenthèses : le jeton de `src/styles/global.css`.

## Sur le site

| Emplacement | Fichier du site | Origine |
|---|---|---|
| En-tête (version couleur) et pied de page (version blanche) | `src/components/Logo.astro` | Symbole en SVG dans la page, nom en texte (police Manrope du site), proportions de `logo-horizontal-couleur.png` |
| Onglet du navigateur | `public/favicon.svg` | `symbole-couleur.svg`, écrit à la main |
| Onglet des navigateurs sans favicon SVG | `public/favicon.ico` (16 et 32 px) | `symbole-couleur.svg`, par `pnpm image:logo` |
| Écran d'accueil des iPhone | `public/apple-touch-icon.png` (180 px) | `icone-app.svg`, par `pnpm image:logo` |
| Données structurées (moteurs de recherche) | `public/logo.png` (512 px) | `symbole-couleur.svg`, par `pnpm image:logo` |
| Image de partage | `public/og.png` | `symbole-couleur.svg`, par `pnpm image:partage` |

Écarts avec l'archive :

- Le nom de l'en-tête et du pied de page est du texte, pas une image : il reste net à toutes les tailles et les lecteurs d'écran le lisent.
- En mode sombre, le favicon SVG prend les couleurs de la version blanche : sur un onglet sombre, le demi-disque bleu nuit ne se voit presque pas.
- L'icône Apple est carrée, sans coins arrondis : iOS arrondit lui-même les coins et remplit la transparence en noir.

## Changer le logo

1. Remplacez les fichiers de ce dossier (mêmes noms).
2. Si le dessin du symbole change : copiez les tracés (attributs `d`) dans `src/components/Logo.astro` et `public/favicon.svg`. `pnpm test` vérifie qu'ils sont les mêmes que dans `svg/symbole-couleur.svg`.
3. Si les couleurs changent : mettez à jour les jetons de `src/styles/global.css`, `public/favicon.svg` et le tableau ci-dessus.
4. Lancez `pnpm image:logo` et `pnpm image:partage`.
