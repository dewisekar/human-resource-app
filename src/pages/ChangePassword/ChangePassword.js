import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';
import { useHistory } from 'react-router-dom';

import TextInput from '../../components/Input/TextInput/TextInput';
import AlertModal from '../../components/AlertModal/AlertModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import PageTitle from '../../components/Typography/PageTitle';
import constants from '../../constants';
import config from './ChangePassword.config';
import handlers from './ChangePassword.handlers';

const { COLOR } = constants;
const { formOptions, Modals } = config;
const { changePasswordHandler } = handlers;

const ChangePassword = () => {
  const {
    register, handleSubmit, formState: { errors }, control, setError, reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState('WARNING');
  const history = useHistory();

  const showModal = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });
  const closeModal = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const { newPassword, confirmNewPassword, oldPassword } = data;
    const saveHandlers = { setAlertMessage, showModal, setAlertType };
    const payload = { newPassword, oldPassword };
    if (newPassword !== confirmNewPassword) {
      setError('confirmNewPassword', { message: 'New password does not match!' });
      return;
    }

    setIsSubmitting(true);
    await changePasswordHandler(payload, saveHandlers);
    reset();
    setIsSubmitting(false);
  };

  const renderTextInput = (options) => {
    const props = {
      register, errors, control, ...options,
    };
    return (<TextInput {...props} key={props.name}/>);
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit(onSubmit)} >
      {formOptions.map((option) => renderTextInput(option))}
      {!isSubmitting ? <Button className="mt-5" style={{ width: '100%' }}
      type="submit">Submit</Button>
        : <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.DARK_PURPLE} size={30} />
      </div>}
    </form>
  );

  return (
    <>
      <PageTitle>Change Password</PageTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
            {renderForm()}
            {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
            {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage} type={alertType}
              onClose={() => closeModal(Modals.ALERT)}/>}
        </CardBody>
      </Card>
    </>
  );
};

export default ChangePassword;
