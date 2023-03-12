import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { useHistory, Link, useLocation } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import SelectInput from '../../components/Input/SelectInput/SelectInput';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import TableBadge from '../../components/TableBadge/TableBadge';
import AlertModal from '../../components/AlertModal/AlertModal';
import constants from '../../constants';
import config from './TaskManagementEdit.config';
import handlers from './TaskManagementEdit.handlers';
import utils from '../../utils';

const { COLOR, PATH, URL } = constants;
const { submitRequest, convertData } = handlers;
const { getRequest } = utils;
const { formOptions, Modals, StatusEnum } = config;

const TaskManagementEdit = () => {
  const {
    register, handleSubmit, formState: { errors }, control, reset, setValue,
  } = useForm();

  const history = useHistory();
  const location = useLocation();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');

  const [isModalShown, setIsModalShown] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModalType, setAlertModalType] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await getRequest(URL.TaskManagement.DETAIL + id);
        const convertedData = convertData(fetchedDetail);
        const { status: savedStatus, ...otherData } = convertedData;

        setStatus(savedStatus);
        Object.keys(otherData)
          .forEach((key) => setValue(key, convertedData[key]));
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const submitHandler = { openModalHandler, setAlertMessage, setAlertModalType };
    const { type, priority } = data;
    const payload = { ...data, type: type.value, priority: priority.value };

    setIsSubmitting(true);
    await submitRequest(id, payload, submitHandler);
    setIsSubmitting(false);
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

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.BLUE} size={30} />
    </div>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md mt-10">
      <CardBody style={{ overflowX: 'auto' }}>
        <SectionTitle>Edit Task</SectionTitle>
        <p className="text-lg mb-1 font-semibold text-gray-400" style={{ fontSize: '12px' }}>Status:</p>
        <TableBadge enumType={StatusEnum} content={status}/>
        {isLoading ? renderSpinner() : renderForm()}
      </CardBody>
    </Card>);

  return (
    <>
      {renderCard()}
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
      {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage}
        onClose={() => closeModalHandler(Modals.ALERT)} type={alertModalType}/>}
    </>
  );
};

export default TaskManagementEdit;
