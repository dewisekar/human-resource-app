import React from 'react';
import { Input, Label, HelperText } from '@windmill/react-ui';

import ErrorMessage from '../../../constants/error-message';

const TextInput = (props) => {
  const {
    name, errors, label, subtitle, register, rules, disabled = false, value, ...otherProps
  } = props;
  const { type } = props;
  const isCheckbox = type === 'checkbox';
  const { required } = rules;

  const renderLabel = () => (
    <> <span className="mb-1">{label}{required
    && <HelperText valid={false} className="ml-1">*</HelperText>}</span><br></br></>
  );

  const renderDisabledInput = () => (
    <Label className="mt-4">
      {!isCheckbox && renderLabel()}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input value={value} disabled {...otherProps}
          checked={isCheckbox && value}/>{isCheckbox && label}
      </div>
    </Label>
  );

  const renderInputables = () => (
    <Label className="mt-4">
      {!isCheckbox && renderLabel()}
      {subtitle && <><HelperText className="text-gray-500 mb-1">{subtitle}</HelperText></>}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input name={name} {...otherProps} {...register(name, rules)}
          checked={isCheckbox && value}/> {isCheckbox && label}
      </div>
      {errors[name] && <HelperText valid={false}>{ErrorMessage[errors[name].type]
      || errors[name].message}</HelperText>}
    </Label>
  );

  return (
    <>{disabled ? renderDisabledInput() : renderInputables()}</>
  );
};

export default TextInput;
