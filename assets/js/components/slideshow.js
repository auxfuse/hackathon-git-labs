
(() => {

    const template = document.createElement("template");
    template.innerHTML = '<h2>Template code</h2>';
   
    class SlideShow extends HTMLElement {
    
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