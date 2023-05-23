import React, { useState, useEffect } from 'react';

import VerticalTable from '../../../components/VerticalTable/VerticalTable';
import config from './PreviewTable.config';
import utils from '../../../utils';
import constants from '../../../constants';

const {
  fields, companyFields, calculate, employeeFields, thpFields,
  bonusPreviewOptions,
} = config;
const { getRequest, getRupiahString } = utils;
const { URL } = constants;

const PreviewTable = (props) => {
  const { data } = props;
  const {
    baseSalary = 0, transportAllowance = 0, positionAllowance = 0,
    familyAllowance = 0, mealAllowance = 0,
    otherAllowance = 0,
  } = data;
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    const init = async () => {
      const fixAllowance = baseSalary + transportAllowance + positionAllowance + familyAllowance;
      const [fixRate] = await getRequest(URL.Payroll.FIX_RATE_LATEST);
      const calculated = calculate({ ...data, fixAllowance }, fixRate);
      setPreviewData({
        ...data,
        fixAllowance: getRupiahString(fixAllowance),
        mealAllowance: getRupiahString(mealAllowance),
        otherAllowance: getRupiahString(otherAllowance),
        ...calculated,
      });
    };

    init();
  }, [props]);

  return (
    <>
      <VerticalTable data={previewData} fields={fields} padding="py-1 px-2"/>
      <p className='font-semibold mb-1 text-sm text-gray-600'>Bonus</p>
      <VerticalTable data={previewData} fields={bonusPreviewOptions} isNumber padding="py-1 px-2"/>
      <p className='font-semibold mb-1 text-sm text-gray-600'>Tarif Tunjangan BPJS yang dibayar perusahaan</p>
      <VerticalTable data={previewData} fields={companyFields} padding="py-1 px-2"/>
      <p className='font-semibold mb-1 text-sm text-gray-600'>Tarif Potongan Premi BPJS & Kontribusi Pegawai</p>
      <VerticalTable data={previewData} fields={employeeFields} padding="py-1 px-2"/>
      <p className='font-semibold mb-1 text-sm text-gray-600'>Take Home Pay</p>
      <VerticalTable data={previewData} fields={thpFields} padding="py-1 px-2"/>
    </>

  );
};

export default PreviewTable;
