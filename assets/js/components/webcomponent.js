
/**
 * A class for simplyfing webcomponent creation. 
 * Handles much of the boiler plate and component creation code.
 */
export class WebComponent extends HTMLElement {
    /* Type properties and methods */
    static template = null;

    /**
     * Provides the attributes and their types this component recognises.
     * @static
     * eg:
     * {'attribute1': {type:Number,default:0}}
     */
    static get attributes() { return null; }
    
    /**
     * Provides the DOM tag name for this component
     * @static
     * @abstract
     * @return {String} - tag name
     */
    static get tagName() {
        throw new Error('Component has no defined tag name! Have you provided a static get tagName method?');
    }

    static get observedAttributes() {
        if (!this.attributes) return [];
        return Object.keys(this.attributes);
    }

    /* Instance Properties and methods */
    constructor() {
        super();
        // If this component has custom attributes
        if (this.constructor.attributes) {
            for (const [key, value] of Object.entries(this.constructor.attributes)) {
                const propName = `_${key}`;
                // Create a property and set it to the default value
                this[propName] = value.default;
                // If getters and setters don't already exist add them
                if (!Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key)) {
                    Object.defineProperty(this, key, {
                        get() { return this[propName]; },
                        set(val) {
                            this[propName] = val;
                            this.setAttribute(key, val);
                        }
                    });
                }
            }
        }
    }

    /**
     * Creates and appends a shadow dom to the component with the properties passed.
     * Intended only for use by derived classes.
     * @protected
     * @param {Object} properties - Shadow DOM properties
     * @returns {Element} - Created shadow DOM
     */
    _createShadow(properties) {
        const shadow = this.attachShadow(properties);
        shadow.append(this.constructor.template.content.cloneNode(true));
        return shadow;
    }

    /**
     * Provides this WebComponent's attached template element
     */
    get template() { return this.constructor.template; }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        // Attributes are always strings, so decode it to the correct datatype
        const val = this.constructor.attributes[property].type(newValue);
        if (this[property] != val) this[property] = val;
    }
};


/**
 * Loads a given template file and creates a DOM template object
 * @param {String} file - url File path for the template
 * @returns 
 */
export const loadTemplate = file => {
    return new Promise((resolve, reject) => 
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const templateEl = document.createElement('template');
                templateEl.innerHTML = data;
                resolve(templateEl);
            })
            .catch(reject)
    );
};


/**
 * Creates a template element from the HTML and optional CSS strings passed.
 * @param {String} html - String of HTML nodes for the template
 * @param {String} styles - (optional) String of styles for the template
 * @returns {Element} - Template element
 */
export const createTemplate = (html, styles = null) => {
    const templateEl = document.createElement('template');
    
    if (styles) {
        const styleEl = document.createElement('style');
        styleEl.innerText = styles;
        templateEl.append(styleEl);
    }
    templateEl.append(html);

    return templateEl;
};

/**
 * Creates a component from a WebComponent class implementation and template element
 * @param {Object} component - WebComponent class implementation
 * @param {Element} template - Template
 */
export const createComponent = (component, template = null) => {
    component.template = template;
    customElements.define(component.tagName, component);
};