const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const formFields = [
  {
    name: 'name',
    label: 'Name',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'username',
    label: 'Username',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'nik',
    label: 'NIK',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'address',
    label: 'Address',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'bank',
    label: 'Bank',
    formType: 'select',
    rules: { required: true },
    isClearable: true,
  },
  {
    name: 'accountNumber',
    label: 'Bank Account Number',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'fingerprintPin',
    label: 'Fingerprint Machine PIN',
    formType: 'input',
    rules: { required: true },
  },
  {
    label: 'Contract Start Date',
    name: 'contractStartDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    label: 'Contract End Date',
    name: 'contractEndDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    name: 'superior',
    label: 'Superior',
    formType: 'select',
    rules: { required: true },
    isClearable: true,
  },
  {
    name: 'roles',
    label: 'System Roles',
    rules: { required: true },
    formType: 'select',
    isMulti: true,
  },
];

export default {
  dateOptions, formFields,
};
