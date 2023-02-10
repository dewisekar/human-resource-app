import CryptoJS from 'crypto-js';

import utils from '../../utils';
import constants from '../../constants';
import { encryptKey } from '../../config';

const {
  postRequest, unpackError, saveToken, saveName, saveUserId, saveUsername, saveRole,
} = utils;
const { URL, AlertMessage, PATH } = constants;

const loginHandler = async (payload, handler) => {
  const { password, username } = payload;
  const { history } = handler;

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptKey).toString();
    const result = await postRequest(URL.LOGIN_URL, { ...payload, password: encryptedPassword });
    const {
      token, userId, name, roles,
    } = result;

    console.log('ini roles', roles);
    saveToken(token);
    saveName(name);
    saveUserId(userId);
    saveUsername(username);
    saveRole(roles);

    history.replace(PATH.Dashboard);
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;
    const { handleShowModal, setModalErrorMessage } = handler;

    setModalErrorMessage(errorMessage);
    handleShowModal();
  }
};

export default { loginHandler };
