import React from 'react';
import { Textarea, Label, HelperText } from '@windmill/react-ui';

import ErrorMessage from '../../constants/error-message';

const TextAreaInput = (props) => {
  const {
    name, errors, label, register, rules, ...otherProps
  } = props;

  return (
    <Label className="mt-4">
        <span>{label}</span>
        <Textarea className="mt-1" rows="3" {...otherProps} name
        {...register(name, rules)} />
        {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]}</HelperText>}
    </Label>
  );
};

export default TextAreaInput;
