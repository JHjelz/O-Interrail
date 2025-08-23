// O-INTERRAIL/js/introTrains.js

document.addEventListener("DOMContentLoaded", () =>{
    const intro = document.getElementById("intro");
    const content = document.getElementById("content");
    const flagsContainer = document.getElementById("flags");

    function createFlags() {
        for (let i=0; i<10; i++) {
            const flag = document.createElement("img");
            flag.src = "Orienteringspost.png";
            flag.classList.add("flag");
            flag.style.left = Math.random() * 90 + "vw";
            flag.style.animationDelay = (Math.random() * 2) + "s";
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
                }, 1000);
            }
        });
    });
});
