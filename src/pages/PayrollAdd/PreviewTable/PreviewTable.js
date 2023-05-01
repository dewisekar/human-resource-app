import React, { useState, useEffect } from 'react';

import VerticalTable from '../../../components/VerticalTable/VerticalTable';
import config from './PreviewTable.config';
import utils from '../../../utils';
import constants from '../../../constants';

const { fields, companyFields, calculate } = config;
const { getRequest, getRupiahString } = utils;
const { URL } = constants;

const PreviewTable = (props) => {
  const {
    baseSalary = 0, transportAllowance = 0, positionAllowance = 0, familyAllowance = 0,
  } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const init = async () => {
      const fixAllowance = baseSalary + transportAllowance + positionAllowance + familyAllowance;
      const [fixRate] = await getRequest(URL.Payroll.FIX_RATE_LATEST);
      const calculated = calculate(fixAllowance, fixRate);
      setData({ fixAllowance: getRupiahString(fixAllowance), ...calculated });
    };

    init();
  }, [props]);

  return (
    <>
      <VerticalTable data={data} fields={fields} padding="py-1 px-2"/>
      <p className='font-semibold mb-1 text-sm text-gray-600'>Tarif Tunjangan BPJS yang dibayar perusahaan</p>
      <VerticalTable data={data} fields={companyFields} padding="py-1 px-2"/>
    </>

  );
};

export default PreviewTable;
