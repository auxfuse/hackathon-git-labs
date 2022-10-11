
export const setupSlideshow = (rootEl) => {

    const content = rootEl.querySelector('.slideshow-contents');
    const details = rootEl.querySelector('.slideshow-details');
    const prevBtn = rootEl.querySelector('.slideshow-control.prev');
    const nextBtn = rootEl.querySelector('.slideshow-control.next');

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

    // Attach forward/back button events
    prevBtn.addEventListener('click', e => {
        console.log('back clicked');
    });
    
    nextBtn.addEventListener('click', e => {
        console.log('next clicked');
    });

};
