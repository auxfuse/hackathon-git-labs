
/**
 * A class for simplyfing webcomponent creation. 
 * Handles much of the boiler plate and component creation code.
 */
export class WebComponent extends HTMLElement {

    static get attributes() {
        return null;
    }
    
    static get tagName() {
        throw new Error('Component has no assigned tag name');
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
    }

};

/**
 * Pulls the component's base path from it's url.
 * @param {String} path - Component script file path. import.meta.url for instance.
 */
export const getComponentUrl = path => 
    (new URL(path)).pathname.replace(/[^\/]+$|^(\/)/g,'');
