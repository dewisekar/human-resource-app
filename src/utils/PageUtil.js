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

export default {
  checkPageIdIsValid, getRupiahString, convertDataToSelectOptions, convertDataToSelectOptions,
};
