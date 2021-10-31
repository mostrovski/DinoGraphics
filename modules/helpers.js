/**
 * Helper: limit decimal points of the given number.
 *
 * @function
 * @param {number} number
 * @param {number} [decimalPoints]
 * @returns {number}
 */
export const toPrecision = (number, decimalPoints = 2) => {
    return Number(number.toFixed(decimalPoints));
};

/**
 * Helper: convert inches, or inches and feet into feet.
 *
 * @function
 * @param {number} inches
 * @param {number} [feet]
 * @returns {number}
 */
export const inchesToFeet = (inches, feet = 0) => {
    const INCHES_IN_FOOT = 12;

    return toPrecision(inches / INCHES_IN_FOOT + feet);
};

/**
 * Helper: capitalize the first letter of the given string.
 *
 * @function
 * @param {string} word
 * @returns {string}
 */
export const capitalizeFirstLetter = (word) => {
    return word[0].toUpperCase() + word.substr(1);
};

/**
 * Helper: get array value at random index.
 *
 * @function
 * @param {Array} array
 * @returns {*}
 */
export const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

/**
 * Helper: compose new array with the given element inserted in the middle of
 * the original array.
 *
 * @function
 * @param {Array} array
 * @param {*} element
 * @returns {Array}
 */
export const insertInTheMiddleOf = (array, element) => {
    const middle = Math.floor(array.length / 2);

    return array.slice(0, middle).concat([element, ...array.slice(middle)]);
};

/**
 * Helper: convert form data to the digestible object. Ignore key-value pairs
 * that are out of scope or doubled.
 *
 * @function
 * @param {HTMLFormElement} form
 * @param {string[]} scope
 * @returns {Object}
 */
export const processFormData = (form, scope) => {
    const data = {};
    const entries = new FormData(form).entries();

    for (const keyValue of entries) {
        const key = keyValue[0];
        if (scope.includes(key) && !data[key]) {
            data[key] = keyValue[1];
        }
    }

    return data;
};