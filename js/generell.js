// Generer div
function lagDiv(klasse) {
    const div = document.createElement("div");
    if (klasse) div.className = klasse;
    return div;
}

// Generer knapp
function lagKnapp(tekst, id, klasse, onclick) {
    const knapp = document.createElement("button");
    knapp.textContent = tekst;
    if (id) knapp.id = id;
    if (klasse) knapp.className = klasse;
    if (typeof onclick === "function") {
        knapp.addEventListener("click", onclick);
    }
    return knapp;
}
