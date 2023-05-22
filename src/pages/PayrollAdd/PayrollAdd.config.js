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

const allowanceOptions = (days = 0) => [
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
    subtitle: `Jumlah hari absen: ${days}`,
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

const incomeTaxFields = [
  {
    label: 'Income Tax',
    name: 'incomeTax',
    placeholder: 'Income Tax...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Notes',
    name: 'notes',
    formType: 'textarea',
    rules: {},
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
  {
    key: 'convertedBasicMealAllowance',
    label: 'Meal Allowance Per Day',
  },
];

const getRangeParams = (id, chosenMonth, isOvertime = true) => {
  const month = chosenMonth.getMonth() + 1;
  const year = chosenMonth.getFullYear();
  let startDate = `${year}-${month - 1}-16`;
  if (chosenMonth === 1) {
    startDate = `${year - 1}-${12}-16`;
  }
  const endDate = `${year}-${month}-15`;

  if (isOvertime) {
    return `?employee=${id}&startDate=${startDate}&endDate=${endDate}`;
  }
  return `?pin=${id}&startDate=${startDate}&endDate=${endDate}`;
};

const calculate = (data, fixRate) => {
  const { maxSalaryJaminanKesehatan, maxSalaryJaminanPensiun, umr } = fixRate;
  const {
    fixAllowance, incomeTax, mealAllowance = 0, otherAllowance = 0,
  } = data;
  let bonuses = 0;
  // eslint-disable-next-line no-return-assign
  bonusOptions.forEach(({ name }) => bonuses += data[name]);

  let bpjskesCompany = (fixAllowance * 0.04);
  let bpjskesEmployee = (fixAllowance * 0.01);
  if (fixAllowance < umr) {
    bpjskesCompany = (0);
    bpjskesEmployee = (0);
  }
  if (fixAllowance > maxSalaryJaminanKesehatan) {
    bpjskesCompany = (maxSalaryJaminanKesehatan * 0.04);
    bpjskesEmployee = (maxSalaryJaminanKesehatan * 0.01);
  }
  const jhtEmployee = (fixAllowance * 0.02);
  const jpEmployee = fixAllowance > maxSalaryJaminanPensiun
    ? (maxSalaryJaminanPensiun * 0.01)
    : (fixAllowance * 0.01);
  const thp = (fixAllowance + bonuses + otherAllowance + mealAllowance
    - jhtEmployee - jpEmployee - bpjskesEmployee - incomeTax) || 0;

  return {
    jhtCompany: (fixAllowance * 0.037),
    jkkCompany: (fixAllowance * 0.0024),
    jkmCompany: (fixAllowance * 0.003),
    jpCompany: fixAllowance > maxSalaryJaminanPensiun
      ? (maxSalaryJaminanPensiun * 0.02)
      : (fixAllowance * 0.02),
    bpjskesCompany,
    jhtEmployee,
    jpEmployee,
    bpjskesEmployee,
    thp,
  };
};

export default {
  allowanceOptions,
  Modals,
  employeeDetailFields,
  bonusOptions,
  getRangeParams,
  incomeTaxFields,
  calculate,
};
