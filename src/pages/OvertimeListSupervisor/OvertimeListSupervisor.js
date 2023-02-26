import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeListSupervisor.config';
import * as Icons from '../../icons';

const { SearchIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns } = config;

const OvertimeListSupervisor = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (overtimeId) => (
    <Button tag={Link} to={`${PATH.Overtime.APPROVAL}?id=${overtimeId}`} size="small" style={{ backgroundColor: COLOR.BLUE }}>
      <SearchIcon className='w-4 h-4 mr-1'/>View
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Overtime.OVERTIME_SUPERVISOR_URL);
      const mappedData = fetchedData.map((item) => {
        const {
          id, createdAt, status, requesterName, hours, overtimeDate,
        } = item;
        const newDate = new Date(createdAt).toLocaleDateString('id-ID');
        const newOvertimeDate = new Date(overtimeDate).toLocaleDateString('id-ID');
        const action = renderActionButton(id);
        return {
          status,
          action,
          createdAt: newDate,
          requesterName,
          overtimeDate: newOvertimeDate,
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
        buttonColor={COLOR.BLUE}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.BLUE} size={30} />
      </div>
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
            defaultSortFieldId={4}
            defaultSortAsc={false}
          />
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Overtime Request</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default OvertimeListSupervisor;
