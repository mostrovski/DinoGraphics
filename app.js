// Declare data and helpers
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

const toPrecision = (number, decimalPoints = 2) => {
    return Number(number.toFixed(decimalPoints));
};

const inchesToFeet = (inches, feet = 0) => {
    return toPrecision(inches / INCHES_IN_FOOT + feet);
};

const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.substr(1);
};

const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const insertInTheMiddleOf = (array, element) => {
    const middle = Math.floor(array.length / 2);

    return array.slice(0, middle).concat([element, ...array.slice(middle)]);
};

const processFormData = (form, scope) => {
    const data = {};
    const entries = new FormData(form).entries();

    for (const keyValue of entries) {
        const key = keyValue[0];
        if (scope.includes(key)) {
            data[key] = keyValue[1];
        }
    }

    return data;
};

class Creature {
    constructor(data) {
        this.species = data.species || 'Human';
        this.weight = parseInt(data.weight);
        this.diet = data.diet;
    }

    getImageSource() {
        return `images/${this.species.toLowerCase()}.png`;
    }
}

class Human extends Creature {
    constructor(data) {
        super(data);
        this.name = data.name;
        this.feet = parseInt(data.feet);
        this.inches = parseInt(data.inches);
    }

    get height() {
        return inchesToFeet(this.inches, this.feet);
    }

    renderGraphics() {
        return `
            <div class="grid-item">
                <h3>${this.name}</h3>
                <img src="${this.getImageSource()}" alt="${this.species}">
            </div>
        `;
    }
}

class Dinosaur extends Creature {
    constructor(data) {
        super(data);
        this.height = data.height;
        this.where = data.where;
        this.when = data.when;
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
