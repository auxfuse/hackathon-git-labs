document.addEventListener('DOMContentLoaded', function () {
    const bubbles = document.getElementsByClassName('bubble');
    for(let bubble of bubbles) {
        bubble.addEventListener('click', pop);
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
