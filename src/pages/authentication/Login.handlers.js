import utils from '../../utils';
import constants from '../../constants';

const { postRequest, unpackError } = utils;
const { URL } = constants;

const loginHandler = async (payload, handler) => {
  try {
    const result = await postRequest(URL.LOGIN_URL, payload);
    console.log('ini result', result);
  } catch (error) {
    const unpackedError = unpackError(error);
    const { handleShowModal, setModalErrorMessage } = handler;

    setModalErrorMessage(unpackedError.message);
    handleShowModal();
  }
};

export default { loginHandler };
