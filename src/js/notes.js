import notesTemplate from '../templates/notes.hbs';
import moment from 'moment';

const renderNotes = function (arr) {
  const formatedArr = arr.map(elem => {
    return { ...elem, created: moment(elem.created).locale('en').format('MMM DD, YYYY') };
  });
  const markup = notesTemplate(formatedArr);
  const notesRef = document.querySelector('.js-notes');
  notesRef.innerHTML = '';
  notesRef.insertAdjacentHTML('beforeend', markup);
};

// const addNote = function () {};

export { renderNotes };
