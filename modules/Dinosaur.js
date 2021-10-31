import Creature from './Creature';
import { toPrecision, inchesToFeet, capitalizeFirstLetter, getRandomValue } from './helpers';

/**
 * A blueprint for dinosaurs.
 *
 * @extends Creature
 */
class Dinosaur extends Creature {
    /**
     * Construct the instance.
     *
     * @param {Object} data
     * @param {number} data.height
     * @param {string} data.where
     * @param {string} data.when
     * @param {string} data.fact
     * @param {number} data.weight
     * @param {string} data.diet
     */
    constructor(data) {
        super(data);

        /**
         * Height in inches.
         *
         * @type {number}
         */
        this.height = data.height;

        /**
         * Where it was/is to find.
         *
         * @type {string}
         */
        this.where = data.where;

        /**
         * Geological period.
         *
         * @type {string}
         */
        this.when = data.when;

        /**
         * A fact about the species.
         *
         * @type {string}
         */
        this.fact = data.fact;
    }

    /**
     * Get properties that can be used to present a fact about the dinosaur.
     *
     * @returns {string[]}
     */
    scopeFactProperties() {
        return Object.keys(this)
            .filter(key => key !== 'species' && typeof this[key] !== 'function');
    }

    /**
     * Randomly choose one from the array of "factual" properties.
     *
     * @returns {string}
     */
    getRandomFactProperty() {
        return getRandomValue(this.scopeFactProperties());
    }

    /**
     * Based on the given string, return the name of the comparison method.
     * For example, for "weight", the "compareWeight" will be returned.
     *
     * @param {string} attribute
     *
     * @returns {string}
     */
    composeComparisonMethodName(attribute) {
        return `compare${capitalizeFirstLetter(attribute)}`;
    }

    /**
     * Comparison method #1: weight.
     *
     * Calculate the difference between the given and own weight, and return
     * a proper message.
     *
     * @param {number} weight
     *
     * @returns {string}
     */
    compareWeight(weight) {
        let diff = toPrecision(this.weight - weight);

        if (diff === 0) {
            return 'Weight: just like yours!';
        }
        if (diff > 0) {
            return `Weight: ${diff} lbs heavier than you!`;
        }

        return `Weight: ${Math.abs(diff)} lbs lighter than you!`;
    }

    /**
     * Comparison method #2: height.
     *
     * Calculate the difference between the given and own height, and return
     * a proper message.
     *
     * @param {number} height
     *
     * @returns {string}
     */
    compareHeight(height) {
        let diff = toPrecision(inchesToFeet(this.height) - height);

        if (diff === 0) {
            return 'Height: is as tall as you!';
        }
        if (diff > 0) {
            return `Height: is ${diff} feet taller than you!`;
        }

        return `Height: is ${Math.abs(diff)} feet shorter than you!`;
    }

    /**
     * Comparison method #3: diet.
     *
     * Check if the given diet equals to own diet, and return a proper message.
     *
     * @param {string} height
     *
     * @returns {string}
     */
    compareDiet(diet) {
        if (this.diet.toLowerCase() === diet.toLowerCase()) {
            return 'Diet: same as yours!';
        }

        return `Diet: ${this.diet}`;
    }

    /**
     * Compose a fact about the dinosaur based on the value of a randomly
     * chosen property.
     *
     * The argument must have weight, height, and diet properties set in order
     * to be comparable if one of them is chosen as a fact to present.
     *
     * @param {Object} comparableObject
     * @param {number} comparableObject.weight
     * @param {number} comparableObject.height
     * @param {string} comparableObject.diet
     *
     * @returns {string}
     */
    presentFact(comparableObject) {
        if (this.species === 'Pigeon') {
            return `${this.fact}`;
        }

        const fact = this.getRandomFactProperty();

        if (['weight', 'height', 'diet'].includes(fact)) {
            const method = this.composeComparisonMethodName(fact);

            return this[method](comparableObject[fact]);
        }

        return `${capitalizeFirstLetter(fact)}: ${this[fact]}`;
    }

    /**
     * Compose a template string representing the object.
     *
     * @param {Object} comparableObject
     * @see presentFact
     *
     * @returns {string}
     */
    renderGraphics(comparableObject) {
        return `
            <div class="grid-item">
                <h3>${this.species}</h3>
                <img src="${this.getImageSource()}" alt="${this.species}">
                <p>${this.presentFact(comparableObject)}</p>
            </div>
        `;
    }
}

export default Dinosaur;
