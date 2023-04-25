const columns = [
  {
    name: 'Pin',
    selector: (row) => row.fingerprintPin,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: '250px',
  },
];

export default { columns };
