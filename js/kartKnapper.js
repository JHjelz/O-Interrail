// Funksjon som dynamisk genererer knapper for kartlag
function lagSidebarLagKontroller() {
    sidebarContent.innerHTML = ""; // Tomt innhold fra start

    const lagSection = (tittel, layers, leggTil, fjern) => {
        const seksjon = lagDiv("sidebar-section");
        const overskrift = document.createElement("h4");
        overskrift.textContent = tittel;
        seksjon.appendChild(overskrift);

        // Master toggle-knapp
        const masterKnapp = lagKnapp(
            "Skru av/på alle",
            "",
            "master-knapp",
            fjernAlt
        );
        seksjon.appendChild(masterKnapp);

        // Én knapp per element
        for (const [id, lag] of Object.entries(layers)) {
            const knapp = lagKnapp(
                id,
                "",
                "lag-knapp",
                fjernEttLag(lag)
            );
            seksjon.appendChild(knapp);
        }
        sidebarContent.appendChild(seksjon);
    };

    // Lag linje-seksjon
    lagSection("Linjer", lineLayers,
        lag => lag.addTo(map),
        lag => map.removeLayer(lag)
    );

    // Lag punkt-seksjon (via cluster)
    lagSection("Steder", markerLayers,
        lag => clusterGruppe.addLayer(lag),
        lag => clusterGruppe.removeLayer(lag)
    );
}

// Funksjon som fjerner alle kartlag
function fjernAlt() {
    const påKartet = Object.values(layers)[0]._map !== null;
    Object.values(layers).forEach(layer => {
        if (påKartet) {
            fjern(layer);
            masterKnapp.classList.add("av");
            } else {
            leggTil(layer);
            masterKnapp.classList.remove("av");
            }
    });
}

// Funksjon som fjerner ett kartlag
function fjernEttLag(lag) {
    const påKartet = lag._map !== null;
    if (påKartet) {
        fjern(lag);
        knapp.classList.add("av");
    } else {
        leggTil(lag);
        knapp.classList.remove("av");
    }
}
