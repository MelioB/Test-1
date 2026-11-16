function initApp() {
    const selectMenu = document.getElementById("character-select");
    const nameEl = document.getElementById("char-name");
    const factionEl = document.getElementById("char-faction");
    const statsEl = document.getElementById("char-stats");
    const descEl = document.getElementById("char-description");
    const imgEl = document.getElementById("char-image");

    const db = window.charactersDatabase;

    if (!db || db.length === 0) {
        nameEl.textContent = "Erreur DB";
        return;
    }

    // Vider le menu avant de le remplir
    selectMenu.innerHTML = "";

    // Remplir le menu déroulant
    db.forEach((char, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = char.name;
        selectMenu.appendChild(option);
    });

    // Afficher un personnage
    function displayCharacter(index) {
        const char = db[index];
        if (!char) return;

        nameEl.textContent = char.name;
        nameEl.className = char.nameStyle || "style-default";

        factionEl.textContent = char.faction || "—";
        statsEl.innerHTML = char.stats ? char.stats.replace(/\n/g, "<br>") : "";
        descEl.innerHTML = char.description ? char.description.replace(/\n/g, "<br>") : "";

        if (char.image) {
            imgEl.src = char.image;
            imgEl.style.display = "block";
        } else {
            imgEl.src = "";
            imgEl.style.display = "none";
        }
    }

    selectMenu.addEventListener("change", (e) => {
        displayCharacter(e.target.value);
    });

    // Afficher le premier personnage
    displayCharacter(0);
}

// Lance le script dès que la page est prête (ou immédiatement si déjà prête)
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}