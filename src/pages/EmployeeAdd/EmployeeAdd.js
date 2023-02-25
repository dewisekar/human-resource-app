import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import MoonLoader from 'react-spinners/MoonLoader';
import { Link, useHistory } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import SelectInput from '../../components/Input/SelectInput/SelectInput';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import constants from '../../constants';
import utils from '../../utils';
import config from './EmployeeAdd.config';
import handlers from './EmployeeAdd.handlers';
import * as Icons from '../../icons';
import AlertModal from '../../components/AlertModal/AlertModal';

const { CheckCircleIcon } = Icons;
const { COLOR, URL, PATH } = constants;
const { getRequest, convertDataToSelectOptions } = utils;
const { formFields } = config;
const { addEmployeeHandler } = handlers;

const EmployeeAdd = () => {
  const history = useHistory();
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [isAlertModalShown, setIsAlertModalShown] = useState(false);
  const [isSessionExpiredModalShown, setIsSessionExpiredModalShown] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const {
    register, handleSubmit, formState: { errors }, control,
  } = useForm();

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedLevel = await getRequest(URL.User.USER_LEVEL_ALL_URL);
        const fetchedBank = await getRequest(URL.User.BANK_URL);
        const convertedLevel = convertDataToSelectOptions(fetchedLevel, 'id', 'name');
        const convertedBank = convertDataToSelectOptions(fetchedBank, 'id', 'name');
        setDropdownOptions({ roles: convertedLevel, bank: convertedBank });
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const showConfirmModal = () => setIsConfirmModalShown(true);

  const closeConfirmModal = () => setIsConfirmModalShown(false);

  const showExpiredModal = () => setIsSessionExpiredModalShown(true);

  const showAlert = () => setIsAlertModalShown(true);

  const handleUpdate = (data) => {
    const { roles, bank, ...otherData } = data;
    const mappedRoles = roles.map((item) => item.value);
    setAlertMessage('Are you sure you want to add this employee?');
    setSubmittedData({ ...otherData, roles: mappedRoles, bankCode: bank.value });
    showConfirmModal();
  };

  const closeAlert = () => {
    setIsAlertModalShown(false);
    window.location.reload();
  };

  const submitRequest = async () => {
    closeConfirmModal();
    setIsSubmitting(true);
    const submitHandler = { showAlert, setAlertMessage, showExpiredModal };
    await addEmployeeHandler(submittedData, submitHandler);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderSelectInput = (options) => <SelectInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, ...otherOptions } = options;
    const defaultProps = {
      register, errors, control, ...otherOptions,
    };
    const { name } = otherOptions;
    const props = formType === 'select' ? { ...defaultProps, options: dropdownOptions[name] } : defaultProps;

    const Forms = {
      input: renderTextInput(props),
      textarea: renderTextAreaInput(props),
      select: renderSelectInput(props),
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
            (option) => renderFormField(option),
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
            <CheckCircleIcon className='w-4 h-4 mr-1'/> Add
          </Button>
        </div>
      </>
  );

  const renderCard = () => (
    <Card className="mb-8 shadow-md" style={{ overflowY: 'auto' }}>
      <CardBody>
        {!isSubmitting ? renderInfo() : renderSpinner()}
      </CardBody>
    </Card>
  );

  const renderPage = () => (
    <>
      <div className="mt-8">
          <SectionTitle>Add Employee</SectionTitle>
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

  return renderPage();
};

export default EmployeeAdd;