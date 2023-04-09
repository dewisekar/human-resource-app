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
import utils from '../../utils';
import constants from '../../constants';
import config from './TaskManagementAssign.config';
import handlers from './TaskManagementAssign.handlers';

const { COLOR, PATH, URL } = constants;
const { submitRequest } = handlers;
const {
  getRequest, convertDataToSelectOptions, dayOnly, resetFormToNull,
  getRole,
} = utils;

const TaskManagementAssign = () => {
  const {
    register, handleSubmit, formState: { errors }, control, reset, setError,
    setValue,
  } = useForm();
  const { formOptions, Modals } = config;
  const history = useHistory();
  const userRoles = getRole();
  const isBod = userRoles.includes('BOD');

  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModalType, setAlertModalType] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const employeeUrl = isBod ? URL.User.USER_ALL_URL : URL.User.USER_SUBORDINATE_URL;
        const fetchedEmployee = await getRequest(employeeUrl);
        setDropdownOptions({ assignee: convertDataToSelectOptions(fetchedEmployee, 'id', 'name') });
      } catch (error) {
        console.log('Error:', error);
      }
    };

    init();
  }, []);

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const submitHandler = { openModalHandler, setAlertMessage, setAlertModalType };
    const {
      type, priority, assignee, ...otherData
    } = data;
    const { startDate, endDate } = data;

    if (dayOnly(endDate) < dayOnly(startDate)) {
      setError('endDate', { message: 'Start date has to be earlier than end date' });
      return;
    }

    const payload = {
      ...otherData, type: type.value, priority: priority.value, userId: assignee.value,
    };

    setIsSubmitting(true);
    await submitRequest(payload, submitHandler);
    setIsSubmitting(false);

    reset();
    resetFormToNull(formOptions, setValue);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderSelectInput = (options) => <SelectInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, ...otherOptions } = options;
    const { name } = options;
    const defaultProps = {
      register, errors, control, ...otherOptions,
    };
    const props = formType === 'select' && dropdownOptions[name] ? { ...defaultProps, options: dropdownOptions[name] } : defaultProps;

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
              tag={Link} to={PATH.TaskManagement.SUPERVISOR}
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
          <SectionTitle>Assign Task To Staff</SectionTitle>
          {renderForm()}
        </CardBody>
      </Card>
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
      {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage}
        onClose={() => closeModalHandler(Modals.ALERT)} type={alertModalType}/>}
    </>
  );
};

export default TaskManagementAssign;
