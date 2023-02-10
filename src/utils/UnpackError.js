const unpackError = (error) => {
  const data = error.response.data.toString();
  const message = data.split('<pre>');
  const unprocessedMessage = message[1].split('<br>');
  const finalMessage = unprocessedMessage[0].split(': ');

  return { code: error.response.statusText, message: finalMessage[1] };
};

export default { unpackError };
