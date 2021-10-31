import Creature from './Creature';
import { inchesToFeet } from './helpers';

/**
 * A blueprint for humans.
 *
 * @extends Creature
 */
class Human extends Creature {
    /**
     * Construct the instance.
     *
     * @param {Object} data
     * @param {string} data.name
     * @param {(string|number)} data.feet
     * @param {(string|number)} data.inches
     * @param {(string|number)} data.weight
     * @param {string} data.diet
     */
    constructor(data) {
        super(data);

        /**
         * Name.
         *
         * @type {string}
         */
        this.name = data.name;

        /**
         * Height, feet part.
         *
         * @type {number}
         */
        this.feet = parseInt(data.feet);

        /**
         * Height, inches part.
         *
         * @type {number}
         */
        this.inches = parseInt(data.inches);
    }

    /**
     * Calculate height based on feet and inches.
     * Getter simplifies comparison of the height properties.
     *
     * @returns {number}
     */
    get height() {
        return inchesToFeet(this.inches, this.feet);
    }

    /**
     * Compose a template string representing the object.
     *
     * @returns {string}
     */
    renderGraphics() {
        return `
            <div class="grid-item">
                <h3>${this.name}</h3>
                <img src="${this.getImageSource()}" alt="${this.species}">
            </div>
        `;
    }
}

export default Human;
