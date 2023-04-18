const columns = [
  {
    name: 'Pin',
    selector: (row) => row.pin,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: '250px',
  },
  {
    name: 'Date',
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: 'Time',
    selector: (row) => row.dateTime,
    sortable: true,
  },
  {
    name: 'Type',
    selector: (row) => row.type,
    sortable: true,
  },
];

export default { columns };
