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
import config from './EmployeeDetail.config';
import * as Icons from '../../icons';

const { EditIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const {
  getRequest, checkPageIdIsValid, getRole, convertObjectToRupiahString,
} = utils;
const { requestFields, dateOptions } = config;

const EmployeeDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userRoles = getRole();
  const isAdmin = userRoles.includes('ADMIN');

  const convertData = (data) => {
    const {
      level, superior, subordinate, contractStartDate, contractStartDateUna,
      contractEndDateUna, bankAccount, baseSalary, baseSalaryMealAllowance,
      positionAllowance, transportAllowance, familyAllowance, mealAllowance,
      birthDate, department, division, overtimeAllowance, basicMealAllowance,
      basicOvertimeAllowance, ...otherProps
    } = data;
    const convertedRoles = level.map((item) => <li key={item.id}>{item.name}</li>);
    const convertedSubordinate = subordinate ? subordinate.map((item) => <li key={item.id}>{item.name}</li>) : '-';
    const toBeConvertedToCurrency = {
      baseSalary,
      baseSalaryMealAllowance,
      positionAllowance,
      transportAllowance,
      familyAllowance,
      basicMealAllowance,
      basicOvertimeAllowance,
    };
    const convertedCurrency = convertObjectToRupiahString(toBeConvertedToCurrency);

    return {
      ...otherProps,
      roles: convertedRoles,
      superior: superior ? superior.name : '-',
      subordinate: convertedSubordinate,
      contractStartDateUna: new Date(contractStartDateUna).toLocaleDateString('id-ID', dateOptions),
      contractStartDate: contractStartDate ? new Date(contractStartDate).toLocaleDateString('id-ID', dateOptions) : '-',
      contractEndDateUna: contractEndDateUna ? new Date(contractEndDateUna).toLocaleDateString('id-ID', dateOptions) : '-',
      birthDate: !birthDate || new Date(birthDate).toLocaleDateString('id-ID', dateOptions),
      department: department ? department.name : '-',
      division: division ? division.name : '-',
      bankCode: bankAccount ? bankAccount.name : '-',
      ...convertedCurrency,
    };
  };

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await getRequest(URL.User.USE_DETAIL_URL + id);
        const convertedData = convertData(fetchedDetail);
        setEmployeeData(convertedData);
      } catch (error) {
        history.replace(PATH.Dashboard);
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

  const renderTable = (data, fields) => (
    <VerticalTable data={data} fields={fields}/>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody>
        <div>{renderTable(employeeData, requestFields)}</div>
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
        <SectionTitle>Employee Detail</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
    </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>);
};

export default EmployeeDetail;
