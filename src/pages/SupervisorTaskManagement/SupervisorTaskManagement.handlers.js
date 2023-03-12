import utils from '../../utils';
import constants from '../../constants';

const { patchRequest, unpackError } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const updateStatusHandler = async (data, handlers) => {
  const {
    seIsSessionExpired, showAlert, setAlertMessage, reloadPage,
  } = handlers;
  const { status, id } = data;
  const payload = { status };

  try {
    await patchRequest(URL.TaskManagement.TASK + id, payload);
    reloadPage();
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosErrorMessage.TOKEN_EXPIRED) {
      seIsSessionExpired();
      return;
    }

    setAlertMessage(errorMessage);
    showAlert();
  }
};

export default { updateStatusHandler };
