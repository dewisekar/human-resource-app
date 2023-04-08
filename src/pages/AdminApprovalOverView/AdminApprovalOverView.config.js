import utils from '../../utils';

const { amountSort } = utils;

const overtimeColumns = [
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: 'Total Hours',
    selector: (row) => row.hours,
    sortable: true,
  },
  {
    name: 'Total Request',
    selector: (row) => row.totalrequest,
    sortable: true,
  },
  {
    name: 'Total Overtime Money',
    selector: (row) => row.overtimeMoney,
    sortable: true,
  },
];

const reimbursementColumns = [
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: 'Total Amount',
    selector: (row) => row.amount,
    sortable: true,
    sortFunction: amountSort,
  },
  {
    name: 'Total Request',
    selector: (row) => row.totalrequest,
    sortable: true,
  },
];

const reimbursementByTypeColumns = [
  {
    name: 'Type',
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: 'Total Amount',
    selector: (row) => row.amount,
    sortable: true,
    sortFunction: amountSort,
  },
  {
    name: 'Total Request',
    selector: (row) => row.totalrequest,
    sortable: true,
  },
];

export default { overtimeColumns, reimbursementColumns, reimbursementByTypeColumns };
