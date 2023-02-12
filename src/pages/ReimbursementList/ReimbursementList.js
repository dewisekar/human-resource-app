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

import './ReimbursementList.css';
import '../../components/Datatable/Datatable.css';

const { COLOR, URL, PATH } = constants;
const { getRequest } = utils;
const { columns, data } = config;

const ReimbursementRequest = () => {
  const [reimbursementData, setReimbursementData] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  const renderActionButton = (reimbursementId) => (
    <Button tag={Link} to={`${PATH.Reimbursement.DETAIL}${reimbursementId}`} size="small" style={{ backgroundColor: COLOR.LIGHT_PURPLE }}>
      Detail
    </Button>
  );

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.REIMBURSEMENT_URL);
      const mappedData = fetchedData.map((item) => {
        const { id, createdAt } = item;
        const newDate = new Date(createdAt);
        const action = renderActionButton(id);
        return { ...item, action, createdAt: newDate.toLocaleDateString('id-ID') };
      });
      setReimbursementData(mappedData);
      setIsLoading(false);
    };

    init();
  }, []);

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
      </div>
  );

  const renderCard = () => (
      <Card className="mb-8 shadow-md">
        <CardBody>
          <DataTable
            columns={columns}
            data={reimbursementData}
            pagination
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
