import utils from '../../utils';
import constants from '../../constants';

const { unpackError, deleteRequest } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const deleteTaskHandler = async (id, handlers) => {
  const {
    seIsSessionExpired, showAlert, setAlertMessage, reloadPage,
  } = handlers;

  try {
    await deleteRequest(URL.TaskManagement.TASK + id);
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

export default { deleteTaskHandler };
