const formOptions = [
  {
    label: 'Reimburse Name',
    name: 'reimbursementName',
    placeholder: 'Name...',
    rules: { required: true },
    type: 'text',
    formType: 'input',
  },
  {
    label: 'Reimburse Type',
    name: 'reimbursementType',
    rules: { required: true },
    formType: 'select',
  },
  {
    label: 'Invoice Date',
    name: 'invoiceDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    label: 'Requested Amount',
    name: 'requestedAmount',
    placeholder: 'Amount...',
    rules: { required: true },
    formType: 'currency',
  },
  {
    label: 'Proof',
    name: 'proof',
    rules: { required: true },
    type: 'file',
    formType: 'input',
  },
  {
    label: 'Request Note',
    name: 'requestNote',
    formType: 'textarea',
    placeholder: 'Note...',
    rules: {},
  },
];

const Modals = {
  SESSION: 'SESSION',
  ALERT: 'ALERT',
};

export default { formOptions, Modals };
