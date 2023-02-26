import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './Divisions.config';
import * as Icons from '../../icons';

const { EditIcon, PlusCircleIcon } = Icons;
const { COLOR, URL } = constants;
const { getRequest } = utils;
const { columns } = config;

const Divisions = () => {
  const [divisionsData, setDivisionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (id) => (
    <>
      <Button className="my-1" size="small" style={{ backgroundColor: COLOR.LIGHT_BLUE }}>
        <EditIcon className='w-4 h-4 mr-1'/>Edit
      </Button>
    </>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Organization.DIVISION_ALL_URL);
      const mappedData = fetchedData.map((item) => {
        const { name, id } = item;
        const action = renderActionButton(id);
        return { name, action };
      });

      setDivisionsData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = divisionsData.filter(
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
          <Button size="small" className="mb-1" style={{ backgroundColor: COLOR.LIGHT_BLUE }}>
            <PlusCircleIcon className='w-4 h-4 mr-1'/>Add Division
          </Button>
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
            defaultSortFieldId={1}
            dense
          />
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Division List</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default Divisions;
