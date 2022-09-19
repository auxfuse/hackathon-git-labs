// Global variables
let touch_device = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
let bgSVG = document.querySelector('#svg-bg');

/**
 * If browser is "Mobile" variant, remove Background <img> tag to improve performance
 * @param {boolean} touch_device - checks for current device using TouchPoints or "ontouchstart" event method
*/
function detectDevice(touch_device) {
    if(touch_device) {
        bgSVG.remove();
    }
};

detectDevice(touch_device);
