const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Username',
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: 'Job Title',
    selector: (row) => row.jobTitle,
    sortable: true,
  },
  {
    name: 'Roles',
    selector: (row) => row.roles,
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
  },
];

export default { columns };
