const checkPageIdIsValid = (id) => {
  const isIdNotInteger = !isNaN(parseInt(id, 10));
  return ((id !== '') && isIdNotInteger);
};

const getRupiahString = (balance) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(balance);

export default { checkPageIdIsValid, getRupiahString };
