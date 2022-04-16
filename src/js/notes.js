import notesItems from '../notes.json';
import notesTemplate from '../templates/notes.hbs';
const markup = notesTemplate(notesItems);
const notesRef = document.querySelector('.js-notes');

notesRef.insertAdjacentHTML('beforeend', markup);
