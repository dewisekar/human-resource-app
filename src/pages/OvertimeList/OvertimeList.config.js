const columns = [
  {
    name: 'Overtime Date',
    selector: (row) => row.overtimeDate,
    sortable: true,
  },
  {
    name: 'Start Time',
    selector: (row) => row.startTime,
    sortable: true,
  },
  {
    name: 'End Time',
    selector: (row) => row.endTime,
    sortable: true,
  },
  {
    name: 'Hours',
    selector: (row) => row.hours,
    sortable: true,
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export default { columns };
