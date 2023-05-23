import utils from '../../utils';

const { convertObjectToRupiahString } = utils;

const requestFields = [
  {
    key: 'monthYear',
    label: 'Month/Year',
  },
  {
    key: 'name',
    label: 'Employee Name',
  },
  {
    key: 'employeeId',
    label: 'Employee ID',
  },
  {
    key: 'npwp',
    label: 'NPWP',
  },
  {
    key: 'jobTitle',
    label: 'Job Title',
  },
  {
    key: 'divisionName',
    label: 'Division',
  },
  {
    key: 'departmentName',
    label: 'Department',
  },
  {
    key: 'taxStatus',
    label: 'Tax Status',
  },
  {
    key: 'bankName',
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
];

const incomeFields = [
  {
    key: 'baseSalary',
    label: 'Base Salary',
  },
  {
    label: 'Position Allowance',
    key: 'positionAllowance',
  },
  {
    label: 'Transport Allowance',
    key: 'transportAllowance',
  },
  {
    label: 'Family Allowance',
    key: 'familyAllowance',
  },
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const convertData = (data) => {
  const {
    month, year, employee, taxStatus,
  } = data;
  console.log('data', data);
  const {
    name, employeeId, department: { name: departmentName }, jobTitle,
    division: { name: divisionName }, bankAccountNumber, bankAccountOwnerName,
    npwp, bankAccount: { name: bankName },
  } = employee;
  const date = new Date(`${year}-${month}-01`);
  const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
  // const convertedCurrency = convertObjectToRupiahString(toBeConvertedToCurrency);

  return {
    monthYear,
    name,
    jobTitle,
    employeeId,
    departmentName,
    divisionName,
    taxStatus,
    bankAccountNumber,
    bankAccountOwnerName,
    npwp,
    bankName,
  };
};

export default {
  requestFields, dateOptions, incomeFields, convertData,
};
