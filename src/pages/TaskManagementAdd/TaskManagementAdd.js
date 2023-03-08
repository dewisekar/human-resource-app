import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { useHistory, Link } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import SelectInput from '../../components/Input/SelectInput/SelectInput';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import constants from '../../constants';
import config from './TaskManagementAdd.config';
import handlers from './TaskManagementAdd.handlers';

const { COLOR, PATH } = constants;
const { submitRequest } = handlers;

const TaskManagementAdd = () => {
  const {
    register, handleSubmit, formState: { errors }, control, reset,
  } = useForm();
  const { formOptions, Modals } = config;
  const history = useHistory();

  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModalType, setAlertModalType] = useState(null);

  useEffect(() => {

  }, []);

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const submitHandler = { openModalHandler, setAlertMessage, setAlertModalType };
    const { type, priority } = data;
    const payload = { ...data, type: type.value, priority: priority.value };

    setIsSubmitting(true);
    await submitRequest(payload, submitHandler);
    setIsSubmitting(false);

    reset();
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderSelectInput = (options) => <SelectInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, ...otherOptions } = options;
    const props = {
      register, errors, control, ...otherOptions,
    };

    const Forms = {
      input: renderTextInput(props),
      textarea: renderTextAreaInput(props),
      select: renderSelectInput(props),
    };

    return Forms[formType];
  };

  const renderForm = () => (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        {formOptions.map((option) => renderFormField(option))}
        {!isSubmitting
          ? <div className='mt-5 flex justify-end'>
            <Button
              tag={Link} to={PATH.TaskManagement.STAFF}
              layout="outline" className="mr-1">
            Back
            </Button>
            <Button style={{ backgroundColor: COLOR.SALMON }}
              type="submit">Save Task</Button>
          </div>
          : <div className='grid' style={{ justifyContent: 'center' }}>
            <MoonLoader color={COLOR.SALMON} size={30} />
          </div>}
      </form>
    </>
  );

  return (
    <>
      <Card className="mb-8 shadow-md mt-10">
        <CardBody style={{ overflowX: 'auto' }}>
          <SectionTitle>Add Task</SectionTitle>
          {renderForm()}
        </CardBody>
      </Card>
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
      {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage}
        onClose={() => closeModalHandler(Modals.ALERT)} type={alertModalType}/>}
    </>
  );
};

export default TaskManagementAdd;
