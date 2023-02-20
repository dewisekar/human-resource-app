import React from 'react';
import { Controller } from 'react-hook-form';
import { Label, HelperText } from '@windmill/react-ui';
import Select from 'react-select';

import ErrorMessage from '../../../constants/error-message';

const SelectInput = (props) => {
  const {
    name, errors, label, register, rules, control, options, ...otherProps
  } = props;

  const { required } = rules;

  return (
    <Label className="mt-4">
        <span>{label}{required && <HelperText valid={false} className="ml-1">*</HelperText>}</span>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value, ref } }) => (
            <Select
                inputRef={ref}
                classNamePrefix="addl-class"
                options={options}
                value={value}
                onChange={onChange}
                {...otherProps}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: '#e2e8f0',
                    boxShadow: 'none',
                    '&:hover': { border: '2px solid rgba(231,226,254, 0.8)' },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
                    color: 'black',
                  }),
                }}
            />
          )}
        />
        {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]
        || errors[name].message}</HelperText>}
    </Label>
  );
};

export default SelectInput;
