import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Button, Label,
} from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import MoonLoader from 'react-spinners/MoonLoader';
import {
  Link, useLocation, Redirect, useHistory,
} from 'react-router-dom';
import Select from 'react-select';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import constants from '../../constants';
import utils from '../../utils';
import config from './EmployeeEdit.config';
import handlers from './EmployeeEdit.handlers';
import * as Icons from '../../icons';
import AlertModal from '../../components/AlertModal/AlertModal';
import { baseUrl } from '../../config';

const { CheckCircleIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatus, ErrorMessage, AlertMessage,
} = constants;
const { getRequest, checkPageIdIsValid } = utils;
const {
  formFields, activeOptions,
} = config;
const { convertData, approveRequestHandler } = handlers;

const EmployeeEdit = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [employeeData, setEmployeeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [isAlertModalShown, setIsAlertModalShown] = useState(false);
  const [isSessionExpiredModalShown, setIsSessionExpiredModalShown] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const {
    register, handleSubmit, formState: { errors }, control, setError, setValue,
  } = useForm();

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await
        getRequest(URL.User.USE_DETAIL_URL + id);
        const convertedData = convertData(fetchedDetail);
        setEmployeeData(convertedData);
        Object.keys(convertedData)
          .forEach((key) => setValue(key, convertedData[key])); // setValue([convertedData]);
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const handleUpdate = (data) => {
    console.log(data);
  };

  const showConfirmModal = () => setIsConfirmModalShown(true);

  const closeConfirmModal = () => setIsConfirmModalShown(false);

  const showExpiredModal = () => setIsSessionExpiredModalShown(true);

  const showAlert = () => setIsAlertModalShown(true);

  const closeAlert = () => {
    setIsAlertModalShown(false);
    window.location.reload();
  };

  const submitRequest = async () => {
    closeConfirmModal();
    setIsSubmitting(true);
    const submitHandler = { showAlert, setAlertMessage, showExpiredModal };
    await approveRequestHandler(id, submittedData, submitHandler);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderFormField = (options, data = null) => {
    const { formType, ...otherOptions } = options;
    const defaultProps = {
      register, errors, control, ...otherOptions,
    };

    const props = data ? { ...defaultProps, value: data } : defaultProps;

    const Forms = {
      input: renderTextInput(props),
      textarea: renderTextAreaInput(props),
    };

    return Forms[formType];
  };

  const renderSpinner = () => (
      <div className='grid' style={{ justifyContent: 'center' }}>
        <MoonLoader color={COLOR.BLUE} size={30} />
      </div>
  );

  const renderInput = () => (
      <>
        <form>
          {formFields.map(
            (option) => renderFormField(option, employeeData[option.name]),
          )}
        </form>
      </>
  );

  const renderInfo = () => (
      <>
        {renderInput()}
        <div className='mt-5 flex justify-end'>
          <Button tag={Link} to={PATH.Employees.LIST} layout="outline" className="mr-1">
            Back
          </Button>
          <Button className="mr-1" style={{ backgroundColor: COLOR.GREEN }} onClick={handleSubmit(handleUpdate)} >
            <CheckCircleIcon className='w-4 h-4 mr-1'/> Save
          </Button>
        </div>
      </>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md">
      <CardBody>
        {!isSubmitting ? renderInfo() : renderSpinner()}
      </CardBody>
    </Card>
  );

  const renderPage = () => (
    <>
      <div className="mt-8">
          <SectionTitle>Edit Employee</SectionTitle>
      </div>
      {isLoading ? renderSpinner() : renderCard()}
      {isConfirmModalShown && <ConfirmationModal message={alertMessage}
        onClose={closeConfirmModal} onConfirm={submitRequest}/>}
      {isSessionExpiredModalShown
        && <SessionExpiredModal history={history}/>}
      {isAlertModalShown
        && <AlertModal message={alertMessage} onClose={closeAlert}/>}
    </>
  );

  return (<>{ isIdValid ? renderPage() : <Redirect to={PATH.Dashboard} />}</>);
};

export default EmployeeEdit;
