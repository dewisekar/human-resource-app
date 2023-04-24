const sliceMonth = (value) => (`0${value}`).slice(-2);

const getStartEndDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 26) {
    return { startDate: `${year}-${sliceMonth(month - 1)}-26`, endDate: `${year}-${sliceMonth(month)}-25` };
  }

  return { startDate: `${year}-${sliceMonth(month)}-26`, endDate: `${year}-${sliceMonth(month + 1)}-25` };
};

export default { getStartEndDate };
