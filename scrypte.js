/* =========================================================
   MELIO WORLD — Script principal
   - Génère la liste des personnages depuis database.js
   - Affiche la fiche du personnage choisi
   - Mode d'affichage : Auto / Téléphone / PC (mémorisé)
   - Navigation : clic, flèches du clavier, glisser (mobile),
     lien direct (index.html#grim)
   ========================================================= */

(function () {
    "use strict";

    const PC_BREAKPOINT = "(min-width: 900px)";
    const STORAGE_KEY = "melio-view-mode";

    const $ = (id) => document.getElementById(id);

    function initApp() {
        const db = Array.isArray(window.charactersDatabase) ? window.charactersDatabase : [];

        const el = {
            list: $("roster-list"),
            sheet: $("sheet"),
            name: $("char-name"),
            counter: $("char-counter"),
            faction: $("char-faction"),
            stats: $("char-stats"),
            desc: $("char-description"),
            img: $("char-image"),
            placeholder: $("char-placeholder"),
            initial: $("char-initial"),
            prev: $("prev-btn"),
            next: $("next-btn")
        };

        $("year").textContent = new Date().getFullYear();
        initViewMode();

        if (db.length === 0) {
            el.name.textContent = "Keine Charaktere";
            el.desc.textContent = "Prüfe, ob database.js geladen ist.";
            return;
        }

        let current = -1;

        /* ---------- Liste des personnages ---------- */
        const buttons = db.map((char, index) => {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "roster-item";
            btn.style.setProperty("--c", char.accent || "#7928ca");

            const avatar = document.createElement("span");
            avatar.className = "avatar";
            if (char.image) {
                const img = document.createElement("img");
                img.src = char.image;
                img.alt = "";
                img.loading = "lazy";
                avatar.appendChild(img);
            } else {
                avatar.textContent = (char.name || "?").charAt(0);
            }

            const text = document.createElement("span");
            text.className = "roster-text";
            const name = document.createElement("span");
            name.className = "roster-name";
            name.textContent = char.name;
            const faction = document.createElement("span");
            faction.className = "roster-faction";
            faction.textContent = char.faction || "Unbekannte Fraktion";
            text.append(name, faction);

            btn.append(avatar, text);
            btn.addEventListener("click", () => show(index));

            li.appendChild(btn);
            el.list.appendChild(li);
            return btn;
        });

        /* ---------- Affichage d'une fiche ---------- */
        function setText(node, value, emptyText) {
            const text = typeof value === "string" ? value.trim() : "";
            node.textContent = text || emptyText;
            node.classList.toggle("empty", !text);
        }

        function renderStats(stats) {
            el.stats.replaceChildren();
            el.stats.classList.remove("empty");

            // Liste de barres : [{ label, value }]
            if (Array.isArray(stats) && stats.length) {
                stats.forEach((s) => {
                    const value = Math.max(0, Math.min(100, Number(s.value) || 0));
                    const row = document.createElement("div");
                    row.className = "stat-row";
                    row.innerHTML =
                        '<span class="stat-label"></span>' +
                        '<span class="stat-bar"><span></span></span>' +
                        '<span class="stat-value"></span>';
                    row.querySelector(".stat-label").textContent = s.label;
                    row.querySelector(".stat-bar span").style.width = value + "%";
                    row.querySelector(".stat-value").textContent = value;
                    el.stats.appendChild(row);
                });
                return;
            }

            setText(el.stats, stats, "Kräfte & Fähigkeiten folgen…");
        }

        function show(index, options = {}) {
            const total = db.length;
            index = ((index % total) + total) % total;   // boucle au début / à la fin
            if (index === current) return;
            current = index;

            const char = db[index];
            const accent = char.accent || "#7928ca";
            document.documentElement.style.setProperty("--accent", accent);

            el.name.textContent = char.name;
            el.name.className = char.nameStyle || "style-default";
            el.counter.textContent = (index + 1) + " / " + total;
            el.faction.textContent = char.faction || "—";

            renderStats(char.stats);
            setText(el.desc, char.description, "Beschreibung folgt…");

            el.img.parentElement.classList.toggle("fill", char.imageFit === "cover");

            if (char.image) {
                el.img.src = char.image;
                el.img.alt = "Porträt von " + char.name;
                el.img.hidden = false;
                el.placeholder.hidden = true;
            } else {
                el.img.removeAttribute("src");
                el.img.alt = "";
                el.img.hidden = true;
                el.initial.textContent = (char.name || "?").charAt(0);
                el.placeholder.hidden = false;
            }

            buttons.forEach((b, i) => b.setAttribute("aria-current", i === index ? "true" : "false"));
            buttons[index].scrollIntoView({ block: "nearest", inline: "center", behavior: options.instant ? "auto" : "smooth" });

            // Petite animation à chaque changement
            el.sheet.classList.remove("fade-in");
            void el.sheet.offsetWidth;
            el.sheet.classList.add("fade-in");

            document.title = char.name + " — Melio World";
            if (char.id && location.hash !== "#" + char.id) {
                history.replaceState(null, "", "#" + char.id);
            }
        }

        function indexFromHash() {
            const id = decodeURIComponent(location.hash.slice(1)).toLowerCase();
            const i = db.findIndex((c) => (c.id || "").toLowerCase() === id);
            return i >= 0 ? i : 0;
        }

        /* ---------- Navigation ---------- */
        el.prev.addEventListener("click", () => show(current - 1));
        el.next.addEventListener("click", () => show(current + 1));

        document.addEventListener("keydown", (e) => {
            if (e.target.closest("input, textarea, select")) return;
            if (e.key === "ArrowLeft") show(current - 1);
            if (e.key === "ArrowRight") show(current + 1);
        });

        window.addEventListener("hashchange", () => show(indexFromHash()));

        // Glisser à gauche / droite sur la fiche (téléphone)
        let startX = 0, startY = 0;
        el.sheet.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        el.sheet.addEventListener("touchend", (e) => {
            const dx = e.changedTouches[0].clientX - startX;
            const dy = e.changedTouches[0].clientY - startY;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                show(dx < 0 ? current + 1 : current - 1);
            }
        }, { passive: true });

        // Précharger les images pour un changement instantané
        db.forEach((c) => { if (c.image) new Image().src = c.image; });

        show(indexFromHash(), { instant: true });
    }

    /* ---------- Mode d'affichage : Auto / Téléphone / PC ---------- */
    function initViewMode() {
        const media = window.matchMedia(PC_BREAKPOINT);
        const switchButtons = document.querySelectorAll(".view-switch button");
        let mode = "auto";
        try { mode = localStorage.getItem(STORAGE_KEY) || "auto"; } catch (e) { /* stockage indisponible */ }

        function apply() {
            const effective = mode === "auto" ? (media.matches ? "pc" : "mobile") : mode;
            document.body.classList.toggle("layout-pc", effective === "pc");
            document.body.classList.toggle("layout-mobile", effective === "mobile");
            switchButtons.forEach((b) => {
                const active = b.dataset.mode === mode;
                b.classList.toggle("active", active);
                b.setAttribute("aria-pressed", active ? "true" : "false");
            });
        }

        switchButtons.forEach((b) => b.addEventListener("click", () => {
            mode = b.dataset.mode;
            try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) { /* ignore */ }
            apply();
        }));

        media.addEventListener("change", apply);
        apply();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApp);
    } else {
        initApp();
    }
})();
