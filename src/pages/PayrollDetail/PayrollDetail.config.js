import utils from '../../utils';

const { getRupiahString } = utils;

const employeeDetailFields = [
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
    label: 'Basic Salary',
  },
  {
    label: 'Tunjangan Posisi',
    key: 'positionAllowance',
  },
  {
    label: 'Tunjangan Transport',
    key: 'transportAllowance',
  },
  {
    label: 'Tunjangan Keluarga',
    key: 'familyAllowance',
  },
  {
    label: 'Tunjangan Makan',
    key: 'mealAllowance',
  },
  {
    label: 'Tunjangan Lain',
    key: 'otherAllowance',
  },
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
  {
    key: 'jhtCompany',
    label: 'Jaminan Hari Tua (Perusahaan)',
  },
  {
    key: 'jkkCompany',
    label: 'Jaminan Kecelakaan Kerja (Perusahaan)',
  },
  {
    key: 'jkmCompany',
    label: 'Jaminan Kematian (Perusahaan)',
  },
  {
    key: 'jpCompany',
    label: 'Jaminan Pensiun (Perusahaan)',
  },
  {
    key: 'bpjskesCompany',
    label: 'Jaminan Kesehatan (Perusahaan)',
  },
  {
    key: 'totalIncome',
    label: 'Total Income',
  },
];

const deductionFields = [
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
    label: 'Tunjangan Jabatan Prorate',
    key: 'positionAllowanceProrate',
  },
  {
    label: 'Tunjangan Transport Prorate',
    key: 'transportAllowanceProrate',
  },
  {
    label: 'Tunjangan Keluarga Prorate',
    key: 'familyAllowanceProrate',
  },
  {
    label: 'Tunjangan Makan Prorate',
    key: 'mealAllowanceProrate',
  },
  {
    label: 'Tunjangan Lainnya Prorate',
    key: 'otherAllowanceProrate',
  },
  {
    key: 'jhtCompany',
    label: 'Jaminan Hari Tua (Perusahaan)',
  },
  {
    key: 'jkkCompany',
    label: 'Jaminan Kecelakaan Kerja (Perusahaan)',
  },
  {
    key: 'jkmCompany',
    label: 'Jaminan Kematian (Perusahaan)',
  },
  {
    key: 'jpCompany',
    label: 'Jaminan Pensiun (Perusahaan)',
  },
  {
    key: 'bpjskesCompany',
    label: 'Jaminan Kesehatan (Perusahaan)',
  },
  {
    key: 'jhtEmployee',
    label: 'Jaminan Hari Tua (Karyawan)',
  },
  {
    key: 'jpEmployee',
    label: 'Jaminan Pensiun (Karyawan)',
  },
  {
    key: 'bpjskesEmployee',
    label: 'Jaminan Kesehatan (Karyawan)',
  },
  {
    key: 'incomeTax',
    label: 'Income Tax',
  },
  {
    key: 'totalDeduction',
    label: 'Total Deduction',
  },
];

const thpFields = [
  {
    key: 'thp',
    label: 'THP',
  },
  {
    key: 'notes',
    label: 'Notes',
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
    month, year, employee, taxStatus, thp, notes,
  } = data;
  const {
    name, employeeId, department: { name: departmentName }, jobTitle,
    division: { name: divisionName }, bankAccountNumber, bankAccountOwnerName,
    npwp, bankAccount: { name: bankName },
  } = employee;
  const date = new Date(`${year}-${month}-01`);
  const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
  const convertedData = {};
  let totalIncome = 0;
  let totalDeduction = 0;
  incomeFields.forEach((item) => {
    const { key } = item;
    convertedData[key] = getRupiahString(data[key]);
    totalIncome += data[key] || 0;
  });
  deductionFields.forEach((item) => {
    const { key } = item;
    convertedData[key] = getRupiahString(data[key]);
    totalDeduction += data[key] || 0;
  });

  console.log(convertedData, totalIncome);

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
    ...convertedData,
    totalIncome: getRupiahString(totalIncome),
    totalDeduction: getRupiahString(totalDeduction),
    thp: getRupiahString(thp),
    notes,
  };
};

export default {
  employeeDetailFields,
  dateOptions,
  incomeFields,
  convertData,
  deductionFields,
  thpFields,
};
