const columns = [
  {
    name: 'Maksimal Gaji Jaminan Pensiun',
    selector: (row) => row.maxSalaryJaminanPensiun,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Maksimal Gaji BPJSKES',
    selector: (row) => row.maxSalaryJaminanKesehatan,
    sortable: true,
    width: '150px',
  },
  {
    name: 'UMR',
    selector: (row) => row.umr,
    sortable: true,
    width: '150px',
  },
  {
    name: 'Tanggal Dibuat',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '150px',
  },
];

const formFields = [
  {
    label: 'Maksimal Gaji Jaminan Pensiun',
    name: 'maxSalaryJaminanPensiun',
    placeholder: 'Jaminan Pensiun...',
    rules: { required: { value: true, message: 'Wajib diisi' } },
  },
  {
    label: 'Maksimal Gaji BPJSKES',
    name: 'maxSalaryJaminanKesehatan',
    placeholder: 'BPJSKES...',
    rules: { required: { value: true, message: 'Wajib diisi' } },
  },
  {
    label: 'UMR (DKI Jakarta)',
    name: 'umr',
    placeholder: 'UMR...',
    rules: { required: { value: true, message: 'Wajib diisi' } },
  },

];

export default { columns, formFields };
