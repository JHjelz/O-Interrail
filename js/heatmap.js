// O-INTERRAIL/js/heatmap.js

// Genererer heatmap i kartet

function heatmap(punkter) {
    const intensitet = 100;
    const data = punkter.map(lokasjon => [
        lokasjon.geometry.coordinates[1], // lat
        lokasjon.geometry.coordinates[0], // lon
        intensitet
    ]);
    
    const heat = L.heatLayer(data, { radius: 25, blur: 15, maxZoom: 10 });
    return heat; // returnerer laget
}

// Opprett heatmap-lag fra punktene
const heatLayer = heatmap(geoPunkter);

// Lag en bakgrunnslag-gruppe
const baseMaps = {
    "OpenStreetMap": osmLayer
};

// Overleggs-lag
const overlayMaps = {
    "Heatmap": heatLayer
};

// Legg til layer control
L.control.layers(baseMaps, overlayMaps, { position: "bottomright" }).addTo(map);

// Legg til heatmap som standard hvis ønsket
heatLayer.addTo(map);