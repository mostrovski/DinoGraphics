# DinoGraphics

## A demo project showcasing work with ES6 classes and modules.

### Minimum requirements

#### UI:

- The form should contain a button, which upon clicking, removes the form;
- The button click should append a grid with 9 tiles to the DOM:
    - 7 Dinosaurs with species, image, and random fact displayed.
    - 1 Human located in the middle with name from input displayed in place of species and no fact.
    - 1 Bird with species, image, and the fact, “All birds are Dinosaurs.”
    - Refreshing the screen and entering new data should reveal different facts.

#### Code:

- There should be at least 1 class/function for creating new objects. There should be 9 objects created.
- The Human object should be filled with data pulled from the form when “Compare me” is clicked.
- There should be at least 3 methods which compare Dinosaur data to the user data from the DOM.
- Should iterate through objects to create tiles with species, image, and fact that are appended to the DOM, and conditionally display appropriate information for Human, Bird, and Dinosaurs.

### Approach

Dinosaur data suggested the blueprint of the Dinosaur class. For example, the data of the Triceratops was provided as follows:

```json
{
    "species": "Triceratops",
    "weight": 13000,
    "height": 114,
    "diet": "herbivore",
    "where": "North America",
    "when": "Late Cretaceous",
    "fact": "First discovered in 1889 by Othniel Charles Marsh."
}
```

Other objects in the data array had the same structure, including the pigeon: all birds are living dinosaurs, right?
Thus, there was no need in the separate *Bird* class/object. I had to answer these key questions:

- Do I need a separate class for a *Human*?
- How would I compare the human to the dinosaurs?
- How would I *randomize* facts shown?
- At which point would I generate tiles?
- Which logic would live inside entities, and which - outside?

I ended up with the following:

1. Although there was just one Human object planned, I decided - at least for the sake of consistency - to go with the Human class.
   Moreover, since humans and dinosaurs had some properties and behavior in common, I extracted the *Creature* class that both Dinosaur
   and Human classes extended.
2. I decided to compare weight, height, and diet.
3. I opted for help from the simple `Math.random()`, choosing from the non-functional properties excluding *species*.
4. Since some facts required user data, I decided to render the tiles on *submit* event.
5. I decided to put as much logic as possible in classes. For example, I made Humans and Dinosaurs responsible for rendering their tiles.
   I had to extract a few helpers along the way, though: they were too generic to fit in with any class.

### How to run it

1. Make sure you have **Node.js** and **npm** [installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Clone, or download and extract the repository.
3. Change to the root of the project and run `npm i` to install the dependencies.
4. Run `npm run dev` to start the server powered by [Vite](https://vitejs.dev/).
5. In your terminal, you should see something like this:

   ```bash
   vite v2.6.13 dev server running at:

   > Local: http://localhost:3000/
   ```
6. Open provided link in your browser.

### Kudos

The starter code and project requirements were provided as a part of the [Intermediate JavaScript Nanodegree](https://www.udacity.com/course/intermediate-javascript-nanodegree--nd032) at Udacity.
