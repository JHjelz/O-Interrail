// Farger for stasjonstyper
const typeTilFarge = {
    start: "green",
    stasjon: "orange",
    slutt: "red",
    reise: "blue"
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
        const props = feature.properties;
        const type = props.type || 'stasjon';
        const farge = typeTilFarge[type] || 'orange';
        // Automatisk generering av rik popup
        const popup = `
            <strong>${props.navn}</strong><br>
            <table>
                <tr><td><b>Tid:</b></td><td>${props.tid || '-'}</td></tr>
                <tr><td><b>Spor:</b></td><td>${props.spor || '-'}</td></tr>
                <tr><td><b>Land:</b></td><td>${props.land || '-'}</td></tr>
            </table>
        `;
        return L.marker(latlng, { icon: lagIkon(farge) }).bindPopup(popup);
      },

      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        if (feature.geometry.type === 'LineString') {
            const farge = typeTilFarge(props.type);
            layer.setStyle({ color: color, weight: 4 });
            const popup = `
                <strong>${props.navn}</strong><br>
                <table>
                <tr><td><b>Reise-ID:</b></td><td>${props.reiseId || '-'}</td></tr>
                <tr><td><b>Lengde:</b></td><td>${props.lengde || '-'}</td></tr>
                <tr><td><b>Varighet:</b></td><td>${props.varighet || '-'}</td></tr>
                </table>
            `;
          layer.bindPopup(feature.properties.navn);
        }
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Klarte ikke å laste GeoJSON:', error);
  });
