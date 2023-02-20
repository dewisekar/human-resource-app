const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const approvalInfoOptions = [
  {
    label: 'Approval Date',
    name: 'approvalDate',
    formType: 'input',
    disabled: true,
    rules: { required: true },
  },
  {
    label: 'Approved Amount',
    name: 'approvedAmount',
    formType: 'input',
    disabled: true,
    rules: { required: true },
  },
  {
    label: 'Approval Note',
    name: 'approvalNote',
    formType: 'textarea',
    disabled: true,
    rules: { required: true },
  },
];

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
    name: 'jobTitle',
    label: 'Job Title',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'fingerprintPin',
    label: 'Fingerprint Machine ID',
    formType: 'input',
    rules: { required: true },
  },
];

const activeOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export default {
  dateOptions, approvalInfoOptions, formFields, activeOptions,
};
