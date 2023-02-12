const unpackError = (error) => {
  const { data, status, statusText } = error.response;
  const errorMessage = data.includes('</html>') ? statusText : data;
  return { message: errorMessage, status, statusText };
};

export default { unpackError };
