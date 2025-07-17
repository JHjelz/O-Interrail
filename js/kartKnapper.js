// Funksjon som dynamisk genererer knapper for kartlag
function lagSidebarLagKontroller() {
    const sidebarContent = document.getElementById("sidebarContent");

    const lagSektion = (tittel, layers, leggTil, fjern) => {
        const seksjon = lagDiv("sidebar-section");
        const headerRad = lagDiv("seksjon-header");

        const overskrift = document.createElement("h4");
        overskrift.textContent = tittel;

        // Master toggle-knapp
        const masterKnapp = document.createElement("button");
        masterKnapp.className = "master-knapp";
        masterKnapp.onclick = () => {
            const pa = masterKnapp.style.backgroundColor === "green";
            console.log(pa);
            Array.from(document.getElementsByClassName(tittel)).forEach(button => {
                if (button.style.backgroundColor === "green") {
                    console.log("green");
                    if (pa) {
                        console.log("Turns of");
                        button.click();
                    }
                } else if (button.style.backgroundColor === "red") {
                    console.log("red");
                    if (!pa) {
                        console.log("Turns on");
                        button.click();
                    }
                }
            });
            if (pa) {
                masterKnapp.classList.add("av");
            } else {
                masterKnapp.classList.remove("av");
            }
            /*
            const paKartet = Object.values(layers)[0]._map !== null;
            Object.values(layers).forEach(layer => {
                if (paKartet) {
                    fjern(layer);
                    masterKnapp.classList.add("av");
                } else {
                    leggTil(layer);
                    masterKnapp.classList.remove("av");
                }
            });
            */
        };

        headerRad.appendChild(overskrift);
        headerRad.appendChild(masterKnapp);

        const knappContainer = lagDiv("knappContainer")

        // En knapp per element
        for (const [id, lag] of Object.entries(layers)) {
            const knapp = document.createElement("button");
            knapp.textContent = id;
            knapp.className = "lag-knapp";
            knapp.classList.add(tittel);
            knapp.onclick = () => {
                const paKartet = lag._map !== null;
                if (paKartet) {
                    fjern(lag);
                    knapp.classList.add("av");
                } else {
                    leggTil(lag);
                    knapp.classList.remove("av");
                }
            };
            knappContainer.appendChild(knapp);
        }

        seksjon.appendChild(headerRad);
        seksjon.appendChild(knappContainer);

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
