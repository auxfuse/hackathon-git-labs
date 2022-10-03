
/* This code was copied from Codepen <https://codepen.io/alissatroiano/pen/BaxxGZm> and revised by the developer for the purpose of this project */

var body = document.getElementById("welcome")
var nav = document.getElementById("nav");

for(const text of nav.getElementsByTagName("li")) {  
  text.onmousemove = e => {
    const rect = text.getBoundingClientRect(),    
          img = text.querySelector("img");
          img.style.left = `${e.clientX - rect.left}px`;
          img.style.top = `${e.clientY - rect.top}px`;
  }
}
