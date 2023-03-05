import React, { useState } from 'react';
import Select from 'react-select';
import {
  Button, Input,
} from '@windmill/react-ui';

import * as Icons from '../../../icons';

const { SearchIcon } = Icons;

const options = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const MonthYearFilter = ({
  onSubmit, buttonColor,
}) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState('');

  const onClick = () => {
    const convertedMonth = month ? month.value : '';
    const filter = (month === null && year === '') ? '' : `${convertedMonth}/${year.toString()}`;
    onSubmit(filter);
  };

  return (
    <>
      <div>
        <span style={{ fontSize: '14px' }}>Filter by Month / Year</span>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
        <div className="col-span-3">
          <Select options={options} onChange={(event) => setMonth(event)}
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

export default MonthYearFilter;
