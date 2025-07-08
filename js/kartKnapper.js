// Funksjon som dynamisk genererer knapper for kartlag
function lagSidebarLagKontroller() {
    sidebarContent.innerHTML = ""; // Tomt innhold fra start

    const lagSektion = (tittel, layers, leggTil, fjern) => {
        const seksjon = document.createElement("div");
        seksjon.className = "sidebar-section";

        const overskrift = document.createElement("h4");
        overskrift.textContent = tittel;
        seksjon.appendChild(overskrift);

        // Master toggle-knapp
        const masterKnapp = document.createElement("button");
        masterKnapp.textContent = "Skru av/på alle";
        masterKnapp.onclick = () => {
            const påKartet = Object.values(layers)[0]._map !== null;
            Object.values(layers).forEach(layer => {
                if (påKartet) fjern(layer); else leggTil(layer);
            });
        };
        seksjon.appendChild(masterKnapp);

        // En knapp per element
        for (const [id, lag] of Object.entries(layers)) {
            const knapp = document.createElement("button");
            knapp.textContent = id;
            knapp.className = "lag-knapp";
            knapp.onclick = () => {
                const påKartet = lag._map !== null;
                if (påKartet) {
                    fjern(lag);
                    knapp.classList.add("av");
                } else {
                    leggTil(lag);
                    knapp.classList.remove("av");
                }
            };
            seksjon.appendChild(knapp);
        }

        sidebarContent.appendChild(seksjon);
    };

    // Lag linje-seksjon
    lagSektion("Linjer", lineLayers,
        lag => lag.addTo(map),
        lag => map.removeLayer(lag)
    );

    // Lag punkt-seksjon (via cluster)
    lagSektion("Steder", markerLayers,
        lag => clusterGruppe.addLayer(lag),
        lag => clusterGruppe.removeLayer(lag)
    );
}
