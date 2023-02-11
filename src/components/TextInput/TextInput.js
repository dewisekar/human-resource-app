import React from 'react';
import { Input, Label, HelperText } from '@windmill/react-ui';

import ErrorMessage from '../../constants/error-message';

const TextInput = (props) => {
  const {
    name, errors, label, register, rules, ...otherProps
  } = props;

  return (
    <Label className="mt-4">
        <span>{label}</span>
        <Input className="mt-1" name={name} {...otherProps}
        {...register(name, rules)} />
        {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]}</HelperText>}
    </Label>
  );
};

export default TextInput;
