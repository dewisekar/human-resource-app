import utils from '../../utils';
import constants from '../../constants';

const { unpackError, postRequest } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const updateFixRateHandler = async (payload, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const successMessage = 'Successfully update employee data!';

  try {
    await postRequest(URL.User.USER_URL, payload);

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

export default { updateFixRateHandler };
