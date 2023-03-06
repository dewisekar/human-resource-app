import React, { useState } from 'react';
import {
  Card, CardBody, HelperText,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import MultiplePropertyFilter from '../../components/Datatable/MultiplePropertyFilter/MultiplePropertyFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './AdminApprovalOverView.config';

const { COLOR, URL } = constants;
const { getRequest } = utils;
const { overtimeColumns, reimbursementColumns } = config;

const AdminApprovalOverView = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterComplete, setIsFilterComplete] = useState(false);
  const filterTitle = 'Filter by Type / Month / Year';
  const overtimeKey = 'overtime';
  const reimbursementKey = 'reimbursement';

  const typeOption = [
    { value: overtimeKey, label: 'Overtime' },
    { value: reimbursementKey, label: 'Reimbursement' },
  ];

  const filterConfig = [
    {
      name: 'type',
      formType: 'select',
      placeholder: 'Type...',
      options: typeOption,
    },
  ];

  const getData = async (type, month, year) => {
    setIsLoading(true);
    try {
      const TableColumns = {
        overtime: overtimeColumns,
        reimbursement: reimbursementColumns,
      };
      const url = type === overtimeKey ? URL.Overtime.SUMMARY : URL.Reimbursement.SUMMARY;
      const finalUrl = `${url}?month=${month}&year=${year}`;

      const data = await getRequest(finalUrl);

      setSummaryData(data);
      setColumns(TableColumns[type]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onSearch = (data) => {
    const { type = '', date = '' } = data;
    const [month = '', year = ''] = date.split('/');

    if (type === '' || month === '' || year === '') {
      setIsFilterComplete(false);
      return;
    }

    setIsFilterComplete(true);
    getData(type, month, year);
  };

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '300px' }}>
        <MultiplePropertyFilter buttonColor={COLOR.GREEN}
          onSubmit={onSearch} title={filterTitle} fields={filterConfig}/>
        {!isFilterComplete && <HelperText className="mt-0" style={{ color: COLOR.RED }}>Please fill all filter!</HelperText>}
        {isLoading ? renderSpinner()
          : <DataTable
            columns={columns}
            data={summaryData}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            dense
            className='mt-5'
          />}
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Monthly Reimbursement/Overtime Summary</SectionTitle>
      </div>
      {renderCard()}
    </>
  );
};

export default AdminApprovalOverView;
