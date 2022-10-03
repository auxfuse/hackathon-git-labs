// To call modal when resume button is clicked

// To open links when buttons are clicked
// Twitter
const twitter = document.getElementById("twitter");
twitter.addEventListener("click", () => {
  window.open("https://twitter.com/msgracie_mac", "_blank");
});

// Instagram
const instagram = document.getElementById("instagram");
instagram.addEventListener("click", () => {
  window.open("https://www.instagram.com/miss_gracieface/", "_blank");
});

// LinkedIn
const linkedin = document.getElementById("linkedin");
linkedin.addEventListener("click", () => {
  window.open("https://www.linkedin.com/in/grace-mckenna-bb7066111/", "_blank");
});

// GitHub
const github = document.getElementById("github");
github.addEventListener("click", () => {
  window.open("https://github.com/gracemcken", "_blank");
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("resume");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
