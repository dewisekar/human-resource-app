const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
];

export default { columns, data };
