const columns = [
  {
    name: 'Bulan Tahun',
    selector: (row) => row.monthDate,
    sortable: true,
    width: '150px',
  },
  {
    name: 'Created At',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '200px',
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    width: '370px',
  },
];

export default { columns };
