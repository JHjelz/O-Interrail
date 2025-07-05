// Fyller høyre meny med knapper for lenker til bloggen

const lenker = [
    "https://ogruppa.org.ntnu.no/2025/06/24/__trashed/",
    "https://ogruppa.org.ntnu.no/2025/06/25/interrail-o-1/",
    "https://ogruppa.org.ntnu.no/2025/06/26/interrail-o-2/"
]

const menyContainer = document.getElementById("meny")

for (let i = 0; i < lenker.length; i++) {
    const url = lenker[i];
    const knapp = lagKnapp(
        `Dag #${i}`,
        `Dag${i}`,
        "blogg-knapp",
        () => window.open(url, "_blank") // Åpner i ny fane
    );
    menyContainer.appendChild(knapp);
}