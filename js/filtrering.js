// O-INTERRAIL/js/filtrering.js

// Boksen med filtreringsfunksjonalitet
const filterBox = lagDiv("filter-box");
filterBox.innerHTML = `
  <h2>Filtrering</h2>
  <div>
    <label>
      <input type="checkbox" id="filterOvernatting">
      Vis kun byer med overnatting
    </label>
  </div>
  <div>
    <label for="filterLand">Filtrer på land:</label>
    <select id="filterLand">
      <option value="">Alle land</option>
    </select>
  </div>
  <button id="resetFilter">Nullstill filter</button>
`;

// Bakgrunn for demping av skjermen når boksen er åpen
const overlay = lagDiv("filter-overlay");

// Knapp for å åpne filter-boksen
const apneFilter = lagKnappIkon(
    () => {
        overlay.style.display = "flex";
        filterBox.style.display = "block";
    },
    "bi-filter-square-fill",
    "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1M4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5",
    "apneFilterKnapp",
    { bottom: "10px", left: "80px" },
    "orangered"
);

// Lukkeknapp inne i boksen
const lukkFilter = lagKnappIkon(
    () => {
        overlay.style.display = "none";
        filterBox.style.display = "none";
    },
    "bi-x-circle-fill",
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z",
    "lukkFilterKnapp",
    { top: "10px", right: "10px" },
    "white"
);

// Klikk på overlay lukker også
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
        filterBox.style.display = "none";
    }
});

// Lytt til toggle-event fra sidemeny
document.addEventListener("sideMenyToggle", (e) => {
    if (e.detail.open) {
        // Menyen er åpen → flytt til høyre
        apneFilter.style.left = "calc(30px + 20vw)";
    } else {
        // Menyen er lukket → tilbake til start
        apneFilter.style.left = "80px";
    }
});

document.body.appendChild(overlay);
overlay.appendChild(filterBox);
container.appendChild(apneFilter);

// Justerer filtreringen
function oppdaterFiltrering() {
    const kunOvernatting = document.getElementById("filterOvernatting").checked;
    const valgtLand = document.getElementById("filterLand").value;

    // --- Punkter (markers) ---
    clusterGruppe.clearLayers();
    for (const [id, marker] of Object.entries(markerLayers)) {
        const props = marker.feature?.properties || {};
        let vis = true;

        if (kunOvernatting && props.type !== "overnatting") vis = false;
        if (valgtLand && props.land !== valgtLand) vis = false;

        if (vis) clusterGruppe.addLayer(marker);
    }

    // --- Linjer ---
    for (const [id, linje] of Object.entries(lineLayers)) {
        const props = linje.feature?.properties || {};
        let vis = true;

        if (valgtLand && props.land !== valgtLand) vis = false;

        if (vis) {
            linje.addTo(map);
        } else {
            map.removeLayer(linje);
        }
    }
}

// Aktivere filter-knappene
document.addEventListener("DOMContentLoaded", () => {
    const filterOvernatting = document.getElementById("filterOvernatting");
    const filterLand = document.getElementById("filterLand");
    const resetBtn = document.getElementById("resetFilter");

    if (filterOvernatting) filterOvernatting.addEventListener("change", oppdaterFiltrering);
    if (filterLand) filterLand.addEventListener("change", oppdaterFiltrering);
    if (resetBtn) resetBtn.addEventListener("click", () => {
        filterOvernatting.checked = false;
        filterLand.value = "";
        oppdaterFiltrering();
    });
});

// Henter alle land
document.addEventListener("dataLastet", (e) => {
    const landListe = e.detail.alleLand;
    const filterLand = document.getElementById("filterLand");
    landListe.sort().forEach(land => {
        const opt = document.createElement("option");
        opt.value = land;
        opt.textContent = land;
        filterLand.appendChild(opt);
    });
    oppdaterFiltrering();
});
