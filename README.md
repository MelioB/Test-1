# ✦ Melio World

Petit site de fiches de personnages, s'adapte au **téléphone** et au **PC**.

## Ouvrir le site
Double-clique sur `index.html`, ou active **GitHub Pages** (Settings → Pages → branche `main`).

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `style.css` | Apparence (mode téléphone par défaut, mode PC via `body.layout-pc`) |
| `scrypte.js` | Fonctionnement (liste, fiche, navigation, choix du mode) |
| `database.js` | **Les personnages** — c'est ici qu'on ajoute / modifie |
| `image/` | Images des personnages |

## Ajouter un personnage
Dans `database.js`, copie un bloc et remplis-le :

```js
{
    id: "mirai",                 // lien direct : index.html#mirai
    name: "Mirai",
    nameStyle: "style-mirai",    // styles en bas de style.css
    accent: "#ff1e56",           // couleur du halo et des bordures
    faction: "Melio' Klasse",
    stats: "Texte libre\nsur plusieurs lignes",
    // ou des barres : stats: [ { label: "Force", value: 80 }, { label: "Vitesse", value: 65 } ],
    description: "…",
    image: "image/mirai.png"
}
```

## Navigation
- Clic sur un personnage dans la liste
- Boutons ‹ › ou flèches ← → du clavier
- Glisser à gauche / droite sur téléphone
- Bouton **Auto / 📱 / 🖥** en haut à droite pour forcer le mode d'affichage
