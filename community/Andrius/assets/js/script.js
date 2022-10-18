const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

about.addEventListener("click", function (e) {
  // console.log(e.target.dataset.id);
  const id = e.target.dataset.id;

  if (id) {
    // Remove active from other buttons
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    // hide other articles
    articles.forEach(function (article) {
      article.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});

modalBtn.addEventListener("click", function () {
  modal.classList.add("open-modal");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("open-modal");
});
