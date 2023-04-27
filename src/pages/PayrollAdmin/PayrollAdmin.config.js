const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: '200px',
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
    width: '200px',
  },
  {
    name: 'Division',
    selector: (row) => row.division,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    width: '300px',
  },
];

export default { columns };
