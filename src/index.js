import './sass/main.scss';
import moment from 'moment';
import { v4 as createID } from 'uuid';

import initNotesItems from './data/notes.json';
import { renderNotes, renderSummary, renderModal } from './js/render';

let notesItems = [...initNotesItems];

const renderPage = function (arr = notesItems) {
  const signArchived = buttonArchived.dataset.archived;
  renderNotes(arr, signArchived);
  renderSummary(arr);
  notesItems = arr;
};

const toggleModal = function () {
  modalBackdrop.classList.toggle('is-hidden');
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

const editNotes = function (elem) {
  const idNote = elem.dataset.index;
  const editNote = notesItems.find(elem => elem.id === idNote);
  toggleModal();
  renderModal(editNote);
  modalForm.querySelector('.js-category-select').value = editNote.category;
  modalForm.dataset.mode = 'edit';
  modalForm.dataset.indexEditNote = idNote;
};

const archiveNotes = function (elem) {
  const idNote = elem.dataset.index;
  const updatedNotesItems = notesItems.map(elem => {
    if (elem.id === idNote) {
      return { ...elem, archived: !elem.archived };
    }
    return elem;
  });
  renderPage(updatedNotesItems);
};

const deleteNotes = function (elem) {
  const idNote = elem.dataset.index;
  const updatedNotesItems = notesItems.filter(elem => elem.id !== idNote);
  renderPage(updatedNotesItems);
};

const onClickButton = function (event) {
  let usedElem;
  if (event.target.nodeName === 'I') {
    usedElem = event.target.parentElement;
  }
  if (event.target.nodeName === 'BUTTON') {
    usedElem = event.target;
  }
  if (!usedElem) return;
  if (usedElem.classList.contains('notes__line__button-edit')) {
    editNotes(usedElem);
  }
  if (usedElem.classList.contains('notes__line__button-archived')) {
    archiveNotes(usedElem);
  }
  if (usedElem.classList.contains('notes__line__button-deleted')) {
    deleteNotes(usedElem);
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
    updatedNotesItems = [...notesItems, { ...newNote, id: createID(), archived: false }];
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

const onClickButtonArchived = function (event) {
  const currentValue = buttonArchived.dataset.archived;
  const newValue = defineNewArchivedValue(currentValue);
  buttonArchived.dataset.archived = newValue;
  document.querySelector('.notes__header__button-archived__icon').classList.toggle('focus');
  renderNotes(notesItems, newValue);
};

const onClickButtonDeleteAll = function () {
  renderPage([]);
};

const buttonArchived = document.querySelector('.notes__header__button-archived');

renderPage(notesItems);

const notesList = document.querySelector('.js-notes');
const modalBackdrop = document.querySelector('[data-modal]');
const modalForm = document.querySelector('.modal__form');
const createModalBtn = document.querySelector('[data-modal-open]');
const closeModalBtn = document.querySelector('[data-modal-close]');
const deleteAllBtn = document.querySelector('.notes__header__button-delete');

notesList.addEventListener('click', onClickButton);
createModalBtn.addEventListener('click', onClickCreate);
closeModalBtn.addEventListener('click', toggleModal);
modalForm.addEventListener('submit', onSubmitForm);
buttonArchived.addEventListener('click', onClickButtonArchived);
deleteAllBtn.addEventListener('click', onClickButtonDeleteAll);
