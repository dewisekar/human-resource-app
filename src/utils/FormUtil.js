import constants from '../constants';

const { CURRENCY } = constants;

const formatInputCurrency = (string = '', currency = null) => {
  const amount = string.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return currency ? `${CURRENCY[currency]} ${amount}` : amount;
};

const unformatInputCurrency = (string = '', currency = null) => {
  if (currency) { return string.replace(`${CURRENCY[currency]} `, '').replace(',', ''); }
  return string.replace(',', '');
};

const formatIndonesianPhoneNumber = (phoneNumber) => {
  if (phoneNumber[0] === '0') {
    return `62${phoneNumber.substring(1, phoneNumber.length)}`;
  }
  return phoneNumber;
};

const formatNumberOnly = (number) => number.replace(/\D+/g, '');

export default {
  formatInputCurrency,
  unformatInputCurrency,
  formatIndonesianPhoneNumber,
  formatNumberOnly,
};
