import utils from '../../utils';
import constants from '../../constants';

const {
  unpackError, patchRequest, postRequest, deleteRequest,
} = utils;
const { URL: { Organization }, AlertMessage, AxiosErrorMessage } = constants;

const saveDivisionHandler = async (id, payload, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const action = id ? 'update' : 'add new';
  const url = id ? Organization.DIVISION_URL + id : Organization.DIVISION_URL;
  const successMessage = `Successfully ${action} division data!`;

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

const deleteDivisionHandler = async (id, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const successMessage = 'Successfully delete division data!';

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

export default { saveDivisionHandler, deleteDivisionHandler };
