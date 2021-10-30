const DATA = [
    {
        species: 'Triceratops',
        weight: 13000,
        height: 114,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'First discovered in 1889 by Othniel Charles Marsh'
    },
    {
        species: 'Tyrannosaurus Rex',
        weight: 11905,
        height: 144,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'The largest known skull measures in at 5 feet long.'
    },
    {
        species: 'Ankylosaurus',
        weight: 10500,
        height: 55,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Ankylosaurus survived for approximately 135 million years.'
    },
    {
        species: 'Brachiosaurus',
        weight: 70000,
        height: 372,
        diet: 'herbivore',
        where: 'North America',
        when: 'Late Jurassic',
        fact: 'An asteroid was named 9954 Brachiosaurus in 1991.'
    },
    {
        species: 'Stegosaurus',
        weight: 11600,
        height: 79,
        diet: 'herbivore',
        where: 'North America, Europe, Asia',
        when: 'Late Jurassic to Early Cretaceous',
        fact: 'The Stegosaurus had between 17 and 22 separate places and flat spines.'
    },
    {
        species: 'Elasmosaurus',
        weight: 16000,
        height: 59,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.'
    },
    {
        species: 'Pteranodon',
        weight: 44,
        height: 20,
        diet: 'carnivore',
        where: 'North America',
        when: 'Late Cretaceous',
        fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.'
    },
    {
        species: 'Pigeon',
        weight: 0.5,
        height: 9,
        diet: 'herbivore',
        where: 'World Wide',
        when: 'Holocene',
        fact: 'All birds are living dinosaurs.'
    }
];

const INCHES_IN_FOOT = 12;

/**
 * Helper: limit decimal points of the given number.
 *
 * @function
 * @param {number} number
 * @param {number} [decimalPoints]
 * @returns {number}
 */
const toPrecision = (number, decimalPoints = 2) => {
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
const inchesToFeet = (inches, feet = 0) => {
    return toPrecision(inches / INCHES_IN_FOOT + feet);
};

/**
 * Helper: capitalize the first letter of the given string.
 *
 * @function
 * @param {string} word
 * @returns {string}
 */
const capitalizeFirstLetter = (word) => {
    return word[0].toUpperCase() + word.substr(1);
};

/**
 * Helper: get array value at random index.
 *
 * @function
 * @param {Array} array
 * @returns {*}
 */
const getRandomValue = (array) => {
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
const insertInTheMiddleOf = (array, element) => {
    const middle = Math.floor(array.length / 2);

    return array.slice(0, middle).concat([element, ...array.slice(middle)]);
};

/**
 * Helper: convert form data to the digestible object. Ignore key-value pairs
 * that are out of scope or doubled.
 *
 * @function
 * @param {HTMLElement} form
 * @param {string[]} scope
 * @returns {Object}
 */
const processFormData = (form, scope) => {
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

/**
 * A blueprint for the human object.
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

    scopeFactProperties() {
        return Object.keys(this)
            .filter(key => key !== 'species' && typeof this[key] !== 'function');
    }

    getRandomFactProperty() {
        return getRandomValue(this.scopeFactProperties());
    }

    composeComparisonMethodName(attribute) {
        return `compare${capitalizeFirstLetter(attribute)}`;
    }

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

    compareDiet(diet) {
        if (this.diet.toLowerCase() === diet.toLowerCase()) {
            return 'Diet: same as yours!';
        }

        return `Diet: ${this.diet}`;
    }

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

const dinosaurs = DATA.map(data => new Dinosaur(data));

// DOM manipulations
const $form = document.querySelector('form');

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    $form.classList.add('hidden');

    const human = new Human(processFormData(
        $form,
        ['name', 'feet', 'inches', 'weight', 'diet']
    ));

    const dinoGraphics = dinosaurs.map(dinosaur => dinosaur.renderGraphics(human));
    const allGraphics = insertInTheMiddleOf(dinoGraphics, human.renderGraphics());

    document.querySelector('#grid').innerHTML = allGraphics.join('');
});
