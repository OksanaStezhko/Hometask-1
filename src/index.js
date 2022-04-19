import './sass/main.scss';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import initNotesItems from './data/notes.json';
import { renderNotes } from './js/notes';
import { renderSummary } from './js/summary';
import { renderModal } from './js/modal';

let notesItems = [...initNotesItems]; //вводим переменную-массив для корректного редактирования notes

const renderPage = function (arr = notesItems) {
  const signArchived = buttonArchived.dataset.archived;

  renderNotes(arr, signArchived);
  renderSummary(arr);
  notesItems = [...arr];
};

const toggleModal = function () {
  document.body.classList.toggle('modal-open'); //????
  modalBackdrop.classList.toggle('is-hidden');
};

const editNotes = function (event) {
  const idNote = event.target.dataset.index;
  const editNote = notesItems.find(elem => elem.id === idNote);
  toggleModal();
  renderModal(editNote);
  modalForm.querySelector('.js-category-select').value = editNote.category;
  modalForm.dataset.mode = 'edit';
  modalForm.dataset.indexEditNote = idNote;
};

const archiveNotes = function (event) {
  const idNote = event.target.dataset.index;
  const updatedNotesItems = notesItems.map(elem => {
    if (elem.id === idNote) {
      return { ...elem, archived: !elem.archived };
    }
    return elem;
  });
  renderPage(updatedNotesItems);
};

const deleteNotes = function (event) {
  const idNote = event.target.dataset.index;
  const updatedNotesItems = notesItems.filter(elem => elem.id !== idNote);
  renderPage(updatedNotesItems);
};

const onClickButton = function (event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (event.target.classList.contains('button-edit')) {
    editNotes(event);
  }
  if (event.target.classList.contains('button-archived')) {
    archiveNotes(event);
  }
  if (event.target.classList.contains('button-deleted')) {
    deleteNotes(event);
  }
};

const onClickCreate = function (event) {
  toggleModal();
  renderModal();
  document.querySelector('.js-date-created').value = moment().format('YYYY-MM-DD');
  modalForm.dataset.mode = 'create';
};

const onSubmitForm = function (event) {
  event.preventDefault();

  const idNote = event.target.dataset.indexEditNote;
  const modalMode = event.target.dataset.mode;
  const elementsForms = event.target.elements;
  let updatedNotesItems = [];
  const newNote = {
    name: elementsForms[0].value,
    created: elementsForms[1].value,
    category: elementsForms[2].value,
    content: elementsForms[3].value,
  };

  if (modalMode === 'create') {
    updatedNotesItems = [...notesItems, { ...newNote, id: uuidv4(), archived: false }];
  }
  if (modalMode === 'edit') {
    updatedNotesItems = notesItems.map(elem => {
      if (elem.id === idNote) {
        return { ...newNote, id: idNote, archived: elem.archived };
      }
      return elem;
    });
  }

  renderPage(updatedNotesItems);

  event.target.reset();
  toggleModal();
};

const defineNewArchivedValue = function (oldValue) {
  let newValue;
  if (oldValue === 'true') {
    newValue = 'false';
  }
  if (oldValue === 'false') {
    newValue = 'true';
  }
  return newValue;
};
const onClickButtonArchived = function (event) {
  const currentValue = event.target.dataset.archived;
  const newValue = defineNewArchivedValue(currentValue);
  event.target.dataset.archived = newValue;
  renderNotes(notesItems, newValue);
};

const buttonArchived = document.querySelector('.button-archived');

renderPage(notesItems);

const notesList = document.querySelector('.js-notes');
const modalBackdrop = document.querySelector('[data-modal]');
const modalForm = document.querySelector('.form-modal');
const createModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');

notesList.addEventListener('click', onClickButton);
createModalBtn.addEventListener('click', onClickCreate);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', onSubmitForm);
buttonArchived.addEventListener('click', onClickButtonArchived);
