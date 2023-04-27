import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './PayrollAdmin.config';
import * as Icons from '../../icons';

const { DocumentIcon, EditIcon, UserPlusIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns } = config;

const PayrollAdmin = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (id) => (
    <>
      <Button tag={Link} to={`${PATH.Employees.DETAIL}?id=${id}`} size="small" className="mr-2" style={{ backgroundColor: COLOR.GREEN }}>
        <DocumentIcon className='w-4 h-4 mr-1'/>Detail
      </Button>
      <Button tag={Link} to={`${PATH.Employees.EDIT}?id=${id}`} size="small" style={{ backgroundColor: COLOR.GREEN }}>
        <EditIcon className='w-4 h-4 mr-1'/>Edit
      </Button>
    </>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.User.USER_ALL_URL);
      const mappedData = fetchedData.map((item) => {
        const {
          id, name, username, jobTitle, status, department, division,
        } = item;
        const action = renderActionButton(id);
        return {
          name,
          username,
          jobTitle,
          status,
          action,
          department: department ? department.name : '-',
          division: division ? division.name : '-',
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
        buttonColor={COLOR.GREEN}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

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
        <Button tag={Link} to={PATH.Employees.ADD} size="small" className="mb-3" style={{ backgroundColor: COLOR.GREEN }}>
          <UserPlusIcon className='w-4 h-4 mr-1'/>Add Payroll
        </Button>
      </div>
      <Card className="shadow-md data-table">
        <CardBody>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
            defaultSortFieldId={1}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
