
(() => {

    const template = document.createElement("template");
    template.innerHTML = `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            #slide-controls {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 100%;
            }
            .slide-btn {
                width: 50px;
                background: transparent;
                border: none;
                opacity: 0.5;
                transition: opacity 0.5s;
            }
            .slide-btn:hover {
                opacity: 0.75;
            }
            .control-icon {
                fill: white;
                stroke: black;
            }
        </style>

        <slot></slot>

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
    
        static get observedAttributes() {
            return ['timeout'];
        }

        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            this._timeout = 10;
        }

        attributeChangedCallback(property, oldValue, newValue) {
            if (oldValue === newValue) return;
            this[property] = newValue;
        }

        get timeout() {return this._timeout;}
        set timeout(val) {this._timeout = val;}

        connectedCallback() {
            this.shadow.append(template.content.cloneNode(true));
            console.log(this._timeout);
        }
    }

    customElements.define('slide-show', SlideShow);
})();