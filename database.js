/* =========================================================
   BASE DE DONNÉES DES PERSONNAGES
   ---------------------------------------------------------
   Pour ajouter un personnage, copie un bloc { ... } et
   remplis les champs. Tous les champs sauf "id" et "name"
   sont optionnels.

   - id          : identifiant unique (minuscules, sans espace)
                   -> sert aussi de lien direct : index.html#grim
   - name        : nom affiché
   - nameStyle   : style du nom (voir la fin de style.css)
   - accent      : couleur principale du personnage (halo, bordures)
   - faction     : faction / groupe
   - stats       : texte libre (les retours à la ligne "\n" sont gardés)
                   OU une liste de barres :
                   [ { label: "Force", value: 80 }, ... ]  (valeur 0-100)
   - description : texte libre (les "\n" sont gardés)
   - image       : chemin vers l'image (ex : "image/grim1.png")
   ========================================================= */

window.charactersDatabase = [
    {
        id: "grim",
        name: "Grim",
        nameStyle: "style-grim",
        accent: "#ff3b1f",
        faction: "Melio' Klasse",
        stats: "Wait and See",
        description: "Eine dumme Ziege",
        image: "image/grim1.png"
    },
    {
        id: "gabriel",
        name: "Gabriel",
        nameStyle: "style-gabriel",
        accent: "#ffd76a",
        faction: "Melio' Klasse",
        stats: "Stärker als Grim",
        description: "",
        image: "image/gabriel.png"
    },
    {
        id: "melio",
        name: "Melio",
        nameStyle: "style-melio",
        accent: "#ffb300",
        faction: "",
        stats: "",
        description: "",
        image: ""
    },
    {
        id: "mirai",
        name: "Mirai",
        nameStyle: "style-mirai",
        accent: "#ff1e56",
        faction: "",
        stats: "",
        description: "",
        image: ""
    },
    {
        id: "shidou",
        name: "Shidou",
        nameStyle: "style-shidou",
        accent: "#7b2ff7",
        faction: "",
        stats: "",
        description: "",
        image: ""
    }
];
