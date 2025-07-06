// Farger for ulike egenskaper (linjer / stasjoner)
const typeTilFarge = {
    start: "green",
    stasjon: "orange",
    overnatting: "yellow",
    slutt: "red",
    Tog: "blue",
    Buss: "purple"
};

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
                (${feature.geometry.coordinates})<br>
                <table>
                    <tr><td><b>Land:</b></td><td>${props.land || '-'}</td></tr>    
                    <tr><td><b>Ankomst:</b></td><td>${props.ankomst || '-'}</td></tr>
                    <tr><td><b>Avgang:</b></td><td>${props.avgang || '-'}</td></tr>
                    <tr><td><b>Spor:</b></td><td>${props.spor || '-'}</td></tr>
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
                ${props.dato}<br>
                ${props.fremkomstmiddel}<br>
                <table>
                <tr><td><b>Reise-ID:</b></td><td>${props.reiseId || '-'}</td></tr>
                <tr><td><b>Togbytter:</b></td><td>${props.bytter || '-'}</td></tr>
                <tr><td><b>Varighet:</b></td><td>${props.varighet || '-'}</td></tr>
                </table>
            `;
            const linje = L.polyline(feature.geometry.coordinates.map(coord => coord.slice().reverse()), {
                color: typeTilFarge[props.fremkomstmiddel],
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
