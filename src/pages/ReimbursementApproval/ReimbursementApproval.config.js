const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const disabledFormOptions = [
  {
    label: 'Requester Name',
    name: 'requesterName',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Status',
    name: 'status',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Request Date',
    name: 'createdAt',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Reimburse Name',
    name: 'name',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Invoice Date',
    name: 'invoiceDate',
    rules: { required: true },
    type: 'input',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Requested Amount',
    name: 'requestedAmount',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
];

const requestNoteFields = [
  {
    label: 'Request Note',
    name: 'requestNote',
    formType: 'textarea',
    disabled: true,
  },
];

const approvalFormOptions = [
  {
    label: 'Approved Amount',
    name: 'approvedAmount',
    placeholder: 'Amount...',
    formType: 'currency',
  },
  {
    label: 'Approval Note',
    name: 'approvalNote',
    formType: 'textarea',
    placeholder: 'Note...',
  },
];

const approvalInfoOptions = [
  {
    label: 'Approval Date',
    name: 'approvalDate',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Approved Amount',
    name: 'approvedAmount',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Approval Note',
    name: 'approvalNote',
    formType: 'textarea',
    disabled: true,
  },
];

export default {
  dateOptions, disabledFormOptions, requestNoteFields, approvalFormOptions, approvalInfoOptions,
};
