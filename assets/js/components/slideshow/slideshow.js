import { WebComponent, loadTemplate } from '../webcomponent.js';
import { wrapInRange } from '../../modules/utilities.js';

(() => {
    class SlideShow extends WebComponent {
        static get tagName() { return 'slide-show'; }

        static get attributes() { 
            return {
                'timeout': Number,
                'animation': String,
                'slide': Number
            }; 
        }

        constructor() {
            super();
            this._createShadow({mode: 'open'});
            // Elements
            this._slides = null;
            this._nextBtn = null;
            this._prevBtn = null;
            // Properties
            this._timeout = 0;
            this._animation = 'none';
            this._slide = 0;
        }

        get timeout() { return this._timeout; }
        set timeout(val) {
            this._timeout = val;
            this.setAttribute('timeout', val);
        }

        get slide() { return this._slide; }
        set slide(val) {
            if (this.slideCount > 0) {
                // Hide currently displayed slide
                this._slides.assignedElements()[this._slide].classList.remove('show-slide');
                // Ensure index is within range
                this._slide = wrapInRange(0, val, this.slideCount - 1);
                // Show the current selected slide
                this._slides.assignedElements()[this._slide].classList.add('show-slide');
                // Reflect the property to the element attribute
                this.setAttribute('slide', this._slide);
            }
        }

        connectedCallback() {
            this._slides = this.shadowRoot.getElementById('slides');
            this._prevBtn = this.shadowRoot.getElementById('prev');
            this._nextBtn = this.shadowRoot.getElementById('next');

            // Try to show the intial slide
            this.slide = 0;

            // Watch for slides being added or removed
            this._slides.addEventListener('slotchange', () => this.slide = this.slide);

            // Setup slideshow control events
            this._prevBtn.addEventListener('click', () => this.slide--);
            this._nextBtn.addEventListener('click', () => this.slide++);
        }

        get slideCount() {
            if (!this._slides) return 0;
            return this._slides.assignedElements().length;
        }
    };

    const templateUrl = new URL('slideshow.html', import.meta.url).href;
    loadTemplate(templateUrl)
        .then(template => {
            SlideShow.template = template;
            
            customElements.define(SlideShow.tagName, SlideShow)
        });

})();
