import utils from './FormUtil';

const { formatNumberOnly } = utils;

const amountSort = (firstRow, secondRow) => {
  const firstString = formatNumberOnly(firstRow.amount);
  const secondString = formatNumberOnly(secondRow.amount);

  const firstAmount = parseFloat(firstString.substring(0, firstString.length - 2));
  const secondAmount = parseFloat(secondString.substring(0, secondString.length - 2));
  if (firstAmount > secondAmount) { return 1; }
  if (secondAmount > firstAmount) { return -1; }
  return 0;
};

export default { amountSort };
