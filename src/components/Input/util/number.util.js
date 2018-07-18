const monthsWithThirtyOneDays = [1, 3, 5, 7, 8, 10, 12];

const maxDaysForMonth = (month, year = 1999) => {
  if (Number(month) === 2) {
    const numYear = year === "" ? 1999 : Number(year);

    if (numYear % 1000 === 0) return '29';

    return (numYear % 4 === 0 && numYear % 100 !== 0) ? '29' : '28';
  }

  return monthsWithThirtyOneDays.includes(Number(month)) ? '31' : '30';
};

const limit = (val, max) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

const getFormatedDate = (val) => {
  let year = val.substring(4, 8);
  let month = limit(val.substring(0, 2), '12');
  let day = limit(val.substring(2, 4), maxDaysForMonth(month, year));

  return month + (day.length ? '/' + day : '') + (year.length ? '/' + year : '');
}

export const getFormat = (type = '', customFormat = "") => {
  switch (type) {
    case "currency":
      return {
        thousandSeparator: true,
        decimalScale: 2,
        prefix: "$ ",
        placeholder: "$ 19.99"
      };
    
    case "phone":
      return {
        format: "(###) ###-####",
        placeholder: "(123) 456-7890"
      }
    case "date": {
      return {
        placeholder: "MM/DD/YYYY",
        format: getFormatedDate,
      }
    }
    default:
      return {
        format: customFormat
      };
  }
}