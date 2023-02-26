const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export default { columns };
