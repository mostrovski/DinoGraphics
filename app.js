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
const inchesToFeet = (inches, feet = 0) => {
    return (inches / INCHES_IN_FOOT + feet).toFixed(2);
};
const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.substr(1);
};
const getRandomValue = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Create Dino Constructor
class Dinosaur {
    constructor(data) {
        this.species = data.species;
        this.weight = data.weight;
        this.height = data.height;
        this.diet = data.diet;
        this.where = data.where;
        this.when = data.when;
        this.fact = data.fact;
    }

    presentFact(comparableObject) {
        const fact = this.getRandomFactProperty();

        if (['weight', 'height', 'diet'].includes(fact)) {
            const method = this.composeComparisonMethodName(fact);

            return this[method](comparableObject[fact]);
        }

        return `${capitalizeFirstLetter(fact)}: ${this[fact]}`;
    }

    getRandomFactProperty() {
        return getRandomValue(this.scopeFactProperties());
    }

    scopeFactProperties() {
        return Object.keys(this)
            .filter(key => key !== 'species' && typeof this[key] !== 'function');
    }

    composeComparisonMethodName(attribute) {
        return `compare${capitalizeFirstLetter(attribute)}`;
    }

    compareWeight(weight) {
        let diff = this.weight - weight;

        if (diff === 0) {
            return 'Weight: just like yours!';
        }
        if (diff > 0) {
            return `Weight: ${diff} lbs heavier than you!`;
        }

        return `Weight: ${Math.abs(diff)} lbs lighter than you!`;
    }

    compareHeight(height) {
        let diff = inchesToFeet(this.height) - height;

        if (diff === 0) {
            return 'Height: is as tall as you!';
        }
        if (diff > 0) {
            return `Height: is ${diff} feet taller than you!`;
        }

        return `Height: is ${Math.abs(diff)} feet shorter than you!`;
    }

    compareDiet(diet) {
        if (this.diet === diet) {
            return 'Diet: same as yours!';
        }

        return `Diet: ${this.diet}`;
    }
}

// Create Dino Objects
const dinosaurs = DATA.map(data => new Dinosaur(data));

// Create Human Object

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
