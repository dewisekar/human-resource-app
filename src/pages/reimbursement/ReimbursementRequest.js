import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NumberFormatBase } from 'react-number-format';
import { Card, CardBody, Button } from '@windmill/react-ui';

import PageTitle from '../../components/Typography/PageTitle';
import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/TextInput/TextInput';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';
import RupiahCurrencyInput from '../../components/RupiahCurrencyInput/RupiahCurrencyInput';
import utils from '../../utils';
import constants from '../../constants';
import config from './ReimbursementRequest.config';

const { getRequest } = utils;
const { URL, COLOR } = constants;

const ReimbursementRequest = () => {
  const {
    register, handleSubmit, formState: { errors }, control,
  } = useForm();
  const { formOptions } = config;

  useEffect(() => {

  }, []);

  const onSubmit = (data) => {
    console.log('ini data', data);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderRupiahInput = (options) => <RupiahCurrencyInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, ...otherOptions } = options;
    const opts = {
      register, errors, control, ...otherOptions,
    };

    const Forms = {
      input: renderTextInput(opts),
      textarea: renderTextAreaInput(opts),
      currency: renderRupiahInput(opts),
    };

    return Forms[formType];
  };

  const renderForm = () => (
    <>
        <form onSubmit={handleSubmit(onSubmit)} >
          {formOptions.map((option) => renderFormField(option))}
          <NumberFormatBase
            name="halo"
            className=""
          />
          <Button className="mt-5" style={{ backgroundColor: COLOR.LIGHT_PURPLE, width: '100%' }}
            type="submit">Submit</Button>
        </form>
    </>
  );

  return (
    <>
      <PageTitle>Reimbursement</PageTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
            <SectionTitle>Add New Request</SectionTitle>
            {renderForm()}
        </CardBody>
      </Card>
    </>
  );
};

export default ReimbursementRequest;
