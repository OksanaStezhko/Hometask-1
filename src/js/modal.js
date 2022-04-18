import modalTemplate from '../templates/modal.hbs';

const renderModal = function (arr) {
  const markup = modalTemplate(arr);
  const modalRef = document.querySelector('.js-modal');
  modalRef.innerHTML = '';
  modalRef.insertAdjacentHTML('beforeend', markup);
};

export { renderModal };
