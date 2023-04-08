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
    label: 'Overtime Date',
    name: 'overtimeDate',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Start Time',
    name: 'startTime',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'End Time',
    name: 'endTime',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
  {
    label: 'Hours',
    name: 'hours',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    disabled: true,
  },
];

const requestNoteFields = [
  {
    label: 'Request Note',
    name: 'overtimeNote',
    formType: 'textarea',
    disabled: true,
    rules: {},
  },
];

const approvalFormOptions = [
  {
    label: 'Is On Public Holiday (Except Sunday)',
    name: 'isOnHoliday',
    formType: 'input',
    type: 'checkbox',
    rules: {},
  },
  {
    label: 'Approval Note',
    name: 'approvalNote',
    formType: 'textarea',
    placeholder: 'Note...',
    rules: {},
  },
];

const approvalInfoOptions = [
  {
    label: 'Is On Public Holiday (Except Sunday)',
    name: 'isOnHoliday',
    formType: 'input',
    type: 'checkbox',
    disabled: true,
    rules: {},
  },
  {
    label: 'Approval Note',
    name: 'approvalNote',
    formType: 'textarea',
    disabled: true,
    rules: {},
  },
  {
    label: 'Overtime Money',
    name: 'overtimeMoney',
    formType: 'input',
    disabled: true,
    rules: {},
  },
];

export default {
  dateOptions, disabledFormOptions, requestNoteFields, approvalFormOptions, approvalInfoOptions,
};
