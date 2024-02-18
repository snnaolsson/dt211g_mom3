let btn = document.getElementById("aurora-header");
let text = document.getElementById("aurora-text");
let btnmyt = document.getElementById("myt-header");
let mytText = document.getElementById("myt-text");

btn.addEventListener("mouseover", showText);
btn.addEventListener("mouseleave", hideText);
btnmyt.addEventListener("mouseover", showMyText);
btnmyt.addEventListener("mouseleave", hideMyText);

function showText() {
  let compStyle = window.getComputedStyle(text).display;
  if (compStyle === "none") {
    text.style.display = "block";
  }
}
function showMyText() {
  let compStyle = window.getComputedStyle(mytText).display;
  if (compStyle === "none") {
    mytText.style.display = "block";
  }
}
function hideText() {
  text.style.display = "none";
}
function hideMyText() {
  mytText.style.display = "none";
}
