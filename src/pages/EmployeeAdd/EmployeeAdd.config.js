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
    name: 'gender',
    label: 'Gender',
    rules: { required: true },
    formType: 'select',
  },
  {
    name: 'maritalStatus',
    label: 'Marital Status',
    rules: { required: true },
    formType: 'select',
  },
  {
    name: 'workEmail',
    label: 'Work Email',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'unaWorkEmail',
    label: 'Una Work Email',
    formType: 'input',
    rules: {},
  },
  {
    name: 'nik',
    label: 'NIK',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'bankCode',
    label: 'Bank',
    formType: 'select',
    rules: { required: true },
    isClearable: true,
  },
  {
    name: 'bankAccountNumber',
    label: 'Bank Account Number',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'bankAccountOwnerName',
    label: 'Bank Account Owner Name',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'npwp',
    label: 'NPWP',
    formType: 'input',
    rules: {},
  },
  {
    name: 'bpjsKetenagakerjaan',
    label: 'No. BPJS Ketenagakerjaan',
    formType: 'input',
    rules: {},
  },
  {
    name: 'employmentStatus',
    label: 'Employment Status',
    rules: { required: true },
    formType: 'select',
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    formType: 'input',
    rules: { required: true },
  },
  {
    name: 'division',
    label: 'Division',
    formType: 'select',
    rules: { required: true },
  },
  {
    name: 'department',
    label: 'Department',
    formType: 'select',
    rules: { required: true },
  },
  {
    name: 'maximumCheckInTime',
    label: 'Maximum Check In Time',
    formType: 'input',
    type: 'time',
    rules: {},
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
    rules: { required: false },
    type: 'date',
    formType: 'input',
  },
  {
    name: 'superior',
    label: 'Superior',
    formType: 'select',
    rules: {},
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
