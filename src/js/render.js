import modalTemplate from '../templates/modal.hbs';
import summaryTemplate from '../templates/summary.hbs';
import notesTemplate from '../templates/notes.hbs';
import { formatedNotes, sumNotes } from './utils';

const renderNotes = function (arr, sign) {
  const notesRef = document.querySelector('.js-notes');
  if (!arr.length) {
    notesRef.innerHTML = '';
    return;
  }

  const filteredArr = arr.filter(elem => String(elem.archived) === sign);
  const formatedArr = formatedNotes(filteredArr);
  const markup = notesTemplate(formatedArr);

  notesRef.innerHTML = '';
  notesRef.insertAdjacentHTML('beforeend', markup);
};

const renderSummary = function (arr) {
  const summaryRef = document.querySelector('.js-summary');
  if (!arr.length) {
    summaryRef.innerHTML = '';
    return;
  }

  const markup = summaryTemplate(sumNotes(arr));

  summaryRef.innerHTML = '';
  summaryRef.insertAdjacentHTML('beforeend', markup);
};

const renderModal = function (arr) {
  const markup = modalTemplate(arr);
  const modalRef = document.querySelector('.js-modal');
  modalRef.innerHTML = '';
  modalRef.insertAdjacentHTML('beforeend', markup);
};

export { renderNotes, renderSummary, renderModal };
