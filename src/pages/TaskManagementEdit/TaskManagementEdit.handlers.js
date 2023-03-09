import utils from '../../utils';
import constants from '../../constants';
import config from './TaskManagementEdit.config';

const { patchRequest, unpackError } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;
const { Modals } = config;

const SUCCESS = 'SUCCESS';
const successMessage = 'Successfully edit task.';

const submitRequest = async (id, payload, handlers) => {
  const { openModalHandler, setAlertMessage, setAlertModalType } = handlers;

  try {
    await patchRequest(URL.TaskManagement.TASK + id, payload);

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

const convertData = (data) => {
  const { type, priority } = data;

  return {
    ...data,
    type: { value: type, label: type },
    priority: { value: priority, label: priority },
  };
};

export default { submitRequest, convertData };
