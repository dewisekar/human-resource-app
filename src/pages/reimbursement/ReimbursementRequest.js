import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../components/Typography/PageTitle';
import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/TextInput/TextInput';
import TextAreaInput from '../../components/TextAreaInput/TextAreaInput';
import RupiahCurrencyInput from '../../components/RupiahCurrencyInput/RupiahCurrencyInput';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import utils from '../../utils';
import constants from '../../constants';
import config from './ReimbursementRequest.config';
import handlers from './ReimbursementRequest.handlers';

const { getRequest } = utils;
const { COLOR } = constants;
const { submitRequest } = handlers;

const ReimbursementRequest = () => {
  const {
    register, handleSubmit, formState: { errors }, control, setError,
  } = useForm();
  const { formOptions, Modals } = config;
  const MAX_FILE_SIZE = 5000000;
  const history = useHistory();

  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {

  }, []);

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const chosenFile = data.proof[0];
    const { size: fileSize } = chosenFile;
    const submitHandler = { openModalHandler, setAlertMessage };

    if (fileSize > MAX_FILE_SIZE) { setError('proof', { message: 'File size can not be larger than 5MB!' }); return; }

    const payload = { ...data, proof: chosenFile };
    await submitRequest(payload, submitHandler);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderRupiahInput = (options) => <RupiahCurrencyInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, ...otherOptions } = options;
    const props = {
      register, errors, control, ...otherOptions,
    };

    const Forms = {
      input: renderTextInput(props),
      textarea: renderTextAreaInput(props),
      currency: renderRupiahInput(props),
    };

    return Forms[formType];
  };

  const renderForm = () => (
    <>
        <form onSubmit={handleSubmit(onSubmit)} >
          {formOptions.map((option) => renderFormField(option))}
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
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
    </>
  );
};

export default ReimbursementRequest;
