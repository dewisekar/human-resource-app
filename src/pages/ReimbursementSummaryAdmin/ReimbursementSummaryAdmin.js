import React, { useState, useEffect } from 'react';
import {
  Card, CardBody,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import MultiplePropertyFilter from '../../components/Datatable/MultiplePropertyFilter/MultiplePropertyFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementSummaryAdmin.config';
import RupiahCurrency from '../../components/RupiahCurrency/RupiahCurrency';

const {
  COLOR, URL, PATH, RequestStatus,
} = constants;
const { getRequest, getRupiahString, convertDataToSelectOptions } = utils;
const { columns } = config;

const ReimbursementSummaryAdmin = () => {
  const [reimbursementData, setReimbursementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const filterTitle = 'Filter by Department/Month/Year';

  const filterConfig = [
    {
      name: 'department',
      formType: 'select',
    },
  ];

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Reimbursement.REIMBURSEMENT_ADMIN_URL);
      const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
      const approvedData = fetchedData.filter((item) => item.status === RequestStatus.APPROVED);
      const mappedData = approvedData.map((item) => {
        const {
          id, createdAt, name, requesterName, approvalDate, approvedAmount,
          reimbursementType, department,
        } = item;
        const newDate = new Date(createdAt);
        const newApprovalDate = new Date(approvalDate);
        const linkName = <a href={`${PATH.Reimbursement.APPROVAL}?id=${id}`} style={{ textDecoration: 'underline' }}>{requesterName}</a>;
        return {
          name,
          createdAt: newDate.toLocaleDateString('id-ID'),
          requesterName: linkName,
          approvedDate: newApprovalDate.toLocaleDateString('id-ID'),
          approvedAmount: getRupiahString(approvedAmount),
          realApprovedAmount: approvedAmount,
          reimbursementType: reimbursementType.name,
          department,
        };
      });

      setReimbursementData(mappedData);
      setIsLoading(false);
      setFilterOptions({ department: convertDataToSelectOptions(fetchedDepartment, 'name', 'name') });
    };

    init();
  }, []);

  const onSearch = (data) => {
    setFilterText(data);
  };

  const mappedFilterConfigs = filterConfig.map((item) => {
    const { formType, name } = item;
    const isSelect = formType === 'select';
    return isSelect ? { ...item, options: filterOptions[name] } : item;
  });

  const filteredItems = reimbursementData.filter(
    (item) => (item.approvedDate.toLowerCase().includes(filterText.date || '')
    && item.department.toLowerCase().includes(filterText.department || '')),
  );

  const totalApprovedAmount = filteredItems
    .reduce((sum, { realApprovedAmount }) => sum + realApprovedAmount, 0);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '300px' }}>
        <MultiplePropertyFilter buttonColor={COLOR.LIGHT_PURPLE}
          onSubmit={onSearch} title={filterTitle} fields={mappedFilterConfigs}/>
        <div className="grid grid-cols-12 gap-5">
          <div className='col-span-12'>
            <b>Summary:</b>
            <div className="grid grid-cols-12 gap-1">
              <div className='col-span-12 md:col-span-3'>
                <p className="text-md font-semibold text-gray-500">Total Reimbursement: {filteredItems.length}</p>
              </div>
              <div className='col-span-12 md:col-span-4'>
                <p className="text-md font-semibold text-gray-500">Total Approved Amount: <RupiahCurrency balance={totalApprovedAmount}/></p>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5 mb-5'><hr style={{ width: '100% !important' }}></hr></div>
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId={3}
          defaultSortAsc={false}
          dense
          pagination
        />
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Approved Reimbursement Summary</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementSummaryAdmin;
