import notesTemplate from '../templates/notes.hbs';

const renderNotes = function (arr) {
  const markup = notesTemplate(arr);
  const notesRef = document.querySelector('.js-notes');
  notesRef.innerHTML = '';
  notesRef.insertAdjacentHTML('beforeend', markup);
};

// const addNote = function () {};

export { renderNotes };
