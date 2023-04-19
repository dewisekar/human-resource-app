import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import MoonLoader from 'react-spinners/MoonLoader';
import { Link, useHistory } from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import RupiahCurrencyInput from '../../components/Input/RupiahCurrencyInput/RupiahCurrencyInput';
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
const {
  getRequest, formatIndonesianPhoneNumber, formatNumberOnly, resetFormToNull,
} = utils;
const { formFields } = config;
const { addEmployeeHandler, updateDropdownOptions } = handlers;

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
    register, handleSubmit, formState: { errors }, control, setValue,
  } = useForm();

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedLevel = await getRequest(URL.User.USER_LEVEL_ALL_URL);
        const fetchedBank = await getRequest(URL.User.BANK_URL);
        const fetchedUsers = await getRequest(URL.User.USER_ALL_URL);
        const fetchedDepartment = await getRequest(URL.Organization.DEPARTMENT_ALL_URL);
        const fetchedDivision = await getRequest(URL.Organization.DIVISION_ALL_URL);
        const convertedOptions = updateDropdownOptions({
          fetchedUsers, fetchedLevel, fetchedDepartment, fetchedDivision, fetchedBank,
        });

        setDropdownOptions(convertedOptions);
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

  const handleAddEmployee = (data) => {
    const selectFields = ['bankCode', 'gender', 'maritalStatus', 'employmentStatus', 'department', 'division'];
    const {
      roles, superior, phoneNumber, contractEndDateUna,
      contractStartDate, maximumCheckInTime, ...otherData
    } = data;
    const mappedOptions = {};
    selectFields.forEach((item) => Object.assign(mappedOptions, { [item]: data[item].value }));
    const mappedRoles = roles.map((item) => item.value);
    const convertedMaximumCheckInTime = maximumCheckInTime === '' ? null : maximumCheckInTime;

    setAlertMessage('Are you sure you want to add this employee?');
    setSubmittedData({
      ...otherData,
      roles: mappedRoles,
      phoneNumber: formatIndonesianPhoneNumber(formatNumberOnly(phoneNumber)),
      superior: superior ? superior.value : null,
      ...mappedOptions,
      contractEndDateUna: contractEndDateUna || null,
      contractStartDate: contractStartDate || null,
      maximumCheckInTime: convertedMaximumCheckInTime,
    });
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
    resetFormToNull(formFields, setValue);
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderSelectInput = (options) => <SelectInput {...options} key={options.name}/>;

  const renderRupiahInput = (options) => <RupiahCurrencyInput {...options} key={options.name}/>;

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
      currency: renderRupiahInput(props),
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
        <Button className="mr-1" style={{ backgroundColor: COLOR.GREEN }} onClick={handleSubmit(handleAddEmployee)} >
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
