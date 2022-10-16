import { loadTemplate } from '../webcomponent.js';
import { wrapInRange } from '../../modules/utilities.js';


(() => {
    const templateUrl = new URL('slideshow.html', import.meta.url).href;

    loadTemplate(templateUrl)
        .then(template => {
    
            customElements.define('slide-show', 
                class extends HTMLElement {
                    static get observedAttributes() {
                        return ['timeout', 'animation'];
                    }
        
                    constructor() {
                        super();
                        this.attachShadow({mode: 'open'});
        
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
                        this.shadowRoot.append(template.content.cloneNode(true));
                        this._slides = this.shadowRoot.querySelector('#slides');
                        this._prevBtn = this.shadowRoot.getElementById('prev');
                        this._nextBtn = this.shadowRoot.getElementById('next');
        
                        // If there are any slides, show the first one now
                        if (this._slides.assignedElements().length > 0) this.showSlide(0);
        
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
                        this._slides.assignedElements()[which].classList.add('currentSlide');
                    }

                    nextSlide() {}

                    prevSlide() {}
        
                    _onSlidesChange(e) {
                        console.log('Slides have changed!');
                        console.log('Slide count: ', this._slides.assignedElements().length);
                    }
                }
            );
        });

})();
