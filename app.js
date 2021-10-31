import Dinosaur from './modules/Dinosaur';
import Human from './modules/Human';
import { insertInTheMiddleOf, processFormData } from './modules/helpers';

// While the user is looking around, prepare the dinosaurs.
const dinosaurs = [];

fetch('dinosaurs.json')
    .then(response => response.json())
    .then(resource => resource.data.forEach(data => {
        dinosaurs.push(new Dinosaur(data));
    }));

// Watch the form - the source of all human in this project.
const $form = document.querySelector('form');

$form.addEventListener('submit', (event) => {
    // Prevent sending the form and hide it.
    event.preventDefault();
    $form.classList.add('hidden');
    // Instantiate the human object and render the graphics.
    const human = new Human(processFormData(
        $form,
        ['name', 'feet', 'inches', 'weight', 'diet']
    ));
    const dinoGraphics = dinosaurs.map(dinosaur => dinosaur.renderGraphics(human));
    const allGraphics = insertInTheMiddleOf(dinoGraphics, human.renderGraphics());
    // Present results.
    document.querySelector('#grid').innerHTML = allGraphics.join('');
});
