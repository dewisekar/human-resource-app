const bonusOptions = [
  {
    label: 'Overtime Pay',
    name: 'overtimePay',
    placeholder: 'Overtime Pay...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'No-Late Bonus',
    name: 'noLateBonus',
    placeholder: 'No-Late Bonus...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Other Bonus',
    name: 'otherBonus',
    placeholder: 'Other Bonus...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'THR',
    name: 'thr',
    placeholder: 'THR...',
    rules: { },
    formType: 'currency',
  },

];

const allowanceOptions = [
  {
    label: 'Position Allowance',
    name: 'positionAllowance',
    placeholder: 'Position Allowance...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Transport Allowance',
    name: 'transportAllowance',
    placeholder: 'Transport Allowance...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Family Allowance',
    name: 'familyAllowance',
    placeholder: 'Family Allowance...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Meal Allowance',
    name: 'mealAllowance',
    placeholder: 'Meal Allowance...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Other Allowance',
    name: 'otherAllowance',
    placeholder: 'Other Allowance...',
    rules: { },
    formType: 'currency',
  },
];

const Modals = {
  SESSION: 'SESSION',
  ALERT: 'ALERT',
};

const employeeDetailFields = [
  {
    key: 'employeeId',
    label: 'Employee ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'npwp',
    label: 'NPWP',
  },
  {
    key: 'bank',
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
    key: 'department',
    label: 'Department',
  },
  {
    key: 'baseSalary',
    label: 'Base Salary',
  },
];

const getRangeParams = (employeeId, chosenMonth) => {
  const month = chosenMonth.getMonth() + 1;
  const year = chosenMonth.getFullYear();
  const StartDate = `${year}-${month - 1}-29`;
  const endDate = `${year}-${month}-28`;
  return `?employee=${employeeId}&startDate=${StartDate}&endDate=${endDate}`;
};

export default {
  allowanceOptions, Modals, employeeDetailFields, bonusOptions, getRangeParams,
};
