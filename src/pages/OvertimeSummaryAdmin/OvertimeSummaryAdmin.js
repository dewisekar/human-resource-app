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
import config from './OvertimeSummaryAdmin.config';

const {
  COLOR, URL, PATH, RequestStatus,
} = constants;
const { getRequest, convertDataToSelectOptions } = utils;
const { columns } = config;

const OvertimeSummaryAdmin = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({});
  const [filterText, setFilterText] = useState({});
  const filterTitle = 'Filter by Employee / Department / Month / Year';

  const filterConfig = [
    {
      name: 'employee',
      formType: 'select',
      placeholder: 'Employee...',
    },
    {
      name: 'department',
      formType: 'select',
      placeholder: 'Department...',
    },
  ];

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Overtime.OVERTIME_ADMIN_URL);
      const fetchedEmployee = await getRequest(URL.User.USER_ALL_URL);
      const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
      const approvedRequest = fetchedData.filter((item) => item.status === RequestStatus.APPROVED);
      const mappedData = approvedRequest.map((item) => {
        const {
          id, requesterName, hours, overtimeDate, approvalDate, department,
        } = item;
        const linkName = <a href={`${PATH.Overtime.DETAIL}?id=${id}`} style={{ textDecoration: 'underline' }}>{requesterName}</a>;
        const newOvertimeDate = new Date(overtimeDate).toLocaleDateString('id-ID');
        const newApprovedDate = new Date(approvalDate).toLocaleDateString('id-ID');
        return {
          requesterName: linkName,
          overtimeDate: newOvertimeDate,
          hours: hours.toString(),
          approvedDate: newApprovedDate,
          realRequesterName: requesterName,
          realHours: hours,
          department,
        };
      });

      setFilterOptions({
        department: convertDataToSelectOptions(fetchedDepartment, 'name', 'name'),
        employee: convertDataToSelectOptions(fetchedEmployee, 'name', 'name'),
      });

      setOvertimeData(mappedData);
      setIsLoading(false);

      setOvertimeData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const onSearch = (data) => {
    setFilterText(data);
  };

  const filteredItems = overtimeData.filter(
    (item) => (item.approvedDate.toLowerCase().includes(filterText.date || '')
    && item.realRequesterName.toLowerCase().includes(filterText.employee || '')
    && item.department.toLowerCase().includes(filterText.department || '')),
  );

  const totalApprovedHours = filteredItems
    .reduce((sum, { realHours }) => sum + realHours, 0);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const mappedFilterConfigs = filterConfig.map((item) => {
    const { formType, name } = item;
    const isSelect = formType === 'select';
    return isSelect ? { ...item, options: filterOptions[name] } : item;
  });

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '300px' }}>
        <MultiplePropertyFilter buttonColor={COLOR.BLUE}
          onSubmit={onSearch} title={filterTitle} fields={mappedFilterConfigs}/>
        <div className="grid grid-cols-12 gap-5 mt-5">
          <div className='col-span-12'>
            <b>Summary:</b>
            <div className="grid grid-cols-12 gap-1">
              <div className='col-span-12 md:col-span-3'>
                <p className="text-md font-semibold text-gray-500">Total Overtime: {filteredItems.length}</p>
              </div>
              <div className='col-span-12 md:col-span-4'>
                <p className="text-md font-semibold text-gray-500">Total Approved Hours: {totalApprovedHours}</p>
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
        <SectionTitle>Approved Overtime Summary</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default OvertimeSummaryAdmin;
