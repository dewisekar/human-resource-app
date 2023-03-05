const columns = [
  {
    name: 'Requester',
    selector: (row) => row.requesterName,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Reimbursement Type',
    selector: (row) => row.reimbursementType,
    sortable: true,
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Approved Amount',
    selector: (row) => row.approvedAmount,
    sortable: true,
  },
  {
    name: 'Approval Date',
    selector: (row) => row.approvedDate,
    sortable: true,
  },
];

export default { columns };
