// Opprett kartet
const map = L.map('map', { zoomControl: false }).setView([55.5, 11.5], 4);

// Legger til zoom
L.control.zoom({ position: 'bottomright' }).addTo(map);

// Legg til bakgrunnskart (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
