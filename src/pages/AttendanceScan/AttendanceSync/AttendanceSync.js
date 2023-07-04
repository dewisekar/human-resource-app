import React, { useState } from 'react';
import { Button } from '@windmill/react-ui';
import MoonLoader from 'react-spinners/MoonLoader';

import constants from '../../../constants';
import utils from '../../../utils';
import AlertModal from '../../../components/AlertModal/AlertModal';

const { COLOR, URL, AlertMessage } = constants;
const { getRequest, unpackError } = utils;

const AttendanceSync = ({ size }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [state, setState] = useState({ chosenDate: null });
  const filterStyle = { display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value === '' ? null : value });
  };

  const renderSpinner = () => (
    <div className='grid mt-5' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <div className='row'>
       Syncing... Please Wait... Dont refresh or close the page!
      </div>
      <MoonLoader color={COLOR.BLUE} size={30} />
    </div>
  );

  const onSync = async () => {
    try {
      const { chosenDate } = state;
      if (chosenDate === null) { setErrorMessage('Please choose valid date'); return; }
      setErrorMessage(null);
      setIsLoading(true);
      const urlParams = `?date=${chosenDate}`;
      await getRequest(URL.Attendance.SYNC + urlParams);
      setAlertMessage('Successfully Sync Attendance');
      setIsAlertShown(true);
    } catch (error) {
      const message = error.response
        ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;
      setAlertMessage(message);
      setIsAlertShown(true);
    }
    setIsLoading(false);
  };

  const renderForm = () => (<div className="relative text-gray-500 grid grid-cols-12 gap-1 mt-3" style={{ width: size }}>
    <div className='col-span-1'>
      <small>Choose Date</small>
    </div>
    <div className="col-span-4">
      <input
        className="block w-full pr-20 mt-0 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
        placeholder="Search..."
        value={state.chosenDate}
        onChange={onFormChange}
        type="date"
        name="chosenDate"
      />
      {errorMessage && <div className="col-span-12"><small className='text-red-600'>{errorMessage}</small></div>}
    </div>
    <div className="col-span-1 p-0" style={filterStyle}>
      <Button onClick={onSync} size="small" className="font-semibold" style={{ padding: '7px', backgroundColor: COLOR.BLUE, height: '41px' }}>
        Sync
      </Button>
    </div>
  </div>);

  return (
    <>
      <div className='col-span-12 text-gray-900'>
        <small>Sinkronisasi data absen secara manual dengan menggunakan form berikut:</small>
      </div>
      {isLoading ? renderSpinner() : renderForm()}
      {isAlertShown && <AlertModal message={alertMessage} onClose={() => setIsAlertShown(false)}/>}
    </>
  );
};

export default AttendanceSync;
