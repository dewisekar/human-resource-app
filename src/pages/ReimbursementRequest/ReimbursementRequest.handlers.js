import utils from '../../utils';
import constants from '../../constants';
import config from './ReimbursementRequest.config';

const { postMultipartRequest, unpackError } = utils;
const { URL, AlertMessage, AxiosError } = constants;
const { Modals } = config;

const SUCCESS = 'SUCCESS';
const successMessage = 'Success submit reimbursement request.';

const submitRequest = async (payload, handlers) => {
  const { openModalHandler, setAlertMessage, setAlertModalType } = handlers;

  const formData = new FormData();
  Object.entries(payload).map(([key, value]) => formData.append([key], value));

  try {
    await postMultipartRequest(URL.Reimbursement.REIMBURSEMENT_URL, formData);

    setAlertMessage(successMessage);
    setAlertModalType(SUCCESS);
    openModalHandler(Modals.ALERT);
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosError.TOKEN_EXPIRED) { openModalHandler(Modals.SESSION); return; }

    setAlertMessage(errorMessage);
    openModalHandler(Modals.ALERT);
  }
};

export default { submitRequest };
