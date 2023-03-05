import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button, Input,
} from '@windmill/react-ui';

import * as Icons from '../../../icons';
import utils from '../../../utils';
import constants from '../../../constants';

const { SearchIcon } = Icons;
const { URL, MonthsSelectOptions } = constants;
const { getRequest, convertDataToSelectOptions } = utils;

const EmployeeMonthYearFilter = ({
  onSubmit, buttonColor,
}) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState('');
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState(null);

  useEffect(() => {
    const init = async () => {
      const fetchedData = await getRequest(URL.User.USER_ALL_URL);
      const convertedData = convertDataToSelectOptions(fetchedData, 'id', 'name');
      setEmployees(convertedData);
    };

    init();
  }, []);

  const onClick = () => {
    const convertedMonth = month ? month.value : '';
    const convertedEmployee = chosenEmployee ? chosenEmployee.label : '';
    const dateFilter = (month === null && year === '') ? '' : `${convertedMonth}/${year.toString()}`;
    onSubmit({ date: dateFilter, employee: convertedEmployee.toLowerCase() });
  };

  return (
    <>
      <div>
        <span style={{ fontSize: '14px' }}>Filter by Employee / Month / Year</span>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
        <div className="col-span-3">
          <Select options={employees} onChange={(event) => setChosenEmployee(event)}
            isClearable/>
        </div>
        <div className="col-span-3">
          <Select options={MonthsSelectOptions} onChange={(event) => setMonth(event)}
            isClearable/>
        </div>
        <div className="col-span-3">
          <Input className="border-gray-300" placeholder="Year" value={year} onChange={(event) => setYear(event.target.value)} />
        </div>
        <div className="col-span-1">
          <Button style={{ backgroundColor: buttonColor }} onClick={onClick}>
            <SearchIcon className='w-4 h-4 mr-1'/> Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmployeeMonthYearFilter;
