import orderBy from 'lodash/orderBy';

import utils from '../../utils';

const { statusBadgeSort } = utils;

const columns = [
  {
    name: 'Assignee',
    selector: (row) => row.assignee,
    sortable: true,
  },
  {
    name: 'Task',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Start Date',
    selector: (row) => row.startDate,
    sortable: true,
  },
  {
    name: 'Deadline',
    selector: (row) => row.endDate,
    sortable: true,
  },
  {
    name: 'Priority',
    selector: (row) => row.priority,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
    sortFunction: statusBadgeSort,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    sortable: false,
    width: '250px',
  },
];

const StatusEnum = {
  'Not Started': 'danger',
  'On Progress': 'warning',
  Done: 'success',
};

export default { columns, StatusEnum };
