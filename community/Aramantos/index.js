$(document).ready(function () {
  const engine = new Audio('engine-start.mp3');

  $("#key").click(function () {
    engine.play();
    setTimeout(function () {
      document.location.href = "gallery.html"
    }, 5000);
  });
});