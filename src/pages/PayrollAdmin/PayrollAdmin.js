import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import MultiplePropertyFilter from '../../components/Datatable/MultiplePropertyFilter/MultiplePropertyFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './PayrollAdmin.config';
import * as Icons from '../../icons';
import { baseUrl } from '../../config';

const {
  DocumentIcon, EditIcon, DownloadIcon, PlusCircleIcon,
} = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, customTableSort, isEmptyString } = utils;
const { columns, filterConfig } = config;

const PayrollAdmin = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState({});
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const onDownload = (id) => {
    window.location.href = baseUrl + URL.Payroll.DOWNLOAD + id;
  };

  const renderActionButton = (id) => (
    <>
      <Button tag={Link} to={`${PATH.Payroll.DETAIL}?id=${id}`} size="small" className="mr-2" style={{ backgroundColor: COLOR.GREEN }}>
        <DocumentIcon className='w-4 h-4 mr-1'/>Detail
      </Button>
      <Button tag={Link} to={`${PATH.Employees.EDIT}?id=${id}`} size="small" className="mr-2" style={{ backgroundColor: COLOR.GREEN }}>
        <EditIcon className='w-4 h-4 mr-1'/>Edit
      </Button>
      <Button onClick={() => onDownload(id)} size="small" style={{ backgroundColor: COLOR.GREEN }}>
        <DownloadIcon className='w-4 h-4 mr-1'/>Download Slip
      </Button>
    </>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Payroll.ADMIN);
      console.log(fetchedData);
      const mappedData = fetchedData.map((item) => {
        const {
          employee: {
            name: employeeName, department,
            division,
          }, maker: { name: makerName }, createdAt, id,
        } = item;

        const departmentName = department ? department.name : '';
        const divisonName = division ? division.name : '';
        return {
          ...item,
          employee: employeeName,
          maker: makerName,
          createdAt: new Date(createdAt).toLocaleDateString('id-ID'),
          realCreatedAt: createdAt,
          action: renderActionButton(id),
          department: departmentName,
          division: divisonName,
        };
      });

      setPayrollData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = payrollData.filter(
    (item) => {
      const { month = '', year = '', text = '' } = filterText;
      const { employee, month: monthData, year: yearData } = item;
      const monthFilter = !isEmptyString(month) ? month.toString() === monthData.toString()
        : monthData;
      const yearFilter = !isEmptyString(year) ? year.toString() === yearData.toString() : yearData;
      const textFilter = employee.toLowerCase().includes(text.toLowerCase());

      return monthFilter && yearFilter && textFilter;
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
          Manage Payroll
        </h3>
        <Button tag={Link} to={PATH.Payroll.ADD} size="small" className="mb-3" style={{ backgroundColor: COLOR.GREEN }}>
          <PlusCircleIcon className='w-4 h-4 mr-1'/>Add Payroll
        </Button>
      </div>
      <Card className="shadow-md data-table">
        <CardBody>
          <MultiplePropertyFilter buttonColor={COLOR.GREEN} onSubmit={onSearch} title={'Filter Payroll Data'} fields={filterConfig}/>
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

export default PayrollAdmin;
