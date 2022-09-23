import moment from 'moment';
import { categories } from '../js/variables.js';
const re =
  /(([12][0-9]\d{2}-\d{2}-\d{2})|((0\d|1[0-2])|\b[1-9])[-\.\/](([0-2]\d|3[01])|[1-9])[-\.\/][12]\d{1,3})/g;

const formattedNotes = function (arr) {
  const formattedArr = arr.map(elem => {
    const formattedDate = moment(elem.created).locale('en').format('MMM DD, YYYY');
    const arrDates = elem.content.match(re);
    const selectionDates = !!arrDates ? arrDates.join(', ') : '';
    return {
      ...elem,
      created: formattedDate,
      dates: selectionDates,
      image: categories[elem.category],
    };
  });
  return formattedArr;
};

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
        image: categories[elem.category],
      };
      return [...acc, newItem];
    }
  }, []);
  return arrRes;
};

export { sumNotes, formattedNotes };
