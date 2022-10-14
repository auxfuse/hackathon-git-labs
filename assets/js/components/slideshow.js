
(() => {

    const wrapInRange = (min, val, max) => {
        if (val < min) return max;
        else if (val > max) return min;
        return val;
    }

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            #slide-controls {
                position: relative;
                z-index: 2;
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 100%;
            }
            .slide-btn {
                width: 50px;
                background: transparent;
                border: none;
                opacity: 0.25;
                transition: opacity 0.5s;
            }
            .slide-btn:hover {
                opacity: 0.75;
            }
            .control-icon {
                fill: white;
                stroke: black;
            }
            #slides::slotted(*) {
                border: 1px solid red;
                position: absolute;
                top: 0; left: 0; 
                bottom: 0; right: 0;
                z-index: 1;
                pointer-events: none;
                opacity: 0;
            }
            .current-slide {
                opacity: 1;
                pointer-events: all;
            }
        </style>

        <slot id="slides"></slot>

        <div id="slide-controls">

            <button id="prev" class="slide-btn">
                <slot name="previous-slide-icon">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'>
                        <path class="control-icon" d="m6.2851 1.0156 1.4142 1.4142-2.5702 2.5702 2.5702 2.5702-1.4142 1.4142-3.9844-3.9844z"/>
                    </svg>
                </slot>
            </button>

            <button id="next" class="slide-btn">
                <slot name="next-slide-icon">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'>
                        <path class="control-icon" d="m2.3007 2.4298 1.4142-1.4142 3.9844 3.9844-3.9844 3.9844-1.4142-1.4142 2.5702-2.5702z"/>
                    </svg>
                </slot>
            </button>

        </div>
    `;
   
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

            get timeout() {return this._timeout;}
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

})();
