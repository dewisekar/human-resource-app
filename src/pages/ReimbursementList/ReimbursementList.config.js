import utils from '../../utils';

const { statusBadgeSort } = utils;

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
    sortFunction: statusBadgeSort,
  },
  {
    name: 'Reimbursement Type',
    selector: (row) => row.reimbursementType,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export default { columns };
