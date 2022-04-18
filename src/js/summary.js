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

const renderSummary = function (arr) {
  const markup = summaryTemplate(sumNotes(arr));
  const summaryRef = document.querySelector('.js-summary');
  summaryRef.innerHTML = '';
  summaryRef.insertAdjacentHTML('beforeend', markup);
};

export { renderSummary };
