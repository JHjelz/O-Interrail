// Farger for ulike egenskaper (linjer / stasjoner)
const typeTilFarge = {
    start: "green",
    stasjon: "orange",
    slutt: "red",
    reise: "blue"
};

const clusterGruppe = L.markerClusterGroup();

// Funksjon: hent ikon basert på type
function lagIkon(farge) {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${farge}.png`,
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}

// Last inn GeoJSON
fetch('reiser.geojson')
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
        const props = feature.properties;
        const type = feature.geometry.type;
        
        // Punkt
        if (type == "Point") {
            const farge = typeTilFarge[props.type] || "orange";
            // Automatisk generering av rik popup
            const popup = `
                <strong>${props.navn}</strong><br>
                <table>
                    <tr><td><b>Tid:</b></td><td>${props.tid || '-'}</td></tr>
                    <tr><td><b>Spor:</b></td><td>${props.spor || '-'}</td></tr>
                    <tr><td><b>Land:</b></td><td>${props.land || '-'}</td></tr>
                </table>
            `;
            const marker = L.marker(feature.geometry.coordinates.reverse(), {
                icon: lagIkon(farge)
            }).bindPopup(popup);
    
            clusterGruppe.addLayer(marker);
        }
        
        // Linjer
        else if (type == 'LineString') {
            const popup = `
                <strong>${props.navn}</strong><br>
                <table>
                <tr><td><b>Reise-ID:</b></td><td>${props.reiseId || '-'}</td></tr>
                <tr><td><b>Lengde:</b></td><td>${props.lengde || '-'}</td></tr>
                <tr><td><b>Varighet:</b></td><td>${props.varighet || '-'}</td></tr>
                </table>
            `;
            const linje = L.polyline(feature.geometry.coordinates.map(coord => coord.slice().reverse()), {
                color: typeTilFarge[props.type],
                weight: 4,
                opacity: 0.7
            }).bindPopup(popup);
            linje.addTo(map)
        }
    });
    
    // Legger til clustering
    map.addLayer(clusterGruppe);
  })
  .catch(error => console.error('Klarte ikke å laste GeoJSON:', error));
