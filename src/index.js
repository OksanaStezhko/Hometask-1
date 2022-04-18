import './sass/main.scss';
import moment from 'moment';
import notesItems from './data/notes.json';
import { renderNotes } from './js/notes';
import { renderSummary } from './js/summary';

const renderPage = function (arr) {
  renderNotes(arr);
  renderSummary(arr);
};

const onClickButton = function (event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.classList.contains('button-edit')) {
    console.dir(event.target.dataset.index);
  }
  if (event.target.classList.contains('button-archived')) {
    console.log('Кнопка архивирования');
  }
  if (event.target.classList.contains('button-deleted')) {
    console.log('Кнопка удаления');
  }
};

const toggleModal = function () {
  document.body.classList.toggle('modal-open');
  modalForm.classList.toggle('is-hidden');
};

const onClickEdit = function (event) {};

const onClickCreate = function (event) {
  toggleModal();
  dateCreated.value = moment().format('YYYY-MM-DD');
};

const onSubmitForm = function (event) {
  event.preventDefault();
  const elementsForms = event.target.elements;
  const newNote = {
    name: elementsForms[0].value,
    created: elementsForms[1].value,
    category: elementsForms[2].value,
    content: elementsForms[3].value,
    dates: elementsForms[4].value,
  };
  notesItems.push(newNote);
  renderPage(notesItems);
  event.target.reset();
  toggleModal();
};

renderPage(notesItems);

const notesList = document.querySelector('.js-notes');
const modalForm = document.querySelector('[data-modal]');
const createModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = modalForm.querySelector('[data-modal-close]');
const dateCreated = modalForm.querySelector('.js-date-created');

notesList.addEventListener('click', onClickButton);
createModalBtn.addEventListener('click', onClickCreate);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', onSubmitForm);
