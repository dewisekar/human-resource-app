const requestFields = [
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'overtimeDate',
    label: 'Overtime Date',
  },
  {
    key: 'startTime',
    label: 'Start Time',
  },
  {
    key: 'endTime',
    label: 'End Time',
  },
  {
    key: 'hours',
    label: 'Hours',
  },
  {
    key: 'createdAt',
    label: 'Request Date',
  },
  {
    key: 'supportingDocument',
    label: 'Supporting Document',
  },
  {
    key: 'overtimeNote',
    label: 'Note',
  },
];

const approvalFields = [
  {
    key: 'approvalDate',
    label: 'Approval Date',
  },
  {
    key: 'approverName',
    label: 'Approver Name',
  },
  {
    key: 'approvalNote',
    label: 'Approval Note',
  },
  {
    key: 'overtimeMoney',
    label: 'Overtime Money',
  },
];

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default {
  requestFields, approvalFields, dateOptions,
};
