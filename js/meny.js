// O-INTERRAIL/js/meny.js

// Fyller venstre meny med knapper for lenker til bloggen

// Lenker til blogginnleggene
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
    "https://ogruppa.org.ntnu.no/2025/07/05/interrail-o-11/",
    "https://ogruppa.org.ntnu.no/2025/07/06/interrail-o-12/",
    "https://ogruppa.org.ntnu.no/2025/07/07/intarrail-o-13/",
    "https://ogruppa.org.ntnu.no/2025/07/08/interrail-o-14/",
    "https://ogruppa.org.ntnu.no/2025/07/09/interrail-o-15/",
    "https://ogruppa.org.ntnu.no/2025/07/10/interrail-o-16/",
    "https://ogruppa.org.ntnu.no/2025/07/12/interrail-o-17/",
    "https://ogruppa.org.ntnu.no/2025/07/13/interrail-o-18/",
    "https://ogruppa.org.ntnu.no/2025/07/14/interrail-o-19/",
    "https://ogruppa.org.ntnu.no/2025/07/15/interrail-o-20/",
    "https://ogruppa.org.ntnu.no/2025/07/16/interrail-o-21/",
    "https://ogruppa.org.ntnu.no/2025/07/17/interrail-o-22/",
    "https://ogruppa.org.ntnu.no/2025/07/18/interrail-o-23/",
    "https://ogruppa.org.ntnu.no/2025/07/19/interrail-o-24/",
    "https://ogruppa.org.ntnu.no/2025/07/20/interrail-o-25/",
    "https://ogruppa.org.ntnu.no/2025/07/21/interrail-o-26/",
    "https://ogruppa.org.ntnu.no/2025/07/22/interrail-o-27/",
    "https://ogruppa.org.ntnu.no/2025/07/23/interrail-o-28/",
    "https://ogruppa.org.ntnu.no/2025/07/24/interrail-o-29/",
    "https://ogruppa.org.ntnu.no/2025/07/26/interrail-o-30/",
    "https://ogruppa.org.ntnu.no/2025/07/26/interrail-o-31/",
    "https://ogruppa.org.ntnu.no/2025/07/28/interrail-o-32-finale/"
];

// Kule tog-ikoner
const togIkoner = [
    "icons/train1.svg",
    "icons/train2.svg",
    "icons/train3.svg",
    "icons/train4.svg",
    "icons/train5.svg",
    "icons/train6.svg",
    "icons/train7.svg"
];

const menyContainer = document.getElementById("meny"); // Menyen det skal fylles innhold i

const topNews = lagDiv("menyDiv"); // Siste blogg-innlegg
const newsContainer = lagDiv("menyDiv"); // Resterende blogg-innlegg

newsContainer.style.display = "flex"; // Fikserer oppsettet av alle blogg-knappene
newsContainer.style.flexDirection = "column";
newsContainer.style.flexGrow = lenker.length;
newsContainer.style.overflowY = "auto";

for (let i = 0; i < lenker.length; i++) {
    // Looper gjennom alle lenkene og genererer en knapp for hver av dem
    // Siste legges i "topNews" istedenfor "newsContainer"
    const url = lenker[i];
    let k = i;
    if (i >= 18) {
        k++;
    }
    const klasse = (i === lenker.length - 1) ? "blogg-knapp siste" : "blogg-knapp";
    const knapp = lagKnapp(
        `Dag #${k}`,
        `Dag${k}`,
        klasse,
        () => window.open(url, "_blank") // Gjør at siden åpnes i ny fane
    );
    const ikonURL = togIkoner[Math.floor(Math.random() * togIkoner.length)];
    const ikon = document.createElement("img");
    ikon.src = ikonURL;
    ikon.alt = "tog-ikon";
    ikon.className = "ikon";
    knapp.prepend(ikon);
    if (i == lenker.length - 1) {
        topNews.appendChild(knapp);
    } else {
        newsContainer.appendChild(knapp);
    }
}

// Legger elementene til i HTML
menyContainer.appendChild(topNews);
menyContainer.appendChild(newsContainer);
