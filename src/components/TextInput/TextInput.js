import React from 'react';
import { Input, Label, HelperText } from '@windmill/react-ui';

import ErrorMessage from '../../constants/error-message';

const TextInput = (props) => {
  const {
    name, errors, label, register, rules, disabled, value = '', ...otherProps
  } = props;

  const renderDisabledInput = () => (
    <Label className="mt-4">
      <span>{label}</span>
      <Input className="mt-1" value={value} disabled {...otherProps}/>
    </Label>
  );

  const renderInputables = () => (
    <Label className="mt-4">
      <span>{label}</span>
      <Input className="mt-1" name={name} {...otherProps}
      {...register(name, rules)} />
      {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]
      || errors[name].message}</HelperText>}
    </Label>
  );

  return (
    <>{disabled ? renderDisabledInput() : renderInputables()}</>
  );
};

export default TextInput;
