import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card, CardBody, Button, Badge,
} from '@windmill/react-ui';
import { useHistory } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import RupiahCurrencyInput from '../../components/Input/RupiahCurrencyInput/RupiahCurrencyInput';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import AlertModal from '../../components/AlertModal/AlertModal';
import constants from '../../constants';
import config from './PayrollAdd.config';
import handlers from './PayrollAdd.handlers';
import utils from '../../utils';

const { COLOR, URL } = constants;
const { submitRequest } = handlers;
const { getRequest } = utils;

const PayrollAddPayrollAdd = () => {
  const {
    register, handleSubmit, formState: { errors }, control, setError, reset,
  } = useForm();
  const { Modals } = config;
  const formOptions = [];
  const history = useHistory();

  const [isModalShown, setIsModalShown] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false);
  const [alertModalType, setAlertModalType] = useState(null);
  const [chosenMonth, setChosenMonth] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [chosenEmployee, setChosenEmployee] = useState('');

  useEffect(() => {
    const init = async () => {
      setIsLoadingEmployee(true);
      const month = chosenMonth.getMonth() + 1;
      const year = chosenMonth.getFullYear();
      const params = `?month=${month}&year=${year}`;

      const fetchedEmployees = await getRequest(URL.Payroll.EMPLOYEES + params);
      const mappedOptions = fetchedEmployees.map((item) => {
        const { id, name, disabled } = item;
        return { value: id, label: name, disabled };
      });

      setEmployees(mappedOptions);
      setIsLoadingEmployee(false);
    };

    init();
  }, [chosenMonth]);

  const renderSpinner = () => (
    <div className='grid' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const openModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: true });

  const closeModalHandler = (modal) => setIsModalShown({ ...isModalShown, [modal]: false });

  const onSubmit = async (data) => {
    const submitHandler = { openModalHandler, setAlertMessage, setAlertModalType };

    setIsSubmitting(true);
    await submitRequest(data, submitHandler);
    setIsSubmitting(false);

    reset();
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

  const renderMonthPicker = () => (
    <>
      <span className="mb-1 text-sm text-gray-700">Pilih Bulan/Tahun</span>
      <DatePicker
        selected={chosenMonth}
        onChange={(date) => setChosenMonth(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        className='w-100 mb-3'
      />
      <span className="mb-1 text-sm text-gray-700">Karyawan</span>
      {isLoadingEmployee ? renderSpinner() : <>
        <Select placeholder="Employee..." options={employees}
          onChange={(event) => setChosenEmployee(event ? event.value : '')}
          getOptionValue={(event) => event.label}
          getOptionLabel={(e) => (
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <span>{e.label}</span>
              {e.status && <Badge type={e.type}>{e.status}</Badge>}
            </div>
          )}
          isOptionDisabled={(option) => option.disabled}
        />
        <span className="mb-1 text-sm text-gray-500">Karyawan yang tidak bisa dipilih berarti sudah mempunyai data payroll pada bulan tersebut. Jika ingin mengubah,
        silahkan ubah lewat menu edit.</span>
      </>}
    </>
  );

  const renderForm = () => (
    <>
      {chosenEmployee !== ''
      && <form onSubmit={handleSubmit(onSubmit)} >
        {formOptions.map((option) => renderFormField(option))}
        {!isSubmitting ? <Button className="mt-5" style={{ backgroundColor: COLOR.GREEN, width: '100%' }}
          type="submit">Simpan</Button>
          : renderSpinner()}
      </form>}
    </>
  );

  return (
    <>
      <Card className="mb-8 shadow-md" style={{ minHeight: '500px' }}>
        <CardBody>
          <SectionTitle>Add New Payroll/Slip</SectionTitle>
          {renderMonthPicker()}
          {renderForm()}
        </CardBody>
      </Card>
      {isModalShown[Modals.SESSION] && <SessionExpiredModal history={history}/>}
      {isModalShown[Modals.ALERT] && <AlertModal message={alertMessage}
        onClose={() => closeModalHandler(Modals.ALERT)} type={alertModalType}/>}
    </>
  );
};

export default PayrollAddPayrollAdd;
