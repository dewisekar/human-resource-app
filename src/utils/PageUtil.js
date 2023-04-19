import orderBy from 'lodash/orderBy';

const checkPageIdIsValid = (id) => {
  const isIdNotInteger = !isNaN(parseInt(id, 10));
  return ((id !== '') && isIdNotInteger);
};

const getRupiahString = (balance) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(balance);

const convertDataToSelectOptions = (data, valueKey, labelKey) => {
  const mappedData = data.map((item) => ({ label: item[labelKey], value: item[valueKey] }));
  return mappedData;
};

const isBetweenTwoDates = (startDate, endDate, dateToBeCompared = null) => {
  const convertedStartDate = startDate.setHours(0, 0, 0, 0);
  const convertedEndDate = endDate.setHours(0, 0, 0, 0);
  const convertedDate = dateToBeCompared ? new Date(dateToBeCompared).setHours(0, 0, 0, 0)
    : new Date().setHours(0, 0, 0, 0);

  return convertedStartDate <= convertedDate && convertedDate <= convertedEndDate;
};

const getRealValuesForTable = (data) => {
  const result = {};
  const keys = Object.keys(data);

  keys.forEach((key) => {
    const lastKey = key.toString().substring(1, key.length);
    const newKey = `real${key[0].toUpperCase()}${lastKey}`;
    result[newKey] = data[key];
  });

  return result;
};

const convertObjectToRupiahString = (data) => {
  const result = {};
  const keys = Object.keys(data);

  keys.forEach((key) => {
    result[key] = getRupiahString(data[key]);
  });

  return result;
};

const customTableSort = (rows, field, direction) => {
  const REAL_FIELDS = {
    endDate: 'realEndDate',
    startDate: 'realStartDate',
    overtimeDate: 'realOvertimeDate',
    createdAt: 'realCreatedAt',
    approvedDate: 'realApprovedDate',
    requesterName: 'realRequesterName',
    status: 'realStatus',
    overtimeMoney: 'realOvertimeMoney',
  };

  const [, fieldName] = field.toString().split('row => row.');

  const handleField = (row) => {
    if (REAL_FIELDS[fieldName]) {
      return row[REAL_FIELDS[fieldName]];
    }

    return row[fieldName];
  };

  return orderBy(rows, handleField, direction);
};

const isEmptyString = (params) => params === '';

const dayOnly = (date) => new Date(date).setHours(0, 0, 0, 0);

const resetFormToNull = (fields, setValue) => {
  fields.forEach(({ name }) => { setValue(name, null); });
};

export default {
  checkPageIdIsValid,
  getRupiahString,
  convertDataToSelectOptions,
  isBetweenTwoDates,
  getRealValuesForTable,
  customTableSort,
  isEmptyString,
  dayOnly,
  resetFormToNull,
  convertObjectToRupiahString,
};
