import utils from '../../utils';
import constants from '../../constants';

const { unpackError, patchRequest } = utils;
const { URL, AlertMessage, AxiosErrorMessage } = constants;

const convertData = (data) => {
  const {
    fingerprintPin, status, level, superior, ...otherProps
  } = data;

  const roles = level.map((item) => ({ value: item.id, label: item.name }));
  const superiorValue = superior ? { value: superior.id, label: superior.name } : null;
  return {
    fingerprintPin: fingerprintPin.toString(),
    status: { value: status, label: status },
    roles,
    superior: superiorValue,
    ...otherProps,
  };
};

const updateEmployeeHandler = async (id, payload, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const successMessage = 'Successfully update employee data!';
  console.log(payload);

  try {
    await patchRequest(URL.User.USER_URL + id, payload);

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

export default { convertData, updateEmployeeHandler };
