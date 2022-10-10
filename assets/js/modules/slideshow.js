
export const setupSlideshow = (rootEl) => {

    const content = rootEl.querySelector('.slideshow-content > iframe');

    content.addEventListener('load', (e) => {
        e.target.contentDocument.body.style.pointerEvents = 'none';
    });
};
