const formOptions = [
  {
    label: 'Overtime Date',
    name: 'overtimeDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    label: 'Start Time',
    name: 'startTime',
    rules: { required: true },
    type: 'time',
    formType: 'input',
  },
  {
    label: 'End Time',
    name: 'endTime',
    rules: { required: true },
    type: 'time',
    formType: 'input',
  },
  {
    label: 'Supporting Document',
    name: 'supportingDocument',
    rules: { required: true },
    type: 'file',
    formType: 'input',
  },
  {
    label: 'Note',
    name: 'overtimeNote',
    rules: { required: true },
    formType: 'textarea',
    placeholder: 'Note...',
  },
];

const Modals = {
  SESSION: 'SESSION',
  ALERT: 'ALERT',
};

export default { formOptions, Modals };
