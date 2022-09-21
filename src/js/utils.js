import moment from 'moment';
import { categories } from '../js/variables.js';

const re =
  /((([0-2\d|3[01])[-\.\/](0\d|1[0-2]))|((0\d|1[0-2])[-\.\/]([0-2]\d|3[01]))[-\.\/][12]?[09]?[0-9][0-9])|([12]?[09]?[0-9][0-9]-(0\d|1[0-2])-([0-2]\d|3[01]))/g;
const re2 = /[0-1]?[0-9][-\.\/][0-3]?[0-9][-\.\/][12][09][0-9][0-9]/g;

const formatedNotes = function (arr) {
  const formatedArr = arr.map(elem => {
    const formatedDate = moment(elem.created).locale('en').format('MMM DD, YYYY');
    const arrDates = elem.content.match(re);
    const selectionDates = !!arrDates ? arrDates.join(', ') : '';
    return {
      ...elem,
      created: formatedDate,
      dates: selectionDates,
      image: categories[elem.category],
    };
  });
  return formatedArr;
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

export { sumNotes, formatedNotes };
