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
  },
  {
    name: 'Approved Date',
    selector: (row) => row.approvedDate,
    sortable: true,
  },
];

export default { columns };
