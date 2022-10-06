var inputName = document.getElementById('name_input');
var inputEmail = document.getElementById('email_input')

inputName.onkeyup = function(){
    document.getElementById('print_name').innerHTML = `{ ` + `<br>` + `     name: ` + inputName.value + `,`;
}

inputEmail.onkeyup = function(){
    document.getElementById('print_email').innerHTML =  `     email: ` + inputEmail.value + `,`;
}