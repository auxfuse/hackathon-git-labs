// function handleUserInput(data) {

// }

var inputName = document.getElementById('name_input');
var inputEmail = document.getElementById('email_input')
var queryType = document.getElementById('category');

inputName.onkeyup = function(){
    document.getElementById('print_name').innerHTML = JSON.stringify(inputName.value);
}

inputEmail.onkeyup = function(){
    document.getElementById('print_email').innerHTML = JSON.stringify(inputEmail.value);
}

queryType.onselect = function(){
    for (category in categories) {
        document.getElementById('print_query').innerHTML = JSON.stringify(queryType.value);
    }
}

