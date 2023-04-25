import React, { useState } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody } from '@windmill/react-ui';

import DateRangeFilter from '../../components/Datatable/DateRangeFilter/DateRangeFilter';
import PageUtil from '../../utils/PageUtil';
import constants from '../../constants';
import utils from '../../utils';
import config from './AttendanceMissedScan.config';
import * as Icons from '../../icons';

const { SearchIcon, DownloadIcon } = Icons;
const { COLOR, URL } = constants;
const { getRequest, exportToExcel } = utils;
const { columns } = config;
const { customTableSort } = PageUtil;

const AttendanceMissedScan = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRangeError, setDateRangeError] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filterStyle = { display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' };

  const onFilter = async () => {
    const { startDate: startDateFilter, endDate: endDateFilter } = dateRange;
    const dateStart = new Date(startDateFilter);
    const dateEnd = new Date(endDateFilter);

    if (startDateFilter === null || endDateFilter === null) {
      setDateRangeError('Please fill start and end dates');
      return;
    }
    if (dateStart > dateEnd) {
      setDateRangeError('Start date has to be the same or earlier than end date!');
      return;
    }
    setDateRangeError('');

    const url = `${URL.Attendance.MISSED_SCAN}?startDate=${startDateFilter}&endDate=${endDateFilter}`;
    setIsLoading(true);
    try {
      const fetchedData = await getRequest(url);
      setAttendance(fetchedData);
      setResetPaginationToggle(!resetPaginationToggle);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderFilter = () => (
    <>
      <div className="grid grid-cols-12 gap-2 mb-5" style={{ width: '100% ' }}>
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
          <Button onClick={() => exportToExcel(attendance, `jiera_missed_attendance_${dateRange.startDate}_${dateRange.endDate}_${new Date().toISOString()}`)} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
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
          {'Missed Scan Attendance Report'}
        </h2>
        <small>Menampilkan karyawan aktif yang tidak pernah sama sekali
            scan kehadiran di mesin absensi dalam range waktu tersebut.</small>
      </div>
      {renderContent()}
    </>
  );
};

export default AttendanceMissedScan;
