/* eslint-disable no-return-assign */
import utils from '../../../utils';
import globalConfig from '../PayrollEdit.config';

const { getRupiahString } = utils;
const { bonusOptions } = globalConfig;

const fields = [
  {
    key: 'fixAllowance',
    label: 'Allowance Tetap',
  },
  {
    key: 'mealAllowance',
    label: 'Meal Allowance',
  },
  {
    key: 'otherAllowance',
    label: 'Other Allowance',
  },
];

const companyFields = [
  {
    key: 'jhtCompany',
    label: 'BPJSTK JHT (3.7%)',
  },
  {
    key: 'jkkCompany',
    label: 'BPJSTK JKK (0.24%)',
  },
  {
    key: 'jkmCompany',
    label: 'BPJSTK JKM (0.2%)',
  },
  {
    key: 'jpCompany',
    label: 'BPJSTK JP (2%) (dari max Rp. 9.559.600)',
  },
  {
    key: 'bpjskesCompany',
    label: 'BPJSKES (4%) (Untuk gaji > UMR dan dari max Rp. 12.000.000)',
  },
];

const bonusPreviewOptions = [
  {
    label: 'Overtime Pay',
    key: 'overtimePay',
  },
  {
    label: 'No-Late Bonus',
    key: 'noLateBonus',
  },
  {
    label: 'Other Bonus',
    key: 'otherBonus',
  },
  {
    label: 'THR',
    key: 'thr',
  },
];

const employeeFields = [
  {
    key: 'jhtEmployee',
    label: 'BPJSTK JHT (2%)',
  },
  {
    key: 'jpEmployee',
    label: 'BPJSTK JP (1%) (dari max Rp. 9.559.600)',
  },
  {
    key: 'bpjskesEmployee',
    label: 'BPJSKES (1%) (Untuk gaji > UMR dan dari max Rp. 12.000.000)',
  },
];

const deductionOptions = [
  {
    label: 'Kasbon (Cash Receipt)',
    key: 'cashReceipt',
  },
  {
    label: 'Late Charge',
    key: 'lateCharge',
  },
  {
    label: 'Basic Salary Prorate',
    key: 'baseSalaryProrate',
  },
  {
    label: 'Position Allowance Prorate',
    key: 'positionAllowanceProrate',
  },
  {
    label: 'Transport Allowance Prorate',
    key: 'transportAllowanceProrate',
  },
  {
    label: 'Family Allowance Prorate',
    key: 'familyAllowanceProrate',
  },
  {
    label: 'Meal Allowance Prorate',
    key: 'mealAllowanceProrate',
  },
  {
    label: 'Other Allowance Prorate',
    key: 'otherAllowanceProrate',
  },
  {
    label: 'Income Tax',
    key: 'incomeTax',
  },
];

const thpFields = [
  {
    key: 'thp',
    label: 'Take Home Pay',
  },
];

const calculate = (data, fixRate) => {
  const { maxSalaryJaminanKesehatan, maxSalaryJaminanPensiun, umr } = fixRate;
  const { fixAllowance, mealAllowance = 0, otherAllowance = 0 } = data;
  let bonuses = 0;
  let deduction = 0;
  bonusOptions.forEach(({ name }) => bonuses += data[name] || 0);
  deductionOptions.forEach(({ key }) => deduction += data[key] || 0);

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
    jhtCompany: getRupiahString(fixAllowance * 0.037),
    jkkCompany: getRupiahString(fixAllowance * 0.0024),
    jkmCompany: getRupiahString(fixAllowance * 0.003),
    jpCompany: fixAllowance > maxSalaryJaminanPensiun
      ? getRupiahString(maxSalaryJaminanPensiun * 0.02)
      : getRupiahString(fixAllowance * 0.02),
    bpjskesCompany: getRupiahString(bpjskesCompany),
    jhtEmployee: getRupiahString(jhtEmployee),
    jpEmployee: getRupiahString(jpEmployee),
    bpjskesEmployee: getRupiahString(bpjskesEmployee),
    thp: getRupiahString(thp),
  };
};

export default {
  fields,
  companyFields,
  calculate,
  employeeFields,
  thpFields,
  bonusPreviewOptions,
  deductionOptions,
};
