import React from 'react';
import { Controller } from 'react-hook-form';
import { Label, HelperText } from '@windmill/react-ui';
import { NumberFormatBase } from 'react-number-format';

import ErrorMessage from '../../../constants/error-message';
import constants from '../../../constants';

const { AdditionalClasses } = constants;

const RupiahCurrencyInput = (props) => {
  const {
    name, errors, label, register, rules, control, ...otherProps
  } = props;
  const { required } = rules;

  const format = (number) => {
    const isEmpty = number === '';
    return isEmpty ? '' : new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Label className="mt-4">
      <span>{label}{required && <HelperText valid={false} className="ml-1">*</HelperText>}</span>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <NumberFormatBase className={AdditionalClasses.FormInput}
            onValueChange={(v) => {
              onChange(Number(v.value));
            }}
            {...otherProps} format={format} value={value}/>
        )}
      />
      {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]
        || errors[name].message}</HelperText>}
    </Label>
  );
};

export default RupiahCurrencyInput;
