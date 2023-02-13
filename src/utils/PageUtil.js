const checkPageIdIsValid = (id) => {
  const isIdNotInteger = !isNaN(parseInt(id, 10));
  return ((id !== '') && isIdNotInteger);
};

export default { checkPageIdIsValid };
