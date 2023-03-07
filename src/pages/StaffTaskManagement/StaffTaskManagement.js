import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './StaffTaskManagement.config';
import * as Icons from '../../icons';

const { PlusCircleIcon, DocumentIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns } = config;

const StaffTaskManagement = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (overtimeId) => (
    <Button tag={Link} to={`${PATH.Overtime.DETAIL}?id=${overtimeId}`} size="small" style={{ backgroundColor: COLOR.SALMON }}>
      <DocumentIcon className='w-4 h-4 mr-1'/>Detail
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Overtime.OVERTIME_URL);
      const mappedData = fetchedData.map((item) => {
        const {
          id, createdAt, endTime, startTime, status, overtimeDate, hours,
        } = item;
        const newDate = new Date(createdAt);
        const newOvertimeDate = new Date(overtimeDate);
        const action = renderActionButton(id);
        return {
          status,
          createdAt: newDate.toLocaleDateString('id-ID'),
          endTime,
          startTime,
          overtimeDate: newOvertimeDate.toLocaleDateString('id-ID'),
          // action,
          hours: hours.toString(),
        };
      });

      setOvertimeData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = overtimeData.filter(
    (item) => {
      const { action, ...otherItem } = item;
      return Object.keys(otherItem).some((key) => otherItem[key]
        .toLowerCase().includes(filterText.toLowerCase()));
    },
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <DatatableFilter
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        buttonColor={COLOR.SALMON}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.SALMON} size={30} />
    </div>
  );

  const renderTodaysTasks = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody className="bg-orange-200 pb-2 pt-2">
        <p className="font-semibold text-gray-600 text-center" style={{ fontSize: '14px' }}>TODAY&apos;S TASKS </p>
      </CardBody>
      <CardBody>
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId={5}
          defaultSortAsc={false}
          expandableRows
        />
      </CardBody>
    </Card>
  );
  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortFieldId={5}
          defaultSortAsc={false}
        />
      </CardBody>
    </Card>
  );

  const renderContent = () => (
    <>
      <Button tag={Link} layout="outline" to={PATH.TaskManagement.ADD} size="small" className="mb-5 border-orange-300 hover:border-gray-200 font-semibold" style={{ width: '100%', padding: '7px' }}>
        <PlusCircleIcon className='w-4 h-4 mr-1'/>Add Task
      </Button>
      {renderTodaysTasks()}
      {renderCard()}
    </>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Task Management</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderContent()}
    </>
  );
};

export default StaffTaskManagement;
