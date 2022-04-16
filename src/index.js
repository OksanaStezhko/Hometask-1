import './sass/main.scss';
import './js/variables.js';
import './js/renderPage.js';

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

const onClickCreateNote = function (event) {
  console.log('Создать заметку');
};
const notesList = document.querySelector('.js-notes');
const buttonCreateNote = document.querySelector('.js-create-note');

notesList.addEventListener('click', onClickButton);
buttonCreateNote.addEventListener('click', onClickCreateNote);
