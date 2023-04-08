const columns = [
  {
    name: 'Requester',
    selector: (row) => row.requesterName,
    sortable: true,
  },
  {
    name: 'Overtime Date',
    selector: (row) => row.overtimeDate,
    sortable: true,
  },
  {
    name: 'Hours',
    selector: (row) => row.hours,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Request Date',
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export default { columns };
