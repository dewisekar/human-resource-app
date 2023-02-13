import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import { Link, useLocation, Redirect } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import constants from '../../constants';
import utils from '../../utils';
// import config from './ReimbursementList.config';
import * as Icons from '../../icons';

// const { DocumentIcon } = Icons;

const { COLOR, URL, PATH } = constants;
const { getRequest, checkPageIdIsValid } = utils;

const ReimbursementList = () => {
  const location = useLocation();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [reimbursementData, setReimbursementData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
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
        </CardBody>
      </Card>
  );

  const renderPage = () => (
        <>
          <div className="mt-8">
            <SectionTitle>Reimbursement Detail</SectionTitle>
          </div>
          {isLoading ? renderSpinner() : renderCard()}
        </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>
  );
};

export default ReimbursementList;
