const requestFields = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'username',
    label: 'Username',
  },
  {
    key: 'gender',
    label: 'Gender',
  },
  {
    key: 'maritalStatus',
    label: 'Marital Status',
  },
  {
    key: 'address',
    label: 'Address',
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
  },
  {
    key: 'workEmail',
    label: 'Work Email',
  },
  {
    key: 'unaWorkEmail',
    label: 'Una Work Email',
  },
  {
    key: 'nik',
    label: 'NIK',
  },
  {
    key: 'npwp',
    label: 'NPWP',
  },
  {
    key: 'bpjsKetenagakerjaan',
    label: 'No. BPJS Ketenagakerjaan',
  },
  {
    key: 'bankCode',
    label: 'Bank',
  },
  {
    key: 'bankAccountNumber',
    label: 'Bank Account Number',
  },
  {
    key: 'bankAccountOwnerName',
    label: 'Bank Account Owner Name',
  },
  {
    key: 'jobTitle',
    label: 'Job Title',
  },
  {
    key: 'division',
    label: 'Division',
  },
  {
    key: 'department',
    label: 'Department',
  },
  {
    key: 'baseSalary',
    label: 'Base Salary',
  },
  {
    key: 'maximumCheckInTime',
    label: 'Maximum Check In Time',
  },
  {
    key: 'roles',
    label: 'User Application Roles',
  },
  {
    key: 'fingerprintPin',
    label: 'Fingerprint Machine PIN',
  },
  {
    key: 'contractStartDate',
    label: 'Contract Start Date',
  },
  {
    key: 'contractEndDate',
    label: 'Contract End Date',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'superior',
    label: 'Superior',
  },
  {
    key: 'subordinate',
    label: 'Subordinate',
  },
  {
    key: 'resignationReason',
    label: 'Resignation Reason (Filled When Resign Only)',
  },
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default { requestFields, dateOptions };
