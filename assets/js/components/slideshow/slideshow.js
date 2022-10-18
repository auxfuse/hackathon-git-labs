import { WebComponent, loadTemplate, createComponent } from '../webcomponent.js';
import { wrapInRange } from '../../modules/utilities.js';

(() => {

    class SlideShow extends WebComponent {
        /* Type properties and methods */
        static get tagName() { return 'slide-show'; }

        static get attributes() { 
            return {
                'timeout': {type: Number, default: 0},
                'animation': {type: String, default: 'none'},
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

            // Slide timer
            this._timer = null;
            this._slideTimer = this._slideTimer.bind(this);
        }

        get slides() { return this._slides.assignedElements(); }

        get slideCount() {
            if (!this._slides) return 0;
            return this._slides.assignedElements().length;
        }

        get slide() { return this._slide; }
        set slide(val) {
            if (!this.slideCount) return;

            if (this._timeout) {
                clearTimeout(this._timer);
                this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
            }

            const lastSlide = this._slide;
            this._slide = wrapInRange(0, val, this.slideCount - 1);

            if (lastSlide !== this._slide) {
                this.slides[lastSlide].classList.remove('active');
                this.slides[lastSlide].classList.add('fade', 'out');
                this.slides[this._slide].classList.add('active', 'fade', 'in');
            } else {
                this.slides[this._slide].classList.add('active');
            }

            // Reflect the property to the element attribute
            this.setAttribute('slide', this._slide);
        }

        connectedCallback() {
            // Grab component interactive elements from the shadow dom
            this._slides = this.shadowRoot.getElementById('slides');
            this._prevBtn = this.shadowRoot.getElementById('prev');
            this._nextBtn = this.shadowRoot.getElementById('next');

            this.slide = 0;
            // Watch for slides being added or removed
            this._slides.addEventListener('slotchange', () => this.slide = 0);
            // Slide transition events
            this._slides.addEventListener('animationend', this._animationEnd.bind(this));

            // Setup slideshow control events
            this._prevBtn.addEventListener('click', () => this.slide--);
            this._nextBtn.addEventListener('click', () => this.slide++);

            // Start slide change timer
            this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
        }

        _slideTimer() {
            if (this._timeout) {
                this.slide++;
            }
        }

        _animationEnd(e) {
            const slide = e.target;
            if (slide.classList.contains('fade')) {
                slide.classList.remove('fade', 'in', 'out');
            }
        }
    };

    const templateUrl = new URL('slideshow.html', import.meta.url).href;
    loadTemplate(templateUrl)
        .then(template => createComponent(SlideShow, template));

})();

// TODO:
//  Animation on slide change
//      Animations:
//          none (no animation)                 ✓
//          fade (fade out then fade in)        ✓
//          crossfade (fade one to another)     x
//          swipe (swipe in from left or right) x
//  Timer   ✓