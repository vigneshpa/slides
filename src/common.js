export function addFinal(pdfLoc){const inf = document.createElement("section");
inf.innerHTML = `<h1> Thank you </h1>
<a href="pdf/${pdfLoc}.pdf">Download</a>`;
const slides = document.body.getElementsByClassName("slides")[0] || document.body.getElementsByClassName("reveal")[0];
slides.append(inf);}