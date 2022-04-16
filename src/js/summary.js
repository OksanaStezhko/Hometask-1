import summaryItems from '../data/notes.json';

import summaryTemplate from '../templates/summary.hbs';

const sumNotes = function (arrInit) {
  const arrRes = arrInit.reduce((acc, elem, idx, array) => {
    const isInArr = acc.find(item => item.category === elem.category);
    let newItem;

    if (isInArr) {
      if (elem.archived) {
        isInArr.archived += 1;
      } else {
        isInArr.active += 1;
      }
      return acc;
    } else {
      newItem = {
        category: elem.category,
        active: +!elem.archived,
        archived: +elem.archived,
      };
      return [...acc, newItem];
    }
  }, []);
  return arrRes;
};

const renderSummary = function () {
  const markup = summaryTemplate(sumNotes(summaryItems));
  const summaryRef = document.querySelector('.js-summary');

  summaryRef.insertAdjacentHTML('beforeend', markup);
};

export { renderSummary };
