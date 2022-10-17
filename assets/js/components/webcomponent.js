
/**
 * A class for simplyfing webcomponent creation. 
 * Handles much of the boiler plate and component creation code.
 */
export class WebComponent extends HTMLElement {
    static template = null;

    static get attributes() { return null; }
    
    static get tagName() {
        throw new Error('Component has no defined tag name');
    }

    static get observedAttributes() {
        if (!this.attributes) return [];
        return Object.keys(this.attributes);
    }


    constructor() {
        super();
        // Create getters and setters for reflection here

    }



    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        // Attributes are always strings, so decode it to the correct datatype
        this[property] = this.constructor.attributes[property](newValue);
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
                const template = document.createElement('template');
                template.innerHTML = data;
                resolve(template);
            })
            .catch(reject)
    );
};

