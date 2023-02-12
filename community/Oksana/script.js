// values to keep track of the number of letters typed
var i = 0,
    a = 0,
    isBackspacing = false

// pipe to indicate the start of the second line  
var textArray = [
    "You can't learn everything|but you can learn anything",
    "Most of the growth happens|through voluntary suffering",
    "Curiosity is the|engine of achievement",
    "Work hard and then|work harder",
    "Dream big and have|the courage to fail",
    "Read the directions even if|you don't follow them",
    "If you are not getting the answer|you want, ask a different question",
    "Go to the field where stuff happens|and make it happen",
    "To be a good programmer|be a programmer for 20 years",
    "All generalisations are|wrong",
    "If you can't explain it simply|you don't understand it",
    "The only way to learn a programming|language is by using it",
    "The best way to get started|is to quit talking and begin doing",
];

// Speed 
var speedForward = 100, 
    speedWait = 1000, 
    speedBetweenLines = 200, 
    speedBackspace = 25;


typeWriter("quote", textArray);

function typeWriter(id, ar) {
    var element = document.getElementById(id);
        firstLine = document.querySelector(".quote h3");
        aString = ar[a];

    // Determine if animation should be typing or backspacing
    if (!isBackspacing) {
        // If full string is not done, continue typing
        if (i < aString.length) {

            // If character about to be typed is a pipe, switch to second line and continue.
            if (aString.charAt(i) == "|") {
                firstLine.removeAttribute("class", "cursor");
                var h3 = document.createElement("h3");
                h3.setAttribute("class", "cursor");
                element.appendChild(h3);
                i++;
                setTimeout(function () { typeWriter(id, ar); }, speedBetweenLines);

            // If character isn't a pipe, continue typing.
            } else {
                var h3s = element.getElementsByTagName("h3");
                var lastH3 = h3s[h3s.length - 1];
                lastH3.textContent += aString.charAt(i);
                i++;
                setTimeout(function () { typeWriter(id, ar); }, speedForward);
            }

        // If full string is done, switch to backspace mode.
        } else if (i == aString.length) {
            isBackspacing = true;
            setTimeout(function () { typeWriter(id, ar); }, speedWait);
        }

    } else {
        let h32 = element.lastChild;
        // If any lines have text, continue erasing.
        if (firstLine.textContent.length > 0 || h32.textContent.length > 0) {

            if (h32.textContent.length > 0) {
                h32.textContent = h32.textContent.substring(0, h32.textContent.length - 1);
            } else if (firstLine.textContent.length > 0) {
                h32.removeAttribute("class", "cursor");
                firstLine.setAttribute("class", "cursor");
                firstLine.textContent = firstLine.textContent.substring(0, firstLine.textContent.length - 1);
            }
            setTimeout(function () { typeWriter(id, ar); }, speedBackspace);
        // If no lines have text, switch to next quote in array and start typing.
        } else {
            element.removeChild(h32);
            isBackspacing = false;
            i = 0;
            firstLine.textContent.length === 0;
            a = (a + 1) % ar.length;
            setTimeout(function () { typeWriter(id, ar); }, 50);

       }
    }


}