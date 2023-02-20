import utils from '../../utils';
import config from './OvertimeApproval.config';
import constants from '../../constants';

const { unpackError, patchRequest } = utils;
const { dateOptions } = config;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const convertData = (data) => {
  const {
    approvalDate, createdAt, overtimeDate, ...otherProps
  } = data;

  const convertedCreatedAt = new Date(createdAt).toLocaleDateString('id-ID', dateOptions);
  const convertedOvertimeDate = new Date(overtimeDate).toLocaleDateString('id-ID', dateOptions);
  const convertedApprovalDate = approvalDate ? new Date(approvalDate).toLocaleDateString('id-ID', dateOptions) : '';

  return {
    createdAt: convertedCreatedAt,
    overtimeDate: convertedOvertimeDate,
    approvalDate: convertedApprovalDate,
    ...otherProps,
  };
};

const approveRequestHandler = async (id, payload, handlers) => {
  const Status = {
    APPROVED: 'approve',
    REJECTED: 'reject',
  };
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const { status } = payload;
  const successMessage = `Successfully ${Status[status]} request!`;

  try {
    await patchRequest(URL.Overtime.APPROVE_URL + id, payload);

    setAlertMessage(successMessage);
    showAlert();
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosErrorMessage.TOKEN_EXPIRED) {
      showExpiredModal();
      return;
    }

    setAlertMessage(errorMessage);
    showAlert();
  }
};

export default { convertData, approveRequestHandler };
