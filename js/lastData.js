// Farger for stasjonstyper
const typeTilFarge = {
    start: "green",
    stasjon: "orange",
    stopp: "red",
};

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
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        const type = feature.properties.type || 'stasjon';
        const farge = typeTilFarge[type] || 'orange';
        return L.marker(latlng, { icon: lagIkon(farge) })
          .bindPopup(`${feature.properties.navn}`);
      },
      onEachFeature: function (feature, layer) {
        if (feature.geometry.type === 'LineString') {
          const color = feature.properties.farge || 'blue';
          layer.setStyle({ color: color, weight: 4 });
          layer.bindPopup(feature.properties.navn);
        }
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Klarte ikke å laste GeoJSON:', error);
  });

/*
// Lag en marker cluster-gruppe
const markers = L.markerClusterGroup();

// Funksjon for å lage markør med tilpasset ikon
function lagMarkor(lat, lng, farge, tekst) {
  const ikon = L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${farge}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const markor = L.marker([lat, lng], { icon: ikon }).bindPopup(tekst);
  markers.addLayer(markor);
}

// Legg til mange markører
lagMarkor(59.91, 10.75, 'red', 'Rød markør');
lagMarkor(59.92, 10.76, 'blue', 'Blå markør');
lagMarkor(59.915, 10.74, 'green', 'Grønn markør');
lagMarkor(59.913, 10.77, 'orange', 'Oransje markør');
lagMarkor(59.914, 10.755, 'violet', 'Lilla markør');

markers.addTo(map);
*/
