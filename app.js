import Dinosaur from './modules/Dinosaur';
import Human from './modules/Human';
import { extractJson, insertInTheMiddleOf, processFormData } from './modules/helpers';

// While the user is looking around, prepare the dinosaurs.
let dinosaurs;
extractJson('data/dinosaurs.json').then(json => {
    dinosaurs = json.data.map(data => new Dinosaur(data));
});

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
