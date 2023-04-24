import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import DataTable from 'react-data-table-component';

import utils from '../../../utils';
import { WarningCircleIcon, SearchIcon } from '../../../icons';
import constants from '../../../constants';
import Spinner from '../../../components/Spinner/Spinner';
import DateRangeFilter from '../../../components/Datatable/DateRangeFilter/DateRangeFilter';
import handlers from './AttendanceOverview.handlers';

const { getRequest } = utils;
const { URL, COLOR } = constants;
const { getStartEndDate } = handlers;
const lateCheckInColumns = [
  { name: 'Name', selector: (row) => row.name, sortable: true },
  { name: 'Frequency', selector: (row) => row.frequency, sortable: true },
];

const AttendanceOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [filterErrorMessage, setFilterErrorMessage] = useState(null);
  const [lateCheckIn, setLateCheckIn] = useState([]);

  useEffect(() => {
    const init = async () => {
      const today = new Date();
      const newDateRange = getStartEndDate(today);
      setDateRange(newDateRange);
    };

    init();
  }, []);

  const onFilter = async () => {
    const { startDate: startDateFilter, endDate: endDateFilter } = dateRange;
    const params = `?startDate=${startDateFilter}&endDate=${endDateFilter}`;

    const convertedStartDate = new Date(startDateFilter);
    const convertedEndDate = new Date(endDateFilter);
    const diffTime = Math.abs(convertedEndDate - convertedStartDate);
    const daysDifferent = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (convertedStartDate.getDate() !== 26 || convertedEndDate.getDate() !== 25) {
      setFilterErrorMessage('Tanggal mulai harus tanggal 26 dan tanggal akhir harus tanggal 25');
      return;
    }

    if (daysDifferent > 31) {
      setFilterErrorMessage('Jarak waktu harus 1 bulan');
      return;
    }

    setIsLoading(true);
    setFilterErrorMessage(null);
    try {
      const lateCheckInData = await getRequest(URL.Attendance.LATE_CHECK_IN + params);
      const mappedLateData = lateCheckInData.map((item) => {
        const { frequency, employee: { name } } = item;
        return { frequency: parseInt(frequency, 10), name };
      });

      setLateCheckIn(mappedLateData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const renderDateRangeFilter = () => (
    <div className="col-span-12" style={{ maxHeight: '250px', overflowY: 'auto' }}>
      <div className='grid grid-cols-12 gap-2 mb-1'>
        <div className='col-span-8'>
          <DateRangeFilter
            onFilter={setDateRange}
            dateValue={dateRange}
            errorMessage={filterErrorMessage}
            size="100%"
          />
        </div>
        <div className='col-span-2' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button onClick={onFilter} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
            <SearchIcon className='w-4 h-4 mr-1'/> Search
          </Button>
        </div>
      </div>
    </div>
  );

  const renderLateStatistics = () => (
    <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
      <div className="col-span-12">
        <div style={{ display: 'flex', alignItems: 'center' }} className="mt-3 mb-1">
          <WarningCircleIcon className='w-5 h-5 mr-2'/>
          <p className="text-md font-semibold text-gray-600">Late Check In Records</p>
        </div>
        <div className="col-span-12" style={{ maxHeight: '250px', overflowY: 'auto' }}>
          <DataTable
            columns={lateCheckInColumns}
            data={lateCheckIn}
            dense
          />
        </div>
      </div>
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody className="pt-6 pb-6 pl-10 pr-10">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-md font-semibold text-gray">Attendance Overview</p>
        </div>
        {renderDateRangeFilter()}
        {isLoading ? <Spinner/> : renderLateStatistics()}
      </CardBody>
    </Card>
  );

  return (
    <>
      {renderCard()}
    </>
  );
};

export default AttendanceOverview;
