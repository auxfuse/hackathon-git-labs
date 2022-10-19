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
            this._indicators = null;

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
            if (this.slideCount && !this._animating) {
                const lastSlide = this._slide;
                this._slide = wrapInRange(0, val, this.slideCount - 1);

                // Reset slide timeout
                if (this._timeout) {
                    clearTimeout(this._timer);
                    this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
                }

                // Ensure only the current slide is active
                this.slides[lastSlide].classList.remove('active');
                this.slides[this._slide].classList.add('active');
                // Update indicators
                if (this._indicators) {
                    this._indicators.childNodes[lastSlide].classList.remove('active');
                    this._indicators.childNodes[this._slide].classList.add('active');
                }

                // Should the slide transition be animated?
                if (this._animation !== 'none' && lastSlide !== this._slide) {
                    this._slides.style.setProperty('--dir', Math.sign(val - lastSlide));
                    this.slides[lastSlide].classList.add(this._animation, 'out');
                    this.slides[this._slide].classList.add(this._animation, 'in');
                }
                // Trigger slide change event
                this.dispatchEvent(new CustomEvent('slide-changed', {detail: this.slides[this._slide]}));
            }
            // Reflect the property to the element attribute
            this.setAttribute('slide', this._slide);
        }

        connectedCallback() {
            // Grab component interactive elements from the shadow dom
            this._slides = this.shadowRoot.getElementById('slides');
            this._prevBtn = this.shadowRoot.getElementById('prev');
            this._nextBtn = this.shadowRoot.getElementById('next');
            this._indicators = this.shadowRoot.getElementById("slide-indicators");

            // Build indicators
            this._createSlideIndicators();

            // Attempt to show initial slide
            this.slide = this.slide;

            /*
             * Event handlers
             */
            // Watch for slides being added or removed
            this._slides.addEventListener('slotchange', () => {
                this._createSlideIndicators();
                this.slide = this.slide
            });
            // Slide transition events
            this._slides.addEventListener('animationstart', e => {
                const slide = e.target;
                if (slide.classList.contains(this._animation)) {
                    this._animating++;
                }
            });
            this._slides.addEventListener('animationend', e => {
                const slide = e.target;
                if (slide.classList.contains(this._animation)) {
                    slide.classList.remove(this._animation, 'in', 'out');
                    this._animating--;
                }
            });
            // Setup slideshow control events
            this._prevBtn.addEventListener('click', () => this.slide--);
            this._nextBtn.addEventListener('click', () => this.slide++);

            // Start slide change timer
            this._timer = setTimeout(this._slideTimer, this._timeout * 1000);
        }

        _createSlideIndicators() {
            if (this.slideCount) {
                const count = this.slideCount;
                const indicator = document.createElement('li');
                indicator.setAttribute('part', 'slide-indicator');

                this._indicators.innerHTML = '';
                for (let i = 0; i < count; i++) this._indicators.append(indicator.cloneNode(false));
                this._indicators.childNodes[this._slide].classList.add('active');
            }
        }

        _slideTimer() {
            if (this._timeout) {
                this.slide++;
            }
        }
    };

    const templateUrl = new URL('slideshow.html', import.meta.url).href;
    loadTemplate(templateUrl)
        .then(template => createComponent(SlideShow, template));

})();
