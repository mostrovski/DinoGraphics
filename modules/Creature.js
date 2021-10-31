/**
 * Container for properties common to humans and dinosaurs.
 */
class Creature {
    /**
     * Construct the instance.
     *
     * @param {Object} data
     * @param {(string|undefined)} data.species
     * @param {(string|number)} data.weight
     * @param {string} data.diet
     */
    constructor(data) {
        /**
         * Species: if not provided in data object, human is assumed.
         *
         * @type {string}
         */
        this.species = data.species || 'Human';

        /**
         * Weight in pounds.
         *
         * @type {number}
         */
        this.weight = parseInt(data.weight);

        /**
         * Diet: herbivore, carnivore, or omnivore.
         *
         * @type {string}
         */
        this.diet = data.diet;
    }

    /**
     * Compose relative path to the image: file name corresponds to the
     * species in the lower case.
     *
     * @returns {string}
     */
    getImageSource() {
        return `images/${this.species.toLowerCase()}.png`;
    }
}

export default Creature;
