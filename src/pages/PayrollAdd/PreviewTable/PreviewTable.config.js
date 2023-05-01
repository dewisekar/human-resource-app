import utils from '../../../utils';

const { getRupiahString } = utils;

const fields = [
  {
    key: 'fixAllowance',
    label: 'Allowance Tetap',
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

const calculate = (fixAllowance, fixRate) => {
  const { maxSalaryJaminanKesehatan, maxSalaryJaminanPensiun, umr } = fixRate;

  let bpjskesCompany = getRupiahString(fixAllowance * 0.04);
  if (fixAllowance < umr) { bpjskesCompany = getRupiahString(0); }
  if (fixAllowance > maxSalaryJaminanKesehatan) {
    bpjskesCompany = getRupiahString(maxSalaryJaminanKesehatan * 0.04);
  }

  return {
    jhtCompany: getRupiahString(fixAllowance * 0.037),
    jkkCompany: getRupiahString(fixAllowance * 0.0024),
    jkmCompany: getRupiahString(fixAllowance * 0.003),
    jpCompany: fixAllowance > maxSalaryJaminanPensiun
      ? getRupiahString(maxSalaryJaminanPensiun * 0.02)
      : getRupiahString(fixAllowance * 0.02),
    bpjskesCompany,
  };
};

export default { fields, companyFields, calculate };
