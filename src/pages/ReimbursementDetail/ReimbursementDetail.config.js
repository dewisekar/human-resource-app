const requestFields = [
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'createdAt',
    label: 'Request Date',
  },
  {
    key: 'invoiceDate',
    label: 'Invoice Date',
  },
  {
    key: 'requestedAmount',
    label: 'Requested Amount',
  },
  {
    key: 'proof',
    label: 'Proof',
  },
  {
    key: 'requestNote',
    label: 'Request Note',
  },
];

const approvalFields = [
  {
    key: 'approvalDate',
    label: 'Approval Date',
  },
  {
    key: 'approvedAmount',
    label: 'Approved Amount',
  },
  {
    key: 'approverName',
    label: 'Approver Name',
  },
  {
    key: 'approvalNote',
    label: 'Approval Note',
  },
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default { requestFields, approvalFields, dateOptions };
