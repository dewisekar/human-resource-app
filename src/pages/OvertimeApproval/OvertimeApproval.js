import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Button, Label,
} from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import MoonLoader from 'react-spinners/MoonLoader';
import {
  Link, useLocation, Redirect, useHistory,
} from 'react-router-dom';

import SectionTitle from '../../components/Typography/SectionTitle';
import TextInput from '../../components/Input/TextInput/TextInput';
import TextAreaInput from '../../components/Input/TextAreaInput/TextAreaInput';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import SessionExpiredModal from '../../components/SessionExpiredModal/SessionExpiredModal';
import constants from '../../constants';
import utils from '../../utils';
import config from './OvertimeApproval.config';
import handlers from './OvertimeApproval.handlers';
import * as Icons from '../../icons';
import AlertModal from '../../components/AlertModal/AlertModal';
import { baseUrl } from '../../config';

const { DownloadIcon } = Icons;
const {
  COLOR, URL, PATH, RequestStatus, ErrorMessage, AlertMessage,
} = constants;
const { getRequest, checkPageIdIsValid } = utils;
const {
  disabledFormOptions, requestNoteFields, approvalFormOptions,
  approvalInfoOptions,
} = config;
const { convertData, approveRequestHandler } = handlers;

const OvertimeApproval = () => {
  const location = useLocation();
  const history = useHistory();
  const pageParams = new URLSearchParams(location.search);
  const id = pageParams.get('id');
  const isIdValid = checkPageIdIsValid(id);
  const [overtimeData, setOvertimeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);
  const [isAlertModalShown, setIsAlertModalShown] = useState(false);
  const [isSessionExpiredModalShown, setIsSessionExpiredModalShown] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const {
    register, handleSubmit, formState: { errors }, control, setError,
  } = useForm();

  const approvalNoteField = 'approvalNote';
  const isDisabled = overtimeData.status !== 'PENDING';

  useEffect(() => {
    const init = async () => {
      try {
        const fetchedDetail = await
        getRequest(URL.Overtime.OVERTIME_SUPERVISOR_DETAIL_URL + id);
        const convertedData = convertData(fetchedDetail);
        setOvertimeData(convertedData);
      } catch (error) {
        history.replace(PATH.Dashboard);
      }

      setIsLoading(false);
    };

    init();
  }, []);

  const onDownloadProof = () => {
    const urlDownload = baseUrl + URL.Overtime.DOWNLOAD_PROOF_URL + id;
    window.location.href = urlDownload;
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

  const handleApprove = (data) => {
    setSubmittedData({ ...data, status: 'APPROVED' });
    setAlertMessage(AlertMessage.CONFIRM_APPROVE);
    showConfirmModal();
  };

  const handleReject = (data) => {
    const { approvalNote } = data;

    if (!approvalNote) {
      setError(approvalNoteField, { message: ErrorMessage.required });
      return;
    }

    setSubmittedData({ ...data, status: 'REJECTED' });
    setAlertMessage(AlertMessage.CONFIRM_REJECT);
    showConfirmModal();
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

  const renderRequestDetail = () => (
    <>
        {disabledFormOptions.map(
          (option) => renderFormField(option, overtimeData[option.name]),
        )}
        <Label className="mt-4">
            <span>Proof</span>
        </Label>
        <Button block size="small" style={{ width: '143px', backgroundColor: COLOR.BLUE }} onClick={onDownloadProof}>
          <DownloadIcon className='w-4 h-4 mr-3'/>Download
        </Button>
        {requestNoteFields.map(
          (option) => renderFormField(option, overtimeData[option.name]),
        )}
    </>
  );

  const renderApprovalInput = () => (
    <>
      <form>
        {approvalFormOptions.map(
          (option) => renderFormField(option, overtimeData[option.name]),
        )}
      </form>
    </>
  );

  const renderApprovalDetail = () => (
      <>
        {approvalInfoOptions.map(
          (option) => renderFormField(option, overtimeData[option.name]),
        )}
      </>
  );

  const renderInfo = () => (
      <>
        {renderRequestDetail()}
        {overtimeData.status === RequestStatus.PENDING
          ? renderApprovalInput() : renderApprovalDetail()}
        <div className='mt-5 flex justify-end'>
          <Button tag={Link} to={PATH.Overtime.LIST_SUPERVISOR} layout="outline" className="mr-1">
            Back
          </Button>
          <Button className="mr-1" style={{ backgroundColor: COLOR.GREEN }} onClick={handleSubmit(handleApprove)} disabled={isDisabled}>
            Approve
          </Button>
          <Button style={{ backgroundColor: 'red' }} onClick={handleSubmit(handleReject)} disabled={isDisabled}>
            Reject
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
          <SectionTitle>Overtime Approval</SectionTitle>
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

export default OvertimeApproval;
