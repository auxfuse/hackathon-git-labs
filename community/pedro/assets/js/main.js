var menuIcon = document.getElementById("menu-icon");
var closeIcon = document.getElementById("close-icon");
var leftCol = document.getElementById("left-col");
var rightCol = document.getElementById("right-col");
var hero2 = document.getElementById("hero-2");

// Open Panel
menuIcon.onclick = function(){
   
    leftCol.style.transform = "translateX(0px)";
    rightCol.style.transform = "translateX(0px)";

    leftCol.style.transition = "1.2s";
    rightCol.style.transition = "1.2s";

    leftCol.style.backgroundImage  = "linear-gradient(69deg, #378b77 0%, #46bac8 100%)";
    rightCol.style.backgroundImage  = "linear-gradient(-25deg, #378b77 0%, #46bac8 100%)";

    hero2.style.display = "block"

}

// Close Panel
closeIcon.onclick = function(){
   
    leftCol.style.transform = "translateX(-100%)";
    rightCol.style.transform = "translateX(100%)";

    leftCol.style.transition = ".8s";
    rightCol.style.transition = ".8s";

    leftCol.style.background = "black";
    rightCol.style.background = "black";

    hero2.style.display = "none"

}