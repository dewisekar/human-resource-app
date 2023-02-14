import utils from '../../utils';
import config from './ReimbursementApproval.config';
import constants from '../../constants';

const { getRupiahString, unpackError, patchRequest } = utils;
const { dateOptions } = config;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const convertData = (data) => {
  const {
    proof, approvalDate, createdAt, invoiceDate,
    requestedAmount, approvedAmount, ...otherProps
  } = data;

  const convertedCreatedAt = new Date(createdAt).toLocaleDateString('id-ID', dateOptions);
  const convertedInvoiceDate = new Date(invoiceDate).toLocaleDateString('id-ID', dateOptions);
  const convertedApprovalDate = approvalDate ? new Date(approvalDate).toLocaleDateString('id-ID', dateOptions) : '';
  const convertedRequestedAmount = getRupiahString(requestedAmount);
  const convertedApprovedAmount = approvedAmount ? getRupiahString(requestedAmount) : '';

  return {
    createdAt: convertedCreatedAt,
    invoiceDate: convertedInvoiceDate,
    approvalDate: convertedApprovalDate,
    requestedAmount: convertedRequestedAmount,
    approvedAmount: convertedApprovedAmount,
    actualRequestedAmount: requestedAmount,
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
    await patchRequest(URL.Reimbursement.APPROVE_URL + id, payload);

    setAlertMessage(successMessage);
    showAlert();
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosErrorMessage.TOKEN_EXPIRED) {
      showExpiredModal();
    }

    setAlertMessage(errorMessage);
    showAlert();
  }
};

export default { convertData, approveRequestHandler };
