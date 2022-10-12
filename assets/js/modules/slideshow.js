
const wrapInRange = (min, val, max) => {
    if (val < min) return max;
    else if (val > max) return min;
    return val;
}

export const createSlideshow = (rootEl) => {

    const content = rootEl.querySelector('.slideshow-contents');
    const details = rootEl.querySelector('.slideshow-details');
    const prevBtn = rootEl.querySelector('.slideshow-control.prev');
    const nextBtn = rootEl.querySelector('.slideshow-control.next');
    const slides = rootEl.querySelector('.slideshow-items').childNodes;
    const container = rootEl.querySelector('.slideshow-container');

    /*
     * Settings
     */
    const timeout = (parseInt(rootEl.dataset.timeout) * 1000);

    /*
     * State
     */
    let currentSlide = 0;
    let timer = null;

    /*
     * Utillities
     */
    const moveToNewSlide = (inc = 1) => {
        // Ensure we're not currently fading out
        container.classList.remove('fade-slide');
        // Advance the currentSlide index
        currentSlide = wrapInRange(0, currentSlide + inc, slides.length - 1);
        // Set the fade out
        container.classList.add('fade-slide');

        if (timeout) {
            // Cancel the waiting timed slide change
            clearInterval(timer);
            // Create a new slide change
            timer = setTimeout(moveToNewSlide, timeout);
        }
    };

    const showCurrentSlide = () => {
        // Clear the current slide details
        details.innerHTML = '';
        const slide = slides[currentSlide].cloneNode(true);
        // Duplicate the current slide template and insert into details overlay
        details.appendChild(slide);
        // Update the iframe source
        content.src = slide.dataset.address;
        // Ensure the container isn't hidden
        container.classList.remove('fade-slide');
    };

    /*
     * Events
     */

    // Capture scroll event and pass it to the iframe
    details.addEventListener('wheel', e => {
        const scrollPos = content.contentWindow.scrollY + (e.deltaY * 2);
        const scrollBottom = content.contentDocument.body.scrollHeight 
                                - content.contentWindow.innerHeight;

        content.contentWindow.scrollTo({
            top: scrollPos,
            left: 0,
            behavior: 'smooth'
        });

        // Do we want to prevent the outer page from scrolling?
        if (scrollPos > 0 && scrollPos < scrollBottom) {
            e.preventDefault();
        }
    });

    // Previous slide button
    prevBtn.addEventListener('click', e => {
        moveToNewSlide(-1);
    });
    // Next slide button
    nextBtn.addEventListener('click', e => {
        moveToNewSlide(1);
    });
    // Listens for the container fade out/in transition end event
    container.addEventListener('transitionend', e => {
        // If faded out, switch displayed slide and fade back in
        if (container.classList.contains('fade-slide')) {
            showCurrentSlide();
        }
    });

    /*
     * Initialise
     */
    // Show initial slide
    showCurrentSlide();
    // Setup the slide progression timed trigger
    if (timeout) timer = setTimeout(moveToNewSlide, timeout);

};
