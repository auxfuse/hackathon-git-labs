import { WebComponent, loadTemplate, createComponent } from '../webcomponent.js';
import { wrapInRange } from '../../modules/utilities.js';

(() => {

    class SlideShow extends WebComponent {
        /* Type properties and methods */
        static get tagName() { return 'slide-show'; }

        static get attributes() { 
            return {
                'timeout': {type: Number, default: 0},
                'animation': {type: String, default: ''},
                'slide': {type: Number, default: 0}
            }; 
        }

        /* Instance Properties and methods */
        constructor() {
            super();
            this._createShadow({mode: 'open'});
            // Elements
            this._slides = null;
            this._nextBtn = null;
            this._prevBtn = null;
        }

        get slides() { return this._slides.assignedElements(); }

        get slide() { return this._slide; }
        set slide(val) {
            if (this.slideCount > 0) {
                this._slide = wrapInRange(0, val, this.slideCount - 1);
                this.slides[this._slide].scrollIntoView({block: 'nearest'});
                // Reflect the property to the element attribute
                this.setAttribute('slide', this._slide);
            }
        }

        connectedCallback() {
            // Grab component interactive elements from the shadow dom
            this._slides = this.shadowRoot.getElementById('slides');
            this._prevBtn = this.shadowRoot.getElementById('prev');
            this._nextBtn = this.shadowRoot.getElementById('next');

            this.slide = this.slide
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
        .then(template => createComponent(SlideShow, template));

})();

// TODO:
//  Animation on slide change
//      Animations:
//          none (no animation)
//          crossfade (fade out then fade in)
//          swipe (swipe in from left or right)