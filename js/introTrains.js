// O-INTERRAIL/js/introTrains.js

const train = document.getElementById("train");
const intro = document.getElementById("intro");
const content = document.getElementById("content");

train.addEventListener("animationend", () => {
    intro.style.transition = "opacity 0.8s";
    intro.style.opacity = 0;

    setTimeout(() => {
        intro.style.display = "none";
        content.style.display = "block";
    }, 800);
});
