import notesItems from '../data/notes.json';
import notesTemplate from '../templates/notes.hbs';

const renderNotes = function () {
  const markup = notesTemplate(notesItems);
  const notesRef = document.querySelector('.js-notes');

  notesRef.insertAdjacentHTML('beforeend', markup);
  console.log('heare');
};

// const addNote = function () {};

export { renderNotes };
