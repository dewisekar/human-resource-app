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
];

const StatusEnum = {
  'Not Started': 'danger',
  'On Progress': 'warning',
  Done: 'success',
};

const customSort = (rows, field, direction) => {
  const REAL_FIELDS = {
    deadlinePost: 'realDeadlinePost',
    status: 'realStatus',
  };

  const [, fieldName] = field.toString().split('row => row.');

  const handleField = (row) => {
    if (REAL_FIELDS[fieldName]) {
      return row[REAL_FIELDS[fieldName]];
    }

    return row[fieldName];
  };

  return orderBy(rows, handleField, direction);
};

export default { columns, StatusEnum };
