
import { createComponent, createTemplate, WebComponent } from '../../externals.js';

(() => {
    const genFace = id => `<div id=${id} class="face"><slot name=${id}></slot></div>`;

    const styles = `
        :host {
            transform-style: preserve-3d;
            width: var(--width);
            height: var(--height);

            --offsetX: calc(var(--width) / 2);
            --offsetY: calc(var(--height) / 2);
            --offsetZ: calc(var(--depth) / 2);
        }
        #faces {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
        }
        .face {
            position: absolute;
            left: 50%; top: 50%;
        }
        #front, #back { 
            width: var(--width);
            height: var(--height);
            transform: translate(-50%,-50%) rotateY(0deg) translateZ(var(--offsetZ)); 
        }
        #back { transform: translate(-50%,-50%) rotateY(180deg) translateZ(var(--offsetZ)); }
    
        #left, #right {
            width: var(--depth);
            height: var(--height);
            transform: translate(-50%,-50%) rotateY(-90deg) translateZ(var(--offsetX));
        }
        #right { transform: translate(-50%,-50%) rotateY(90deg) translateZ(var(--offsetX)); }
        
        #top, #bottom {
            width: var(--width);
            height: var(--depth); 
            transform: translate(-50%,-50%) rotateX(90deg) translateZ(var(--offsetY));
        }
        #bottom { transform: translate(-50%,-50%) rotateX(-90deg) translateZ(var(--offsetY)); }
    `;

    const html = `
    <div id="faces">
        ${genFace('front')}
        ${genFace('right')}
        ${genFace('left')}
        ${genFace('back')}
        ${genFace('top')}
        ${genFace('bottom')}
    </div>`;

    class CSS3DCuboid extends WebComponent {
        static get tagName() { return 'css3d-cuboid'; }
        static get attributes() {
            return {
                'width': {type: String, default: 0},
                'height': {type: String, default: 0},
                'depth': {type: String, default: 0}
            }
        }
        static _createDefaultAccessor(self, attr, prop) {
            Object.defineProperty(self, attr, {
                get() { return self[prop]; },
                set(val) {
                    this.style.setProperty(`--${attr}`, val);
                    self[prop] = self.attributes[attr].type(val);
                    self.setAttribute(attr, val);
                }
            });
        }
        constructor() {
            super();
            this._createShadow({mode: 'open'});
        }
        connectedCallback() {}
    }

    const template = createTemplate(html, styles);
    createComponent(CSS3DCuboid, template);
})();