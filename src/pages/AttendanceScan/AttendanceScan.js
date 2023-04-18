import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { Button, Card, CardBody } from '@windmill/react-ui';

import DateRangeFilter from '../../components/Datatable/DateRangeFilter/DateRangeFilter';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './AttendanceScan.config';
import * as Icons from '../../icons';
import handlers from './AttendanceScan.handlers';

const { SearchIcon, SyncIcon, DownloadIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, convertDataToSelectOptions, exportToExcel } = utils;
const { columns } = config;
const { customTableSort } = PageUtil;
const { convertData } = handlers;

const AttendanceScan = () => {
  const allOption = { value: 'ALL', label: 'ALL' };
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationModalShown, setIsConfirmationModalShown] = useState(false);
  const [dateRangeError, setDateRangeError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState('');
  const filterStyle = { display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' };
  const syncMessage = 'Are you sure you want to sync data from the machine with HRIS data? Maximum syncing is 40 times a day';

  useEffect(() => {
    const init = async () => {
      const fetchedEmployees = await getRequest(URL.User.USER_ALL_URL);
      const convertedEmployeeOptions = convertDataToSelectOptions(fetchedEmployees, 'fingerprintPin', 'name');

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
      setChosenEmployee('');
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

    const url = `${PATH.Attendance.SCAN}?startDate=${startDateFilter}&endDate=${endDateFilter}&pin=${pin}`;
    setIsLoading(true);
    try {
      const fetchedData = await getRequest(url);
      setAttendance(convertData(fetchedData));
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
          <Button onClick={onFilter} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '100%' }}>
            <SearchIcon className='w-4 h-4 mr-1'/> Search
          </Button>
        </div>
        <div className="col-span-1" style={filterStyle}>
          <Button onClick={() => exportToExcel(attendance, `jiera_attendance_${new Date().toISOString()}`)} size="small" className="font-semibold mb-2" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '50%' }}>
            <DownloadIcon className='w-4 h-4 mr-1'/> XLSX
          </Button>
          <Button onClick={() => exportToExcel(attendance, 'attendance')} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '50%' }}>
            <SyncIcon className='w-4 h-4 mr-1'/> Sync
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
        <small>Tombol sync merupakan fitur untuk mensinkronisasi data absen pada mesin dan
          sistem HRIS sesuai permintaan. Maksimal melakukan sync adalah 40 kali dalam sehari.
          Data yang dapat di sync adalah dimulai dari saat ini hingga sampai 60 hari yang lalu.
        </small>
      </div>
      {renderContent()}
      {isConfirmationModalShown && <ConfirmationModal message={syncMessage}/>}
      {isAlertShown
        && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default AttendanceScan;
