// Farger for ulike egenskaper (linjer / stasjoner)
const typeTilFarge = {
    start: "#28a745",        // Grønn
    stasjon: "#fd7e14",      // Oransje
    overnatting: "#ffc107",  // Gul
    slutt: "#dc3545",        // Rød
    Tog: "#007bff",          // Blå
    Buss: "#6f42c1"          // Lilla
};

// Symboler for ulike egenskaper
const typeTilIkon = {
    start: 'bi-geo-alt-fill',
    stasjon: 'bi-train-front-fill',
    overnatting: 'bi-house-door-fill',
    slutt: 'bi-flag-fill'
}

const clusterGruppe = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();
        // Fargelegging basert på antall objekter i klyngen
        let c = ' marker-cluster-smal';
        if (count < 3) {
            c = ' marker-cluster-green';
        } else if (count < 6) {
            c = ' marker-cluster-orange';
        } else {
            c = ' marker-cluster-red';
        }
        return new L.DivIcon({
            html: `<div><span>${count}</span></div>`,
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40)
        });
    }
});

// Lagring av hvert unike objekt
const markerLayers = {};
const lineLayers = {};

// Funksjon: hent ikon basert på type
function lagIkon(kategori) {
    const farge = typeTilFarge[kategori] || "gray";
    const ikon = typeTilIkon[kategori] || "bi-pin-map";
    return L.divIcon({
        html: `<div class="custom-marker" style="background-color:${farge};">
                 <i class="bi ${ikon}" style="color:white;"></i>
               </div>`,
        className: 'leaflet-bootstrap-icon',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [0, -40]
    });
}

// Last inn GeoJSON

fetch('reiser.geojson')
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
        const props = feature.properties;
        const type = feature.geometry.type;
        const id = props.navn;
        
        // Punkt
        if (type == "Point") {
            const coords = feature.geometry.coordinates.slice();
            // Automatisk generering av rik popup
            const popup = `
                <strong>${props.navn}</strong><br>
                (${coords[1].toFixed(3)}, ${coords[0].toFixed(3)})<br>
                <table>
                    <tr><td><b>Land:</b></td><td>${props.land || '-'}</td></tr>    
                    <tr><td><b>Ankomst:</b></td><td>${props.ankomst || '-'}</td></tr>
                    <tr><td><b>Avgang:</b></td><td>${props.avgang || '-'}</td></tr>
                    <tr><td><b>Spor:</b></td><td>${props.spor || '-'}</td></tr>
                </table>
            `;
            const marker = L.marker(coords.reverse(), {
                icon: lagIkon(props.type)
            }).bindPopup(popup);

            markerLayers[id] = marker;
    
            clusterGruppe.addLayer(marker);
        }
        
        // Linjer
        else if (type == 'LineString') {
            const popup = `
                <strong>${props.navn}</strong><br>
                ${props.dato}<br>
                ${props.fremkomstmiddel}<br>
                <table>
                <tr><td><b>Reise-ID:</b></td><td>${props.reiseID || '-'}</td></tr>
                <tr><td><b>Togbytter:</b></td><td>${props.bytter || '-'}</td></tr>
                <tr><td><b>Varighet:</b></td><td>${props.varighet || '-'}</td></tr>
                </table>
            `;
            const linje = L.polyline(feature.geometry.coordinates.map(coord => coord.slice().reverse()), {
                color: typeTilFarge[props.fremkomstmiddel],
                weight: 4,
                opacity: 0.7
            }).bindPopup(popup);

            lineLayers[id] = linje;

            linje.addTo(map);
        }
    });
    
    // Legger til clustering
    map.addLayer(clusterGruppe);

    lagSidebarLagKontroller();
  })
  .catch(error => console.error('Klarte ikke å laste GeoJSON:', error));
