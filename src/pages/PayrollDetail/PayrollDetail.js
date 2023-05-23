import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import {
  Link, useLocation, Redirect, useHistory,
} from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import VerticalTable from '../../components/VerticalTable/VerticalTable';
import constants from '../../constants';
import utils from '../../utils';
import config from './PayrollDetail.config';
import * as Icons from '../../icons';

const { EditIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const {
  getRequest, checkPageIdIsValid, getRole,
} = utils;
const { requestFields, dateOptions, convertData } = config;

const PayrollDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userRoles = getRole();
  const isAdmin = userRoles.includes('ADMIN');

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await getRequest(URL.Payroll.DETAIL + id);
        const convertedData = convertData(fetchedDetail);
        console.log(convertedData);
        setEmployeeData(convertedData);
      } catch (error) {
        // history.replace(PATH.Dashboard);
        console.log('ii err', error);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.BLUE} size={30} />
    </div>
  );

  const renderTable = () => (
    <>
      <p className='font-semibold text-gray-600'>Employee Info</p>
      <VerticalTable data={employeeData} fields={requestFields}/>
    </>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody>
        <div>{renderTable()}</div>
        <Button tag={Link} to={PATH.Employees.LIST} layout="outline" className="mr-2">
          Back
        </Button>
        { isAdmin && <Button tag={Link} to={`${PATH.Employees.EDIT}?id=${id}`} layout="outline" className="bg-gray-200">
          <EditIcon className='w-4 h-4 mr-1'/> Edit
        </Button>}
      </CardBody>
    </Card>
  );

  const renderPage = () => (
    <>
      <div className="mt-8">
        <SectionTitle>Payroll Detail</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>);
};

export default PayrollDetail;
