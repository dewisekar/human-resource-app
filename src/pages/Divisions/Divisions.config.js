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
  label: 'Division Name',
  formType: 'input',
  rules: { required: true },
  // rules: {},
};

export default { columns, inputField };
