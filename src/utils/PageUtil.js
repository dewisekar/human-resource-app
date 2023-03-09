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
  const convertedStartDate = new Date(startDate).setHours(0, 0, 0, 0);
  const convertedEndDate = new Date(endDate).setHours(0, 0, 0, 0);
  const convertedDate = dateToBeCompared ? new Date(dateToBeCompared).setHours(0, 0, 0, 0)
    : new Date().setHours(0, 0, 0, 0);

  return convertedStartDate <= convertedDate && convertedDate <= convertedEndDate;
};

export default {
  checkPageIdIsValid,
  getRupiahString,
  convertDataToSelectOptions,
  isBetweenTwoDates,
};
