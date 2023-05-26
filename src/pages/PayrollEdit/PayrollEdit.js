import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card, CardBody, Button,
} from '@windmill/react-ui';
import { useHistory, useLocation } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import RupiahCurrencyInput from '../../components/Input/RupiahCurrencyInput/RupiahCurrencyInput';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import VerticalTable from '../../components/VerticalTable/VerticalTable';
import AlertModal from '../../components/AlertModal/AlertModal';
import constants from '../../constants';
import config from './PayrollEdit.config';
import handlers from './PayrollEdit.handlers';
import utils from '../../utils';
import PreviewTable from './PreviewTable/PreviewTable';

const { COLOR, URL, PATH } = constants;
const { submitRequest } = handlers;
const { getRequest } = utils;
const {
  employeeDetailFields, allowanceOptions, bonusOptions,
  deductionFields, calculate, otherFields, convertData,
} = config;

const PayrollEdit = () => {
  const {
    register, handleSubmit, formState: { errors }, control, reset, setValue,
  } = useForm();
  const { Modals } = config;
  const history = useHistory();
  const location = useLocation();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');

  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertModalType, setAlertModalType] = useState(null);
  const [employeeData, setEmployeeData] = useState({});
  const [submittedData, setSubmittedData] = useState({});

  const [fixRate, setFixRate] = useState({});

  const setForm = (data) => {
    allowanceOptions.forEach(({ name: fieldName }) => setValue(fieldName, data[fieldName] || 0));
    bonusOptions.forEach(({ name: fieldName }) => setValue(fieldName, data[fieldName] || 0));
    deductionFields.forEach(({ name: fieldName }) => setValue(fieldName, data[fieldName] || 0));
    otherFields.forEach(({ name: fieldName }) => setValue(fieldName, data[fieldName]));
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [rate] = await getRequest(URL.Payroll.FIX_RATE_LATEST);
        const fetchedDetail = await getRequest(URL.Payroll.DETAIL + id);
        const convertedData = convertData(fetchedDetail);

        setEmployeeData(convertedData);
        setForm(convertedData);
        setFixRate(rate);
      } catch (error) {
        history.replace(PATH.Dashboard);
      }
    };

    init();
  }, []);

  const renderSpinner = () => (
    <div className='grid mt-3' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeAlertModal = () => {
    setIsModalShown({ ...isModalShown, [Modals.ALERT]: false });
    window.location.reload();
  };

  const onSubmit = async (data) => {
    const submitHandler = { openModalHandler, setAlertMessage, setAlertModalType };

    const { realBaseSalary } = employeeData;
    const { transportAllowance, positionAllowance, familyAllowance } = data;
    const fixAllowance = realBaseSalary + transportAllowance + positionAllowance + familyAllowance;
    const calculated = calculate({ ...data, fixAllowance }, fixRate);
    const payload = {
      baseSalary: realBaseSalary,
      ...calculated,
      ...data,
      id,
    };
    setSubmittedData(payload);

    setIsSubmitting(true);
    await submitRequest(payload, submitHandler);
    setIsSubmitting(false);

    reset();
  };

  const onPreviewCalculation = (data) => {
    const { realBaseSalary } = employeeData;
    setSubmittedData({ ...data, baseSalary: realBaseSalary });
  };

  const renderTextInput = (options) => <TextInput {...options} key={options.name}/>;

  const renderTextAreaInput = (options) => <TextAreaInput {...options} key={options.name}/>;

  const renderRupiahInput = (options) => <RupiahCurrencyInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const { formType, name, ...otherOptions } = options;
    const props = {
      register, errors, control, ...otherOptions, name,
    };

    const Forms = {
      input: renderTextInput(props),
      textarea: renderTextAreaInput(props),
      currency: renderRupiahInput(props),
    };

    return Forms[formType];
  };

  const renderEmployeeDetail = () => (
    <VerticalTable data={employeeData} fields={employeeDetailFields} padding="py-1 px-2" column={2}/>
  );

  const renderCalculationPreview = () => (
    <PreviewTable data={submittedData}/>
  );

  const renderButtons = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button className="mt-5 mr-3" style={{ backgroundColor: COLOR.GREEN, width: '68%' }}
        onClick={handleSubmit(onSubmit)}>Simpan</Button>
      <Button className="mt-5" style={{ backgroundColor: COLOR.BLUE, width: '30%' }} onClick={handleSubmit(onPreviewCalculation)}
      >Lihat Perhitungan</Button>
    </div>
  );

  const renderFormInput = () => (
    <form >
      <p className='font-semibold mb-1 text-gray-600'>Cash Allowance</p>
      {allowanceOptions.map((option) => renderFormField(option))}
      <p className='font-semibold mb-1 mt-5 text-gray-600'>Bonus</p>
      {bonusOptions.map((option) => renderFormField(option))}
      <p className='font-semibold mb-1 mt-5 text-gray-600'>Pengurangan</p>
      {deductionFields.map((option) => renderFormField(option))}
      <p className='font-semibold mb-1 mt-5 text-gray-600'>Others</p>
      {otherFields.map((option) => renderFormField(option))}
      {!isSubmitting ? renderButtons() : renderSpinner()}
    </form>
  );

  const renderForm = () => (
    <>
      {
        <div className=" grid grid-cols-12 gap-4">
          <div className='col-span-6'>
            {renderFormInput()}
          </div>
          <div className='col-span-6'>
            <p className='font-semibold mb-1 text-gray-600'>Preview Perhitungan</p>
            {renderCalculationPreview()}
          </div>
        </div>}
    </>
  );

  const renderPayrollForm = () => (<>
    {renderEmployeeDetail()}
    {renderForm()}
  </>);

  return (
    <>
      <Card className="mb-8 shadow-md mt-10" style={{ minHeight: '500px' }}>
        <CardBody>
          <SectionTitle>Edit Payroll</SectionTitle>
          { renderPayrollForm()}
        </CardBody>
      </Card>
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
      {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage}
        onClose={closeAlertModal} type={alertModalType}/>}
    </>
  );
};

export default PayrollEdit;
