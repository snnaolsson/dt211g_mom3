let burger = document.getElementById("burger"); //Hämtar burgerikonen
let menu = document.getElementById("menu"); //Hämtar navigeringen

burger.addEventListener("click", burgerMenu);
/*Funktion som hämtar vilken "display" navigeringen har. 
Om den är "none" så visas hamburgermenyn vid klick på knappen och om den är synlig (block) så kommer den istället att döljas.*/
function burgerMenu() {
  //Hämtar menyns egentliga displaystyle med getComputedStyle
  let menuDisplay = window.getComputedStyle(menu).getPropertyValue("display");

  //Kollar menyns computed style
  if (menuDisplay === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

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
