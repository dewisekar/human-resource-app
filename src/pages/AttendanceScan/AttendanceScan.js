import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import {
  Button, Card, CardBody, Badge,
} from '@windmill/react-ui';

import DateRangeFilter from '../../components/Datatable/DateRangeFilter/DateRangeFilter';
import AlertModal from '../../components/AlertModal/AlertModal';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './AttendanceScan.config';
import * as Icons from '../../icons';
import handlers from './AttendanceScan.handlers';

const { SearchIcon, DownloadIcon } = Icons;
const { COLOR, URL } = constants;
const { getRequest, exportToExcel } = utils;
const { columns } = config;
const { customTableSort } = PageUtil;
const { convertData } = handlers;

const AttendanceScan = () => {
  const allOption = { value: 'ALL', label: 'ALL', status: null };
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRangeError, setDateRangeError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState('');
  const filterStyle = { display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' };

  useEffect(() => {
    const init = async () => {
      const BadgeType = {
        Active: 'success',
        Inactive: 'danger',
      };
      const fetchedEmployees = await getRequest(URL.User.USER_ALL_URL);
      const convertedEmployeeOptions = fetchedEmployees.map((item) => {
        const { fingerprintPin, name, status } = item;
        return {
          value: fingerprintPin, label: name, status, type: BadgeType[status],
        };
      });

      setEmployees([allOption, ...convertedEmployeeOptions]);
    };

    init();
  }, []);

  const onFilter = async () => {
    const { startDate: startDateFilter, endDate: endDateFilter } = dateRange;
    const dateStart = new Date(startDateFilter);
    const dateEnd = new Date(endDateFilter);
    const isAllEmployee = chosenEmployee === 'ALL';
    const pin = isAllEmployee ? '' : chosenEmployee;

    if (pin === 0) {
      setAlertMessage('Employee does not have fingerprint pin yet. Please set it in edit employee menu');
      setIsAlertShown(true);
      return;
    }

    if (startDateFilter === null || endDateFilter === null) {
      setDateRangeError('Please fill start and end dates');
      return;
    }
    if (dateStart > dateEnd) {
      setDateRangeError('Start date has to be the same or earlier than end date!');
      return;
    }
    setDateRangeError('');

    const url = `${URL.Attendance.SCAN}?startDate=${startDateFilter}&endDate=${endDateFilter}&pin=${pin}`;
    setIsLoading(true);
    try {
      const fetchedData = await getRequest(url);
      const mappedData = fetchedData.map((item) => {
        const { employee: { name: employeeName }, ...otherItem } = item;
        return { ...otherItem, name: employeeName };
      });
      setAttendance(convertData(mappedData));
      setResetPaginationToggle(!resetPaginationToggle);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderFilter = () => (
    <>
      <div className="grid grid-cols-12 gap-2 mb-5" style={{ width: '100% ' }}>
        <div className="col-span-4" style={filterStyle}>
          <Select placeholder="Employee..." options={employees}
            onChange={(event) => setChosenEmployee(event ? event.value : '')}
            getOptionValue={(event) => event.label}
            getOptionLabel={(e) => (
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{e.label}</span>
                {e.status && <Badge type={e.type}>{e.status}</Badge>}
              </div>
            )}
          />
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
          <Button onClick={onFilter} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
            <SearchIcon className='w-4 h-4 mr-1'/> Search
          </Button>
        </div>
        <div className="col-span-1" style={filterStyle}>
          <Button onClick={() => exportToExcel(attendance, `jiera_attendance_${new Date().toISOString()}`)} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
            <DownloadIcon className='w-4 h-4 mr-1'/> XLSX
          </Button>
        </div>
      </div>
    </>
  );

  const renderSpinner = () => (
    <div className='grid mt-5' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.BLUE} size={30} />
    </div>
  );

  const renderTable = () => (
    <>
      <DataTable
        columns={columns}
        data={attendance}
        pagination
        dense
        sortFunction={customTableSort}
        paginationResetDefaultPage={resetPaginationToggle}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
      />
    </>
  );

  const renderContent = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '400px' }}>
        {renderFilter()}
        {isLoading ? renderSpinner() : renderTable()}
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8 mb-5">
        <h2 className='m-0' style={{ fontWeight: '500' }}>
          {'Attendance Scan Report'}
        </h2>
        <small>Data scan absen akan tersinkronisasi dengan mesin absen setiap 30 menit kecuali
          pukul 06.00 s/d 08.59 WIB dan 14.00 s/d 15.59 WIB
        </small>
      </div>
      {renderContent()}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default AttendanceScan;
