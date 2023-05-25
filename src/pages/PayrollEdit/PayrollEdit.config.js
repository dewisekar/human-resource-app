/* eslint-disable no-return-assign */
import utils from '../../utils';

const { getRupiahString } = utils;

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

const deductionFields = [
  {
    label: 'Kasbon (Cash Receipt)',
    name: 'cashReceipt',
    placeholder: 'Kasbon...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Late Charge',
    name: 'lateCharge',
    placeholder: 'Late Charge...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Basic Salary Prorate',
    name: 'baseSalaryProrate',
    placeholder: 'Basic Salary Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Position Allowance Prorate',
    name: 'positionAllowanceProrate',
    placeholder: 'Position Allowance Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Transport Allowance Prorate',
    name: 'transportAllowanceProrate',
    placeholder: 'Transport Allowance Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Family Allowance Prorate',
    name: 'familyAllowanceProrate',
    placeholder: 'Family Allowance Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Meal Allowance Prorate',
    name: 'mealAllowanceProrate',
    placeholder: 'Meal Allowance Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Other Allowance Prorate',
    name: 'otherAllowanceProrate',
    placeholder: 'Other Allowance Prorate...',
    rules: { },
    formType: 'currency',
  },
  {
    label: 'Income Tax',
    name: 'incomeTax',
    placeholder: 'Income Tax...',
    rules: { },
    formType: 'currency',
  },
];

const otherFields = [
  {
    label: 'Tax Status',
    name: 'taxStatus',
    formType: 'input',
    rules: { required: true },
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
    key: 'monthYear',
    label: 'Month Year',
  },
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
  {
    key: 'jobTitle',
    label: 'Job Title',
  },
  {
    key: 'departmentName',
    label: 'Department',
  },
  {
    key: 'baseSalary',
    label: 'Base Salary',
  },
];

const calculate = (data, fixRate) => {
  const { maxSalaryJaminanKesehatan, maxSalaryJaminanPensiun, umr } = fixRate;
  const {
    fixAllowance, mealAllowance = 0, otherAllowance = 0,
  } = data;
  let bonuses = 0;
  let deduction = 0;
  bonusOptions.forEach(({ name }) => bonuses += data[name]);
  deductionFields.forEach(({ name }) => deduction += data[name]);

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
    - jhtEmployee - jpEmployee - bpjskesEmployee - deduction) || 0;

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

const convertData = (data) => {
  const {
    month, year, employee,
  } = data;
  const {
    name, employeeId, department: { name: departmentName }, jobTitle,
    division: { name: divisionName }, bankAccountNumber, bankAccountOwnerName,
    npwp, bankAccount: { name: bankName }, baseSalary,
  } = employee;
  const date = new Date(`${year}-${month}-01`);
  const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  return {
    ...data,
    monthYear,
    departmentName,
    jobTitle,
    divisionName,
    bankAccountNumber,
    bankAccountOwnerName,
    npwp,
    bankName,
    name,
    employeeId,
    baseSalary: getRupiahString(baseSalary),
    realBaseSalary: baseSalary,
  };
};

export default {
  allowanceOptions,
  Modals,
  employeeDetailFields,
  bonusOptions,
  deductionFields,
  calculate,
  otherFields,
  convertData,
};
