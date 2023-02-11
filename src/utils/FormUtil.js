import constants from '../constants';

const { CURRENCY } = constants;

const formatInputCurrency = (string = '', currency = null) => {
  console.log('numString', string);
  const amount = string.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return currency ? `${CURRENCY[currency]} ${amount}` : amount;
};

const unformatInputCurrency = (string = '', currency = null) => {
  if (currency) { return string.replace(`${CURRENCY[currency]} `, '').replace(',', ''); }
  return string.replace(',', '');
};

export default { formatInputCurrency, unformatInputCurrency };
