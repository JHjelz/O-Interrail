// Fyller høyre meny med knapper for lenker til bloggen

const lenker = [
    "https://ogruppa.org.ntnu.no/2025/06/24/__trashed/",
    "https://ogruppa.org.ntnu.no/2025/06/25/interrail-o-1/",
    "https://ogruppa.org.ntnu.no/2025/06/26/interrail-o-2/",
    "https://ogruppa.org.ntnu.no/2025/06/27/interrail-o-3/",
    "https://ogruppa.org.ntnu.no/2025/06/28/interrail-o-4/",
    "https://ogruppa.org.ntnu.no/2025/06/29/interrail-o-5/",
    "https://ogruppa.org.ntnu.no/2025/06/30/interrail-o-6/",
    "https://ogruppa.org.ntnu.no/2025/07/01/interrail-o-7/",
    "https://ogruppa.org.ntnu.no/2025/07/02/interrail-o-8/",
    "https://ogruppa.org.ntnu.no/2025/07/03/interrail-o-9/",
    "https://ogruppa.org.ntnu.no/2025/07/04/interrail-o-10/",
    "https://ogruppa.org.ntnu.no/2025/07/05/interrail-o-11/"
];

const menyContainer = document.getElementById("meny");

const topNews = lagDiv("menyDiv");
const newsContainer = lagDiv("menyDiv");

newsContainer.style.display = "flex";
newsContainer.style.flexDirection = "column";
newsContainer.style.flexGrow = lenker.length;
newsContainer.style.overflowY = "auto";

for (let i = 0; i < lenker.length; i++) {
    const url = lenker[i];
    const klasse = (i === lenker.length - 1) ? "blogg-knapp siste" : "blogg-knapp";
    const knapp = lagKnapp(
        `Dag #${i}`,
        `Dag${i}`,
        klasse,
        () => window.open(url, "_blank") // Åpner i ny fane
    );
    if (i == lenker.length - 1) {
        topNews.appendChild(knapp);
    } else {
        newsContainer.appendChild(knapp);
    }
}

menyContainer.appendChild(topNews);
menyContainer.appendChild(newsContainer);
