const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const activeOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Resign', label: 'Resign' },
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
    name: 'birthDate',
    label: 'Birth Date',
    rules: { required: true },
    formType: 'input',
    type: 'date',
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
    label: 'Base Salary Without Meal',
    name: 'baseSalary',
    placeholder: 'Base Salary Without Meal...',
    rules: { required: true },
    formType: 'currency',
  },
  {
    label: 'Position Allowance',
    name: 'positionAllowance',
    placeholder: 'Position Allowance...',
    rules: {},
    formType: 'currency',
  },
  {
    label: 'Transport Allowance',
    name: 'transportAllowance',
    placeholder: 'Transport Allowance...',
    rules: {},
    formType: 'currency',
  },
  {
    label: 'Family Allowance',
    name: 'familyAllowance',
    placeholder: 'Family Allowance...',
    rules: {},
    formType: 'currency',
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
    rules: {},
  },
  {
    label: 'Contract Start Date',
    name: 'contractStartDate',
    rules: {},
    type: 'date',
    formType: 'input',
  },
  {
    label: 'Contract Start Date Una',
    name: 'contractStartDateUna',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    label: 'Contract End Date',
    name: 'contractEndDateUna',
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
  {
    name: 'status',
    label: 'Status',
    formType: 'select',
    rules: { required: true },
  },
  {
    name: 'resignationReason',
    label: 'Resignation Reason (Fill When Resign Only)',
    formType: 'input',
    rules: {},
  },
];

export default {
  dateOptions, formFields, activeOptions,
};
