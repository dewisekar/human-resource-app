import utils from '../../utils';
import constants from '../../constants';

const {
  unpackError, patchRequest, postRequest, deleteRequest,
} = utils;
const { URL: { Organization }, AlertMessage, AxiosErrorMessage } = constants;

const saveReimbursementTypeHandler = async (id, payload, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const action = id ? 'update' : 'add new';
  const url = id ? Organization.DIVISION_URL + id : Organization.DIVISION_URL;
  const successMessage = `Successfully ${action} reimbursement type data!`;

  try {
    await (id ? patchRequest(url, payload) : postRequest(url, payload));

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

const deleteReimbursementTypeHandler = async (id, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const successMessage = 'Successfully delete reimbursement type data!';

  try {
    await deleteRequest(Organization.DIVISION_URL + id);

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

export default { saveReimbursementTypeHandler, deleteReimbursementTypeHandler };
