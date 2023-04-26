const columns = [
  {
    name: 'Maksimal Gaji JP',
    selector: (row) => row.maxSalaryJaminanPensiun,
    width: '220px',
  },
  {
    name: 'Maksimal Gaji BPJSKES',
    selector: (row) => row.maxSalaryJaminanKesehatan,
    width: '220px',
  },
  {
    name: 'UMR',
    selector: (row) => row.umr,
    width: '200px',
  },
  {
    name: 'Tanggal Dibuat',
    selector: (row) => row.createdAt,
    sortable: true,
    width: '200px',
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
