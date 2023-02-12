import utils from '../../utils';
import constants from '../../constants';
import config from './ReimbursementRequest.config';

const {
  postMultipartRequest, unpackError,
} = utils;
const {
  URL, AlertMessage, PATH, AxiosError,
} = constants;
const { Modals } = config;

const submitRequest = async (payload, handlers) => {
  const { openModalHandler, setAlertMessage } = handlers;

  const formData = new FormData();
  Object.entries(payload).map(([key, value]) => formData.append([key], value));

  try {
    await postMultipartRequest(URL.REIMBURSEMENT_URL, formData);
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosError.TOKEN_EXPIRED) { openModalHandler(Modals.SESSION); return; }

    console.log('ini', errorMessage);
  }
};

export default { submitRequest };
