import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import RupiahCurrencyInput from '../../components/Input/RupiahCurrencyInput/RupiahCurrencyInput';
import PageUtil from '../../utils/PageUtil';
import AlertModal from '../../components/AlertModal/AlertModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import constants from '../../constants';
import utils from '../../utils';
import config from './PayrollFixRate.config';
import * as Icons from '../../icons';
import handlers from './PayrollFixRate.handlers';

const { EditIcon } = Icons;
const { COLOR, URL } = constants;
const { getRequest, getRupiahString } = utils;
const { columns, formFields } = config;
const { customTableSort } = PageUtil;
const { updateFixRateHandler } = handlers;

const PayrollFixRate = () => {
  const [fixRate, setFixRate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [isAlertModalShown, setIsAlertModalShown] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [submittedData, setSubmittedData] = useState({});
  const [isSessionExpiredModalShown, setIsSessionExpiredModalShown] = useState(false);
  const history = useHistory();
  const {
    register, handleSubmit, formState: { errors }, control,
  } = useForm();

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedHistory = await getRequest(URL.Payroll.FIX_RATE);
        const mappedData = fetchedHistory.map((item, index) => {
          const className = index === 0 && 'bg-yellow-100';
          const {
            createdAt, maxSalaryJaminanPensiun, maxSalaryJaminanKesehatan, umr,
          } = item;
          const convertedDate = new Date(createdAt);

          return {
            createdAt: <p className={className}>{convertedDate.toLocaleDateString('id-ID')}</p>,
            realCreatedAt: convertedDate,
            maxSalaryJaminanKesehatan: <p className={className}>{
              getRupiahString(maxSalaryJaminanKesehatan)}</p>,
            maxSalaryJaminanPensiun: <p className={className}>
              {getRupiahString(maxSalaryJaminanPensiun)}</p>,
            umr: <p className={className}>{getRupiahString(umr)}</p>,
          };
        });
        setFixRate(mappedData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    init();
  }, []);

  const renderSpinner = () => (
    <div className='grid mt-5' style={{ justifyContent: 'center' }}>
      <MoonLoader color={COLOR.GREEN} size={30} />
    </div>
  );

  const renderRupiahInput = (options) => <RupiahCurrencyInput {...options} key={options.name}/>;

  const renderFormField = (options) => {
    const props = {
      register, errors, control, ...options,
    };

    return renderRupiahInput(props);
  };

  const renderTable = () => (
    <>
      <DataTable
        columns={columns}
        data={fixRate}
        pagination
        dense
        sortFunction={customTableSort}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        className="mt-3"
      />
    </>
  );

  const showExpiredModal = () => setIsSessionExpiredModalShown(true);

  const showAlert = () => setIsAlertModalShown(true);

  const onCloseAlertModal = () => {
    window.location.reload();
  };

  const submitRequest = async () => {
    setIsConfirmModalShown(false);
    setIsLoading(true);
    const submitHandler = { showAlert, setAlertMessage, showExpiredModal };
    await updateFixRateHandler(submittedData, submitHandler);
    setIsLoading(false);
  };

  const onUpdateFixRate = (data) => {
    setAlertMessage('Apakah anda yakin ingin mengubah fix rate untuk perhitungan payroll?');
    setSubmittedData(data);
    setIsConfirmModalShown(true);
  };

  const renderForm = () => (
    <div className="col-span-4 p-4">
      {isLoading ? renderSpinner() : <>
        <h5 className="text-md font-semibold text-gray-600">Ubah Fix Rate</h5>
        {formFields.map(renderFormField)}
        <Button style={{ backgroundColor: COLOR.GREEN }} className="mr-1 mt-3" onClick={handleSubmit(onUpdateFixRate)}>
          <EditIcon className="w-5 h-5 mr-1" aria-hidden="true" />
        Perbarui
        </Button></>}
    </div>
  );

  const renderHistory = () => (
    <div className="col-span-8 p-4">
      {isLoading ? renderSpinner() : <>
        <h5 className="text-md font-semibold text-gray-600">Histori Fix Rate</h5>
        {renderTable()}</>}
    </div>
  );

  const renderContent = () => (
    <Card className="mb-8 shadow-md data-table">
      <CardBody style={{ minHeight: '400px' }}>
        <div className="grid grid-cols-12 gap-5 mb-5" style={{ width: '100% ' }}>
          {renderForm()}
          {renderHistory()}
        </div>
      </CardBody>
    </Card>
  );

  return (
    <>
      <div className="mt-8 mb-5">
        <h2 className='m-0' style={{ fontWeight: '500' }}>
          {'Atur Fix Rate'}
        </h2>
        <small>Gunakan page ini jika anda ingin mengubah nilai fix
          dari perhitungan payroll, seperti UMR,
          dan gaji maksimum yang ditanggung untuk BPJSKES dan Jaminan Pensiun
        </small>
      </div>
      {renderContent()}
      {isConfirmModalShown && <ConfirmationModal message={alertMessage}
        onClose={() => setIsConfirmModalShown(false)} onConfirm={submitRequest}/>}
      {isAlertModalShown
        && <AlertModal message={alertMessage} onClose={onCloseAlertModal}/>}
      {isSessionExpiredModalShown && <SessionExpiredModal history={history}/>}
    </>
  );
};

export default PayrollFixRate;
