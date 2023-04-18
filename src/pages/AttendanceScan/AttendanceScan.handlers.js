const convertData = (data) => {
  const mappedData = data.map((item) => {
    const { dateTime } = item;
    const convertedDate = new Date(dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return { ...item, dateTime: convertedDate };
  });

  return mappedData;
};

export default { convertData };
