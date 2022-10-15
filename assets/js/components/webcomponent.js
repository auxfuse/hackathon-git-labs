
/**
 * A class for simplyfing webcomponent creation. 
 * Handles much of the boiler plate and component creation code.
 */
export class WebComponent extends HTMLElement {

    static attributes = {}

    static get observedAttributes() {
        return [];
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

// Component compilation code goes below, yo.