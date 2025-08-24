// O-INTERRAIL/js/kartKnapper.js

// Funksjon som dynamisk genererer knapper for kartlag
function lagSidebarLagKontroller() {
    const sidebarContent = document.getElementById("sidebarContent");

    const lagSektion = (tittel, layers, leggTil, fjern, alltidPaaKartet = false) => {
        const seksjon = lagDiv("sidebar-section");
        const headerRad = lagDiv("seksjon-header");

        const overskrift = document.createElement("h4");
        overskrift.textContent = tittel;

        // Master toggle-knapp
        const masterKnapp = document.createElement("button");
        masterKnapp.className = "master-knapp";
        masterKnapp.onclick = () => {
            const pa = !masterKnapp.classList.contains("av");
            Array.from(document.getElementsByClassName(tittel)).forEach(button => {
                if (!button.classList.contains("av")) {
                    if (pa) {
                        button.click();
                    }
                } else if (button.classList.contains("av")) {
                    if (!pa) {
                        button.click();
                    }
                }
            });
            if (pa) {
                masterKnapp.classList.add("av");
            } else {
                masterKnapp.classList.remove("av");
            }
        };

        headerRad.appendChild(overskrift);
        headerRad.appendChild(masterKnapp);

        const knappContainer = lagDiv("knappContainer")

        // En knapp per element
        for (const [id, lag] of Object.entries(layers)) {
            const rad = lagDiv("lag-rad");
            
            const navn = document.createElement("span");
            navn.textContent = id;
            navn.className = "lag-navn";

            const zoomKnapp = document.createElement("button");
            zoomKnapp.className = "zoom-knapp";
            zoomKnapp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>';

            const knapp = document.createElement("button");
            knapp.className = "lag-knapp";
            knapp.classList.add(tittel);

            leggTil(lag); // Start-tilstand

            // Hjelpe-funksjon
            const erLinje = (lyr) => {
                if (lyr instanceof L.Polyline) return true;
                if (lyr instanceof L.GeoJSON) {
                    let harLinje = false;
                    lyr.eachLayer(l => { if (l instanceof L.Polyline) harLinje = true; });
                    return harLinje;
                }
                return false;
            }

            zoomKnapp.onclick = () => {
                const paKartet = alltidPaaKartet ? clusterGruppe.hasLayer(lag) : (lag._map !== null);
                if (!paKartet) leggTil(lag);
                if (typeof lag.getBounds === "function") {
                    const b = lag.getBounds();
                    if (b && b.isValid && b.isValid()) {
                        map.fitBounds(b, { padding: [20, 20], maxZoom: 12 });
                    }
                } else if (typeof lag.getLatLng === "function") {
                    map.setView(lag.getLatLng(), 12);
                }
                const startSnake = (lyr) => {
                    if (typeof lyr.snakeIn === "function") {
                        if (lyr.options) {
                            lyr.options.snakingSpeed = lyr.options.snakingSpeed || 400;
                        }
                        lyr.snakeIn();
                    }
                };
                if (erLinje(lag)) {
                    if (lag instanceof L.GeoJSON) {
                        lag.eachLayer(l => { if (l instanceof L.Polyline) startSnake(l); });
                    } else {
                        startSnake(lag);
                    }
                }
            };

            knapp.onclick = () => {
                const paKartet = alltidPaaKartet ? clusterGruppe.hasLayer(lag) : (lag._map !== null);
                if (paKartet) {
                    fjern(lag);
                    knapp.classList.add("av");
                } else {
                    leggTil(lag);
                    knapp.classList.remove("av");
                }
            };
            rad.appendChild(navn);
            rad.appendChild(zoomKnapp);
            rad.appendChild(knapp);
            knappContainer.appendChild(rad);
        }

        seksjon.appendChild(headerRad);
        seksjon.appendChild(knappContainer);

        sidebarContent.appendChild(seksjon);

        // Hvis laget skal alltid være på kartet (f.eks. clusterGruppe), legg det til
        if (alltidPaaKartet) {
            if (!map.hasLayer(clusterGruppe)) {
                map.addLayer(clusterGruppe);
            }
        }
    };

    // Lag linje-seksjon
    lagSektion("Linjer", lineLayers,
        lag => lag.addTo(map),
        lag => map.removeLayer(lag)
    );

    // Lag punkt-seksjon (via cluster)
    lagSektion("Steder", markerLayers,
        lag => clusterGruppe.addLayer(lag),
        lag => clusterGruppe.removeLayer(lag),
        true
    );
}
