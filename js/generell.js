// Generer div
function lagDiv(klasse, id) {
    const div = document.createElement("div");
    if (klasse) div.className = klasse;
    if (id) div.id = id;
    return div;
}

// Generer knapp
function lagKnapp(tekst, id, klasse, onclick) {
    const knapp = document.createElement("button");
    knapp.textContent = tekst;
    if (id) knapp.id = id;
    if (klasse) knapp.className = klasse;
    if (typeof onclick === "function") {
        knapp.addEventListener("click", onclick);
    }
    return knapp;
}

// Generer knapp med symbol
function lagKnappIkon(onclickFn, iconClass, pathData, id, pos, color) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("id", id);
    svg.setAttribute("width", "6vh");
    svg.setAttribute("height", "6vh");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", `bi ${iconClass}`);
    svg.setAttribute("style", `
        cursor: pointer;
        border: none;
        position: absolute;
        z-index: 999;
        color: ${color};
        ${pos.top ? `top: ${pos.top};` : ""}
        ${pos.bottom ? `bottom: ${pos.bottom};` : ""}
        ${pos.left ? `left: ${pos.left};` : ""}
        ${pos.right ? `right: ${pos.right};` : ""}
    `.trim());

    svg.addEventListener("click", onclickFn);

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);

    return svg;
}
