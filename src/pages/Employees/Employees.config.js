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
    name: 'Division',
    selector: (row) => row.division,
    sortable: true,
  },
  {
    name: 'Department',
    selector: (row) => row.department,
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
