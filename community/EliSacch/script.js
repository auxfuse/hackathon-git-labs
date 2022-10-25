document.addEventListener('DOMContentLoaded', function () {
    const bubbles = document.getElementsByClassName('bubble');
    for(let bubble of bubbles) {
        bubble.addEventListener('click', pop);
    }
    const soundControl = document.getElementsByTagName('i');
    for(let control of soundControl) {
        control.addEventListener('click', soundOnOff);
    }
});

/**
 * Pops the bubble
 */

function pop() {
    let isPopped = (this.classList.contains('popped'));
    if(!isPopped) {
        this.classList.add('popped');
    const pop = document.getElementById('pop');
    pop.play();
    } 
}

/**
 * Turn audio on/off 
 */
function soundOnOff() {
    const control = this.getAttribute('id');
    const on = document.getElementById('on');
    const off = document.getElementById('off');
    const sound = document.getElementById('pop');
    switch (control) {
        case "on":
            sound.muted = true;
            on.style.display = "none";
            off.style.display = "block";
            break;
        case "off":
            sound.muted = false;
            on.style.display = "block";
            off.style.display = "none";
            break;  
        default:
            throw `action "${control}" not recognized`; 
    }
}

