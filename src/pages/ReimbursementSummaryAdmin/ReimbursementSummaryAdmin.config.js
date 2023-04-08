import utils from '../../utils';

const { amountSort } = utils;

const columns = [
  {
    name: 'Requester',
    selector: (row) => row.requesterName,
    sortable: true,
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Reimbursement Type',
    selector: (row) => row.reimbursementType,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Approved Amount',
    selector: (row) => row.amount,
    sortable: true,
    sortFunction: amountSort,
  },
  {
    name: 'Approval Date',
    selector: (row) => row.approvedDate,
    sortable: true,
  },
];

export default { columns };
