import './sass/main.scss';
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
    console.log('Кнопка редактирования');
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

const onClickCreate = function (event) {
  toggleModal();
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
const createModalBtn = document.querySelector('[data-modal-create]');
const closeModalBtn = document.querySelector('[data-modal-close]');
// const editModalBtn = document.querySelector('[data-modal-edit]');
const modalForm = document.querySelector('[data-modal]');
const submitForm = document.querySelector('.form-modal__submit');

notesList.addEventListener('click', onClickButton);
createModalBtn.addEventListener('click', onClickCreate);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', onSubmitForm);
// editModalBtn.addEventListener('click', toggleModal);
