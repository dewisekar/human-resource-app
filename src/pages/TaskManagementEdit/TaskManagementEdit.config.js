import constants from '../../constants';

const { TaskPriorityOptions, TaskTypeOptions } = constants;

const formOptions = [
  {
    label: 'Name',
    name: 'name',
    rules: { required: true },
    type: 'text',
    formType: 'input',
    placeholder: 'Task name...',
  },
  {
    label: 'Detail',
    name: 'detail',
    rules: { required: false },
    formType: 'textarea',
    placeholder: 'Task detail...',
  },
  {
    label: 'Start Date',
    name: 'startDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
  },
  {
    label: 'End Date',
    name: 'endDate',
    rules: { required: true },
    type: 'date',
    formType: 'input',
    subtitle: 'Fill with the same date as start date if task type is daily task',
  },
  {
    name: 'type',
    label: 'Task Type',
    rules: { required: true },
    formType: 'select',
    placeholder: 'Task type...',
    options: TaskTypeOptions,
  },
  {
    name: 'priority',
    label: 'Priority',
    rules: { required: true },
    formType: 'select',
    placeholder: 'Priority...',
    options: TaskPriorityOptions,
  },
];

const Modals = {
  SESSION: 'SESSION',
  ALERT: 'ALERT',
};

const StatusEnum = {
  'Not Started': 'danger',
  'On Progress': 'warning',
  Done: 'success',
};

export default { formOptions, Modals, StatusEnum };
