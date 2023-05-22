const columns = [
  {
    name: 'Employee Name',
    selector: (row) => row.employee,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Month',
    selector: (row) => row.month,
    sortable: true,
    width: '150px',
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
  },
  // {
  //   name: 'Division',
  //   selector: (row) => row.division,
  //   sortable: true,
  //   width: '200px',
  // },
  // {
  //   name: 'Department',
  //   selector: (row) => row.department,
  //   sortable: true,
  //   width: '200px',
  // },
  {
    name: 'Maker',
    selector: (row) => row.maker,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Created At',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    width: '370px',
  },
];

const filterConfig = [
  {
    name: 'text',
    formType: 'input',
    placeholder: 'Filter...',
  },
];

export default { columns, filterConfig };
