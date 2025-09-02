// O-INTERRAIL/js/introTrains.js

document.addEventListener("DOMContentLoaded", () =>{
    const intro = document.getElementById("intro");
    const content = document.getElementById("content");
    const flagsContainer = document.getElementById("flags");

    function createFlags() {
    for (let i = 0; i < 100; i++) {
        const flag = document.createElement("img");
        flag.src = "Orienteringspost.png";
        flag.classList.add("flag");

        // Spre flaggene fra 10vw til 90vw
        const left = 10 + Math.random() * 80; 
        flag.style.left = left + "vw";

        // Gi litt større variasjon i animasjonsdelay
        const delay = i * 0.1 + Math.random() * 2; 
        flag.style.animationDelay = delay + "s";

        flagsContainer.appendChild(flag);
    }
}

    createFlags();

    const trains = document.querySelectorAll(".train");
    let finished = 0;

    trains.forEach(train => {
        train.addEventListener("animationend", () => {
            finished++;
            if (finished == trains.length) {
                intro.style.transition = "opacity 0.8s";
                intro.style.opacity = 0;
                setTimeout(() => {
                    intro.style.display = "none";
                    content.style.display = "block";
                    setTimeout(() => {
                        if (window.map) {
                            map.invalidateSize();
                            map.setView([55.5, 11.5], 4);
                        }
                    }, 200);
                }, 1000);
            }
        });
    });
});
