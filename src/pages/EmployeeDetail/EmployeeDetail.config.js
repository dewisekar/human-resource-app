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
    key: 'address',
    label: 'Address',
  },
  {
    key: 'phoneNumber',
    label: 'Phone Number',
  },
  {
    key: 'nik',
    label: 'NIK',
  },
  {
    key: 'jobTitle',
    label: 'Job Title',
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
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default { requestFields, dateOptions };
