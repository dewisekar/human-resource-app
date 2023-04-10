import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import TableBadge from '../../components/TableBadge/TableBadge';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeList.config';
import PageUtil from '../../utils/PageUtil';
import * as Icons from '../../icons';

const { DocumentIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatusBadgeEnum,
} = constants;
const { getRequest } = utils;
const { columns } = config;

const OvertimeList = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (overtimeId) => (
    <Button tag={Link} to={`${PATH.Overtime.DETAIL}?id=${overtimeId}`} size="small" style={{ backgroundColor: COLOR.BLUE }}>
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
          status: <TableBadge enumType={RequestStatusBadgeEnum} content={status}/>,
          createdAt: newDate.toLocaleDateString('id-ID'),
          endTime,
          startTime,
          overtimeDate: newOvertimeDate.toLocaleDateString('id-ID'),
          action,
          realStatus: status,
          hours: hours.toString(),
          realOvertimeDate: newOvertimeDate,
          realCreatedAt: newDate,
        };
      });

      setOvertimeData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = overtimeData.filter(
    (item) => {
      const {
        action, status, realCreatedAt, realOvertimeDate, ...otherItem
      } = item;
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
          defaultSortFieldId={5}
          defaultSortAsc={false}
          sortFunction={PageUtil.customTableSort}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Overtime History</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default OvertimeList;
