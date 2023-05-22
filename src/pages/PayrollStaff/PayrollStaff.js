import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import MultiplePropertyFilter from '../../components/Datatable/MultiplePropertyFilter/MultiplePropertyFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './PayrollStaff.config';
import * as Icons from '../../icons';
import { baseUrl } from '../../config';

const { DownloadIcon, PlusCircleIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, customTableSort, isEmptyString } = utils;
const { columns } = config;

const PayrollStaff = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState({});
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const onDownload = (id) => {
    window.location.href = baseUrl + URL.Payroll.DOWNLOAD + id;
  };

  const renderActionButton = (id) => (
    <>
      <Button onClick={() => onDownload(id)} size="small" style={{ backgroundColor: COLOR.GREEN }}>
        <DownloadIcon className='w-4 h-4 mr-1'/>Download Slip
      </Button>
    </>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Payroll.STAFF);
      const mappedData = fetchedData.map((item) => {
        const {
          createdAt, id, month, year,
        } = item;
        const newDate = new Date(`${year}-${month}-01`);
        const monthDate = newDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
        return {
          ...item,
          createdAt: new Date(createdAt).toLocaleDateString('id-ID'),
          realCreatedAt: createdAt,
          action: renderActionButton(id),
          monthDate,
          realMonthDate: newDate,
        };
      });

      setPayrollData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = payrollData.filter(
    (item) => {
      const { month = '', year = '' } = filterText;
      const { month: monthData, year: yearData } = item;
      const monthFilter = !isEmptyString(month) ? month.toString() === monthData.toString()
        : monthData;
      const yearFilter = !isEmptyString(year) ? year.toString() === yearData.toString() : yearData;

      return monthFilter && yearFilter;
    },
  );

  const onSearch = (data) => {
    setFilterText(data);
    setResetPaginationToggle(!resetPaginationToggle);
  };

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const renderCard = () => (
    <>
      <div className="mt-8 mb-2" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 className='m-0' style={{ fontWeight: '500' }}>
          Payroll
        </h3>
      </div>
      <Card className="shadow-md data-table">
        <CardBody>
          <MultiplePropertyFilter buttonColor={COLOR.GREEN} onSubmit={onSearch} title={'Filter Payroll Data'}/>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            sortFunction={customTableSort}
            className='mt-3'
          />
        </CardBody>
      </Card>
    </>
  );

  return (
    <>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default PayrollStaff;
