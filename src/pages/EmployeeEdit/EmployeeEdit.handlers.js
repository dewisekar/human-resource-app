import utils from '../../utils';
import constants from '../../constants';

const { unpackError, patchRequest } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const convertData = (data) => {
  const {
    fingerprintPin, ...otherProps
  } = data;

  return {
    fingerprintPin: fingerprintPin.toString(),
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
    }

    setAlertMessage(errorMessage);
    showAlert();
  }
};

export default { convertData, approveRequestHandler };
