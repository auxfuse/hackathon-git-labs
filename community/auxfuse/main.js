// Global variables
let touch_device = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
let animateSVG = document.querySelector('#animateCM');

/**
 * If browser is "Mobile" variant, remove ColorMatrix Element
 * @param {boolean} touch_device - checks for current device using TouchPoints or "ontouchstart" event method
*/
function detectDevice(touch_device) {
    if(touch_device) {
        animateSVG.remove();
    }
};

detectDevice(touch_device);
