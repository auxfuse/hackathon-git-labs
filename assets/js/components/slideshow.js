
(() => {

    const wrapInRange = (min, val, max) => {
        if (val < min) return max;
        else if (val > max) return min;
        return val;
    }

    const url = new URL(import.meta.url);
    const base = url.pathname.replace(/[^\/]+$|^(\/)/g,'');

    fetch(base + 'slideshow.html')
        .then(responce => responce.text())
        .then(data => {

            const template = document.createElement('template');
            template.innerHTML = data;
    
            customElements.define('slide-show', 
                class extends HTMLElement {
                    static get observedAttributes() {
                        return ['timeout', 'animation'];
                    }
        
                    constructor() {
                        super();
                        this.shadow = this.attachShadow({mode: 'open'});
        
                        this._slides = null;
                        this._nextBtn = null;
                        this._prevBtn = null;
        
                        this._timeout = 0;
                        this._currentSlide = 0;
                    }
        
                    attributeChangedCallback(property, oldValue, newValue) {
                        if (oldValue === newValue) return;
                        this[property] = newValue;
                    }
        
                    get timeout() { return this._timeout; }
                    set timeout(val) {
                        this._timeout = val * 1000;
                        this.setAttribute('timeout', val);
                    }
        
                    connectedCallback() {
                        this.shadow.append(template.content.cloneNode(true));
                        this._slides = this.shadow.querySelector('#slides');
                        this._prevBtn = this.shadow.getElementById('prev');
                        this._nextBtn = this.shadow.getElementById('next');
        
                        // If there are any slides, show the first one now
                        console.log('Slide count: ', this._slides.assignedElements().length);
        
                        // Watch for slides being added or removed
                        this._slides.addEventListener('slotchange', this._onSlidesChange.bind(this));
        
                        // Setup slideshow control events
                        this._prevBtn.addEventListener('click', e => {
                            console.log('Previous button clicked');
                        });
                        this._nextBtn.addEventListener('click', e => {
                            console.log('Next button clicked');
                        });
                    }
        
                    slideCount() {
                        return this._slides.assignedElements().length;
                    }
        
                    showSlide(which) {
                        which = wrapInRange(0, which, this.slideCount());
                    }
        
                    _onSlidesChange(e) {
                        console.log('Slides have changed!');
                        console.log('Slide count: ', this._slides.assignedElements().length);
                    }
                }
            );
        });

})();
