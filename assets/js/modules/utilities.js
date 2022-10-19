

/**
 * Creates an array of numbers in a given range
 * @param {Number} max - Maximum number in range 
 * @param {Number} min - (optional) Minimum number in range. Defaults to 0
 * @returns Randomised list of numbers
 */
export const genIndexes = (max, min = 0) => new Array(max - min).fill(0).map((_, i) => i + min);


/** Returns a random emoji from the emoji array passed */
export const getRandomEmoji = emojis => emojis[Math.floor(Math.random() * emojis.length)];


/**
 * In place shuffles array into a random order
 * @param {Array} arr - Array to be shuffled
 * @returns Randomised array
 */
export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


/**
 * Wraps a given input to a min max range. Wrapping the value back 
 * to min if it is larger than max, and setting it to max if it is 
 * smaller than min.
 * @param {Number} min - Minimum range value
 * @param {Number} val - Input value
 * @param {Number} max - Maximum range value
 * @returns {Number} between min and max
 */
export const wrapInRange = (min, val, max) => {
    max++;
    return (((val - min) % (max - min)) + (max - min)) % (max - min) + min;
}

