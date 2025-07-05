// Opprett kartet
const map = L.map('map').setView([55.5, 11.5], 4);

// Legg til bakgrunnskart (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
