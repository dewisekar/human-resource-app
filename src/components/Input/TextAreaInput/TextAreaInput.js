import React from 'react';
import { Textarea, Label, HelperText } from '@windmill/react-ui';

import ErrorMessage from '../../../constants/error-message';

const TextAreaInput = (props) => {
  const {
    name, errors, label, register, rules, disabled, value, ...otherProps
  } = props;
  const { required } = rules;

  const renderDisabled = () => (
      <Label className="mt-4">
        <span>{label}{required && <HelperText valid={false} className="ml-1">*</HelperText>}</span>
        <Textarea className="mt-1" rows="3" {...otherProps} value={value} disabled/>
    </Label>
  );

  const renderInputables = () => (
    <Label className="mt-4">
      <span>{label}{required && <HelperText valid={false} className="ml-1">*</HelperText>}</span>
      <Textarea className="mt-1" rows="3" {...otherProps} name
      {...register(name, rules)} />
      {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]
      || errors[name].message}</HelperText>}
    </Label>
  );

  return (
    <>{disabled ? renderDisabled() : renderInputables()}</>
  );
};

export default TextAreaInput;
