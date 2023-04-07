import React, { useState } from 'react';
import {
  Card, CardBody, HelperText,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import MultiplePropertyFilter from '../../components/Datatable/MultiplePropertyFilter/MultiplePropertyFilter';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './AdminApprovalOverView.config';

const { COLOR, URL } = constants;
const { getRequest } = utils;
const { overtimeColumns, reimbursementColumns, reimbursementByTypeColumns } = config;
const { isEmptyString } = PageUtil;

const AdminApprovalOverView = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [reimbursementByTypeData, setReimbursementByTypeData] = useState([]);
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
      const isOvertime = type === overtimeKey;
      const TableColumns = {
        overtime: overtimeColumns,
        reimbursement: reimbursementColumns,
      };
      const url = isOvertime ? URL.Overtime.SUMMARY : URL.Reimbursement.SUMMARY;
      const finalUrl = `${url}?month=${month}&year=${year}`;
      const reimbursementByTypeUrl = `${URL.Reimbursement.TYPE_SUMMARY}?month=${month}&year=${year}`;

      const data = await getRequest(finalUrl);
      const byTypeData = isOvertime ? [] : await getRequest(reimbursementByTypeUrl);

      setSummaryData(data);
      setReimbursementByTypeData(byTypeData);
      setColumns(TableColumns[type]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onSearch = (data) => {
    const { type = '', month, year } = data;

    const finalMonth = month === '' ? null : month;
    const finalYear = year === '' ? null : year;

    if (type === '') {
      setIsFilterComplete(false);
      return;
    }

    setIsFilterComplete(true);
    getData(type, finalMonth, finalYear);
  };

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const renderByDepartmentTable = () => (
    <>
      <p className="text-lg font-semibold text-gray-600 mt-5" style={{ fontSize: '16px' }}>By Department</p>
      <DataTable
        columns={columns}
        data={summaryData}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        dense
        className='mt-2'
      />
    </>
  );

  const renderByTypeTable = () => (
    <>
      <p className="text-lg font-semibold text-gray-600 mt-5" style={{ fontSize: '16px' }}>By Reimbursement Type</p>
      <DataTable
        columns={reimbursementByTypeColumns}
        data={reimbursementByTypeData}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        dense
        className='mt-2'
      />
    </>
  );

  const renderTable = () => (
    <>
      {renderByDepartmentTable()}
      {reimbursementByTypeData.length > 0 && renderByTypeTable()}
    </>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '300px' }}>
        <MultiplePropertyFilter buttonColor={COLOR.GREEN}
          onSubmit={onSearch} title={filterTitle} fields={filterConfig}/>
        {!isFilterComplete && <HelperText className="mt-0" style={{ color: COLOR.RED }}>Please fill type!</HelperText>}
        {isLoading ? renderSpinner() : renderTable()}
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement / Overtime Summary</SectionTitle>
      </div>
      {renderCard()}
    </>
  );
};

export default AdminApprovalOverView;
