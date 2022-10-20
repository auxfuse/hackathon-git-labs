const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");
const modalBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

about.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
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

function SendMail() {
  const params = {
    from_name: document.getElementById("userName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
    phone: document.getElementById("phone").value,
    budget: document.getElementById("budget").value,
  };
  emailjs.send("service_id", "template_id", params).then(function (res) {
    console.log("Success " + res.status);

    document.getElementById("userName").value = "";
    document.getElementById("email_id").value = "";
    document.getElementById("message").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("budget").value = "";
    window.location = "thankyou.html";
  });
}
