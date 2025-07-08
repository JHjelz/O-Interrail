// Funksjonalitet for å åpne sidemenyen i kartet

let menyOpen = false; // Er den åpen eller ikke?
const sideMeny = lagDiv("sideMeny"); // Selve menyen

const container = document.getElementById("map"); // Der en vil plassere menyen

// Åpne og lukke menyen
function openSideMeny() {
    menyOpen = !menyOpen;
    if (menyOpen) {
        sideMeny.classList.add("åpen");
        åpneKnapp.style.display = "none";
    } else {
        sideMeny.classList.remove("åpen");
        åpneKnapp.style.display = "block";
    }
}

// Knapper for å åpne og lukke menyen
const åpneKnapp = lagKnappIkon(
    openSideMeny,
    "bi-plus-circle-fill", 
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z",
    "sidebarOpener",
    { bottom: "10px", left: "10px" },
    "orangered"
);

const lukkeKnapp = lagKnappIkon(
    openSideMeny,
    "bi-x-circle-fill",
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z",
    "lukkSidebarKnapp",
    { top: "15px", right: "15px" },
    "white"
);

// Innholdet i menyen

const dataTittel = lagDiv("overskrift"); // Overskrift
dataTittel.innerHTML = "Data";

const header = lagDiv("sidebar-header"); // Header

header.appendChild(dataTittel); // ... som holder kontroll på overskrift
header.appendChild(lukkeKnapp); // ... og lukke-knapp
sideMeny.appendChild(header);

// Tom container for dynamisk innhold
const sidebarContent = lagDiv("sidebar-content");
sideMeny.appendChild(sidebarContent);

// Legg innholdet til i kartet
container.appendChild(sideMeny);
container.appendChild(åpneKnapp);

// Forhindrer interaksjon med kartet når musepekeren er over sidebar
sideMeny.addEventListener("mouseenter", () => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
});

sideMeny.addEventListener("mouseleave", () => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
});
