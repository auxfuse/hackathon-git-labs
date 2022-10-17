import { WebComponent, loadTemplate } from '../webcomponent.js';
import { wrapInRange } from '../../modules/utilities.js';

(() => {
    const templateUrl = new URL('slideshow.html', import.meta.url).href;

    class SlideShow extends HTMLElement {
        static template = null;

        static get tagName() { return 'slide-show'; }

        static get attributes() { 
            return {
                'timeout': Number,
                'animation': String,
                'slide': Number
            }; 
        }

        static get observedAttributes() {
            if (!this.attributes) return [];
            return Object.keys(this.attributes);
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
            this[property] = this.constructor.attributes[property](newValue);
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

            // Try to show the intial slide
            this.showSlide(0);

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
            if (this._slides.assignedElements().length > 0) {
                // Hide currently displayed slide
                this._slides.assignedElements()[this._currentSlide].classList.remove('show-slide');
                // Ensure index is within range
                which = wrapInRange(0, which, this.slideCount() - 1);
                // Show the current selected slide
                this._slides.assignedElements()[which].classList.add('show-slide');
            }
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

    loadTemplate(templateUrl)
        .then(template => customElements.define('slide-show', SlideShow));

})();
