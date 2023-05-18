import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Button,
} from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

import SectionTitle from '../../components/Typography/SectionTitle';
import DateRangeFilter from '../../components/Datatable/DateRangeFilter/DateRangeFilter';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeSummaryAdmin.config';
import * as Icons from '../../icons';

const { SearchIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatus,
} = constants;
const { getRequest, convertDataToSelectOptions, getRupiahString } = utils;
const { columns } = config;
const { customTableSort } = PageUtil;

const OvertimeSummaryAdmin = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({});
  const [filterText, setFilterText] = useState({});
  const [dateRangeError, setDateRangeError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const filterStyle = { display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' };

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Overtime.OVERTIME_ADMIN_URL);
      const fetchedEmployee = await getRequest(URL.User.USER_ALL_URL);
      const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
      const approvedRequest = fetchedData.filter((item) => item.status === RequestStatus.APPROVED);
      const mappedData = approvedRequest.map((item) => {
        const {
          id, requesterName, hours, overtimeDate, approvalDate, department, overtimeMoney,
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
          realOvertimeDate: new Date(overtimeDate),
          realApprovedDate: new Date(approvalDate),
          overtimeMoney: getRupiahString(overtimeMoney),
          realOvertimeMoney: overtimeMoney,
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

  const onSearch = () => {
    const { startDate: startDateFilter, endDate: endDateFilter } = dateRange;
    const dateStart = new Date(startDateFilter);
    const dateEnd = new Date(endDateFilter);

    if ((startDateFilter === null && endDateFilter !== null) || (endDateFilter === null
       && startDateFilter !== null)) {
      setDateRangeError('Please fill start and end dates');
      return;
    }
    if (dateStart > dateEnd) {
      setDateRangeError('Start date has to be the same or earlier than end date!');
      return;
    }
    setDateRangeError('');
    setFilterText({ ...filterText, ...dateRange });
  };

  const onFilterChange = (event) => {
    const {
      name, value = '', checked, type,
    } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFilterText({ ...filterText, [name]: newValue.toLowerCase() });
  };

  const filteredItems = overtimeData.filter(
    (item) => {
      const { realOvertimeDate } = item;
      const {
        startDate = null, endDate = null,
      } = filterText;
      const isDateRange = startDate !== null && endDate !== null;
      const dateFilter = isDateRange ? new Date(startDate) <= realOvertimeDate
      && new Date(endDate) >= realOvertimeDate : realOvertimeDate;

      return (
        dateFilter
        && item.realRequesterName.toLowerCase().includes(filterText.employee || '')
      && item.department.toLowerCase().includes(filterText.department || ''));
    },
  );

  const totalApprovedHours = filteredItems
    .reduce((sum, { realHours }) => sum + realHours, 0);

  const totalApprovedMoney = filteredItems
    .reduce((sum, { realOvertimeMoney }) => sum + realOvertimeMoney, 0);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '300px' }}>
        <div className="grid grid-cols-12 gap-2 mb-5" style={{ width: '100% ' }}>
          <div className="col-span-2" style={filterStyle}>
            <Select options={filterOptions.employee}
              name="employee"
              onChange={(value, action) => { onFilterChange({ target: { ...value, ...action } }); }}
              placeholder="Employee..."
              isClearable/>
          </div>
          <div className="col-span-2" style={filterStyle}>
            <Select options={filterOptions.department}
              name="department"
              onChange={(value, action) => { onFilterChange({ target: { ...value, ...action } }); }}
              placeholder="Department..."
              isClearable/>
          </div>
          <div className="col-span-6" style={filterStyle}>
            <DateRangeFilter
              onFilter={setDateRange}
              dateValue={dateRange}
              buttonColor={COLOR.BLUE}
              size="100%"
              errorMessage={dateRangeError}
            />
          </div>
          <div className="col-span-1" style={filterStyle}>
            <Button onClick={onSearch} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
              <SearchIcon className='w-4 h-4 mr-1'/> Search
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5 mt-5">
          <div className='col-span-12'>
            <b>Summary:</b>
            <div className="grid grid-cols-12 gap-1">
              <div className='col-span-12 md:col-span-3'>
                <p className="text-md font-semibold text-gray-500">Total Overtime: {filteredItems.length}</p>
              </div>
              <div className='col-span-12 md:col-span-3'>
                <p className="text-md font-semibold text-gray-500">Total Approved Hours: {totalApprovedHours}</p>
              </div>
              <div className='col-span-12 md:col-span-4'>
                <p className="text-md font-semibold text-gray-500">Total Overtime Money: {getRupiahString(totalApprovedMoney)}</p>
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
          sortFunction={customTableSort}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
