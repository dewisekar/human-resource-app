import utils from '../../utils';
import constants from '../../constants';
import config from './TaskManagementAdd.config';

const { postRequest, unpackError } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;
const { Modals } = config;

const SUCCESS = 'SUCCESS';
const successMessage = 'Success create new task.';

const submitRequest = async (payload, handlers) => {
  const { openModalHandler, setAlertMessage, setAlertModalType } = handlers;

  try {
    await postRequest(URL.TaskManagement.TASK, payload);

    setAlertMessage(successMessage);
    setAlertModalType(SUCCESS);
    openModalHandler(Modals.ALERT);
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosErrorMessage.TOKEN_EXPIRED) {
      openModalHandler(Modals.SESSION); return;
    }

    setAlertMessage(errorMessage);
    openModalHandler(Modals.ALERT);
  }
};

export default { submitRequest };
