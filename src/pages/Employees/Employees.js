import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './Employees.config';
import * as Icons from '../../icons';

const { DocumentIcon, EditIcon, UserPlusIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns } = config;

const Employees = () => {
  const [overtimeData, setOvertimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (id) => (
    <>
      <Button tag={Link} to={`${PATH.Employees.DETAIL}?id=${id}`} size="small" className="mt-2 mb-1" style={{ backgroundColor: COLOR.LIGHT_BLUE }}>
        <DocumentIcon className='w-4 h-4 mr-1'/>Detail
      </Button>
      <br></br>
      <Button tag={Link} to={`${PATH.Employees.EDIT}?id=${id}`} className="mb-2" size="small" style={{ backgroundColor: COLOR.LIGHT_BLUE }}>
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
        buttonColor={COLOR.LIGHT_BLUE}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.LIGHT_BLUE} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody>
        <Button tag={Link} to={PATH.Employees.ADD} size="small" className="mb-1" style={{ backgroundColor: COLOR.LIGHT_BLUE, width: '100%' }}>
          <UserPlusIcon className='w-4 h-4 mr-1'/>Add Employee
        </Button>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortFieldId={1}
        />
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Employee List</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default Employees;
