import notesTemplate from '../templates/notes.hbs';
import moment from 'moment';
const re = /[0-1]?[0-9][-\.\/][0-3]?[0-9][-\.\/][12][09][0-9][0-9]/g;
const renderNotes = function (arr) {
  const formatedArr = arr.map(elem => {
    const formatedDate = moment(elem.created).locale('en').format('MMM DD, YYYY');
    const arrDates = elem.content.match(re);
    const selectionDates = !!arrDates ? arrDates.join(', ') : '';
    return { ...elem, created: formatedDate, dates: selectionDates };
  });
  const markup = notesTemplate(formatedArr);
  const notesRef = document.querySelector('.js-notes');
  notesRef.innerHTML = '';
  notesRef.insertAdjacentHTML('beforeend', markup);
};

// const addNote = function () {};

export { renderNotes };
