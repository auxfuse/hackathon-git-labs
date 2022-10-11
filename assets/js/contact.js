var inputName = document.getElementById("name_input");
var inputEmail = document.getElementById("email_input");
var queryType = document.getElementById("category");
var inputMessage = document.getElementById("message_input");

inputName.onkeyup = function () {
  document.getElementById("print_name").innerHTML = JSON.stringify(
    inputName.value
  );
};

inputEmail.onkeyup = function () {
  document.getElementById("print_email").innerHTML = JSON.stringify(
    inputEmail.value
  );
};

function showQueryType() {
  selElement = document.querySelector("#category");
  option = selElement.value;
  document.querySelector(".print_query").textContent = option;
}

inputMessage.onkeyup = function () {
  document.getElementById("print_message").innerHTML = JSON.stringify(
    inputMessage.value
  );
};
