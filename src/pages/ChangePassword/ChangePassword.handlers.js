import CryptoJS from 'crypto-js';

import utils from '../../utils';
import constants from '../../constants';
import { encryptKey } from '../../config';
import config from './ChangePassword.config';

const {
  postRequest, unpackError,
} = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;
const { Modals } = config;

const changePasswordHandler = async (payload, handler) => {
  const { newPassword, oldPassword } = payload;
  const { setAlertMessage, showModal, setAlertType } = handler;

  try {
    const encryptedOldPassword = CryptoJS.AES.encrypt(oldPassword, encryptKey).toString();
    const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, encryptKey).toString();
    const newPayload = { newPassword: encryptedNewPassword, oldPassword: encryptedOldPassword };
    await postRequest(URL.Password.PASSWORD, newPayload);

    setAlertMessage('Successfully changed password');
    setAlertType('SUCCESS');
    showModal(Modals.ALERT);
  } catch (error) {
    const errorMessage = error.response
      ? unpackError(error).message : AlertMessage.INTERNAL_SERVER_ERROR;

    if (errorMessage === AxiosErrorMessage.TOKEN_EXPIRED) {
      showModal(Modals.SESSION); return;
    }

    setAlertMessage(errorMessage);
    showModal();
  }
};

export default { changePasswordHandler };
