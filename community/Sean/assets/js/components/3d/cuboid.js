import { createComponent, createTemplate, WebComponent } from '../../../../../../assets/js/components/webcomponent.js';

(() => {
    const genFace = id => `<div id=${id} class="face" part=${id}><slot name=${id}></slot></div>`;

    const styles = `
        :host {
            transform-style: preserve-3d;
        }
        #cuboid {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
        }
        .face {
            position: absolute;
            width: 200px;
            height: 200px;
            border: 1px solid black;
        }
        #front { transform: rotateY(0deg) translateZ(100px); }
        #right { transform: rotateY(90deg) translateZ(100px); }
        #back { transform: rotateY(180deg) translateZ(100px); }
        #left { transform: rotateY(-90deg) translateZ(100px); }
        #top { transform: rotateX(90deg) translateZ(100px); }
        #bottom { transform: rotateX(-90deg) translateZ(100px); }
    `;

    const html = `
    <div id="cuboid">
        ${genFace('front')}
        ${genFace('right')}
        ${genFace('left')}
        ${genFace('back')}
        ${genFace('top')}
        ${genFace('bottom')}
    </div>`;

    class CSS3DCuboid extends WebComponent {
        static get tagName() { return 'css3d-cuboid'; }
        constructor() {
            super();
            this._createShadow({mode: 'open'});
        }
    }

    const template = createTemplate(html, styles);
    console.log(template);
    createComponent(CSS3DCuboid, template);
})();