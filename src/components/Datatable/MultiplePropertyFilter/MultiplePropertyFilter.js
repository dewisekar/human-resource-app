import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button, Input,
} from '@windmill/react-ui';

import * as Icons from '../../../icons';
import constants from '../../../constants';

const { SearchIcon } = Icons;
const { MonthsSelectOptions } = constants;

const MultiplePropertyFilter = ({
  onSubmit, buttonColor, fields, title,
}) => {
  const [state, setState] = useState({});

  useEffect(() => {

  }, []);

  const onFormChange = (event) => {
    const {
      name, value = '', checked, type,
    } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setState({ ...state, [name]: newValue.toLowerCase() });
  };

  const onClick = () => {
    const { month = '', year = '' } = state;
    const dateFilter = (month === '' && year === '') ? '' : `${month}/${year.toString()}`;
    onSubmit({ date: dateFilter, ...state });
  };

  const renderSelectInput = (option) => <Select options={option.options} isClearable
    onChange={(value, action) => { onFormChange({ target: { ...value, ...action } }); }}
    name={option.name}/>;

  const renderTextInput = (option) => <Input className="border-gray-300" placeholder={option.placeholder} name={option.name} onChange={onFormChange}/>;

  const renderInput = (options) => {
    const { formType } = options;

    const RenderInput = {
      select: renderSelectInput(options),
      input: renderTextInput(options),
    };

    return (
      <div className="col-span-2">
        {RenderInput[formType]}
      </div>
    );
  };

  return (
    <>
      <div>
        <span style={{ fontSize: '14px' }}>{title}</span>
      </div>
      <div className="grid grid-cols-12 gap-2 mt-1 mb-5">
        {fields.map((item) => renderInput(item))}
        <div className="col-span-2">
          <Select options={MonthsSelectOptions}
            name="month"
            onChange={(value, action) => { onFormChange({ target: { ...value, ...action } }); }}
            isClearable/>
        </div>
        <div className="col-span-1">
          <Input className="border-gray-300" placeholder="Year" name="year" onChange={onFormChange} />
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

export default MultiplePropertyFilter;
