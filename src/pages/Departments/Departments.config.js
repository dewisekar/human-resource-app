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

const inputField = {
  name: 'name',
  label: 'Department Name',
  formType: 'input',
  rules: { required: true },
};

export default { columns, inputField };
