import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import DatatableFilter from '../../components/Datatable/DatatableFilter/DatatableFilter';
import constants from '../../constants';
import utils from '../../utils';
import config from './ReimbursementList.config';
import * as Icons from '../../icons';

import './ReimbursementList.css';

const { DocumentIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns } = config;

const ReimbursementRequest = () => {
  const [reimbursementData, setReimbursementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const renderActionButton = (reimbursementId) => (
    <Button tag={Link} to={`${PATH.Reimbursement.DETAIL}?id=${reimbursementId}`} size="small" style={{ backgroundColor: COLOR.LIGHT_PURPLE }}>
      <DocumentIcon className='w-4 h-4 mr-1'/>Detail
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.Reimbursement.REIMBURSEMENT_URL);
      const mappedData = fetchedData.map((item) => {
        const {
          id, createdAt, name, status,
        } = item;
        const newDate = new Date(createdAt);
        const action = renderActionButton(id);
        return {
          name, status, action, createdAt: newDate.toLocaleDateString('id-ID'),
        };
      });

      setReimbursementData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const filteredItems = reimbursementData.filter(
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
        buttonColor={COLOR.LIGHT_PURPLE}
        size="100%"
      />
    );
  }, [filterText, resetPaginationToggle]);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
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
          />
        </CardBody>
      </Card>
  );

  return (
    <>
      <div className="mt-8">
        <SectionTitle>Reimbursement History</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );
};

export default ReimbursementRequest;
