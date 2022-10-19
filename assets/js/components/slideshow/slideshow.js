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

            // State
            this._animating = 0;

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
            if (!this.slideCount || this._animating) return;

            // Reset slide timeout
            if (this._timeout) {
                clearTimeout(this._timer);
                this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
            }

            const lastSlide = this._slide;
            this._slide = wrapInRange(0, val, this.slideCount - 1);

            this.slides[lastSlide].classList.remove('active');
            this.slides[this._slide].classList.add('active');

            if (this._animation !== 'none' && lastSlide !== this._slide) {
                this.slides[lastSlide].classList.add(this._animation, 'out');
                this.slides[this._slide].classList.add(this._animation, 'in');

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
            this._slides.addEventListener('animationstart', this._animStart.bind(this));
            this._slides.addEventListener('animationend', this._animEnd.bind(this));

            // Setup slideshow control events
            this._prevBtn.addEventListener('click', this.prevSlide.bind(this));
            this._nextBtn.addEventListener('click', this.nextSlide.bind(this));

            // Start slide change timer
            this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
        }

        prevSlide() {
            this._slides.style.setProperty('--dir', -1);
            this.slide--
        }

        nextSlide() {
            this._slides.style.setProperty('--dir', 1);
            this.slide++
        }        

        _slideTimer() {
            if (this._timeout) {
                this.slide++;
            }
        }

        _animStart(e) { 
            const slide = e.target;
            if (slide.classList.contains(this._animation)) {
                this._animating++;
            }
        }
        _animEnd(e) {
            const slide = e.target;
            if (slide.classList.contains(this._animation)) {
                slide.classList.remove(this._animation, 'in', 'out');
                this._animating--;
            }
        }
    };

    const templateUrl = new URL('slideshow.html', import.meta.url).href;
    loadTemplate(templateUrl)
        .then(template => createComponent(SlideShow, template));

})();

