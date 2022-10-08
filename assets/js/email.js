// Temporary/Test EmailJS Credentials
emailjs.init('cVSPl-G-PGVma0d8L');

const btn = document.getElementById("submitForm");
const form = document
  .getElementById("contact_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_fof5rxs";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Email";
        alert("Sent!");
      },
      (err) => {
        btn.value = "Send Email";
        alert(JSON.stringify(err));
      }
    );
  });
