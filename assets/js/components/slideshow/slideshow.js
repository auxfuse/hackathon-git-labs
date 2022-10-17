import { WebComponent, loadTemplate } from '../webcomponent.js';
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
                        this._prevBtn.addEventListener('click', this.prevSlide.bind(this));
                        this._nextBtn.addEventListener('click', this.nextSlide.bind(this));
                    }
        
                    slideCount() {
                        return this._slides.assignedElements().length;
                    }
        
                    showSlide(which) {
                        this._slides.assignedElements()[this._currentSlide]?.classList.remove('show-slide');
                        which = wrapInRange(0, which, this.slideCount() - 1);
                        this._slides.assignedElements()[which].classList.add('show-slide');
                        return which;
                    }

                    prevSlide() {
                        this._currentSlide = this.showSlide(this._currentSlide - 1);
                    }

                    nextSlide() {
                        this._currentSlide = this.showSlide(this._currentSlide + 1);
                    }
        
                    _onSlidesChange(e) {
                        this._currentSlide = this.showSlide(this._currentSlide);
                    }
                }
            );
        });

})();
