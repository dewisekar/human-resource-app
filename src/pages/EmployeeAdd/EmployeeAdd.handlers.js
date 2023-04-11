import utils from '../../utils';
import constants from '../../constants';

const { unpackError, postRequest, convertDataToSelectOptions } = utils;
const {
  URL, AlertMessage, AxiosErrorMessage, MaritalStatusOptions,
  GenderOptions, EmploymentStatusOptions,
} = constants;

const addEmployeeHandler = async (payload, handlers) => {
  const { showAlert, setAlertMessage, showExpiredModal } = handlers;
  const successMessage = 'Successfully update employee data!';

  try {
    await postRequest(URL.User.USER_URL, payload);

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

const updateDropdownOptions = (payload) => {
  const {
    fetchedUsers, fetchedLevel, fetchedDepartment, fetchedDivision, fetchedBank,
  } = payload;

  const convertedLevel = convertDataToSelectOptions(fetchedLevel, 'id', 'name');
  const convertedBank = convertDataToSelectOptions(fetchedBank, 'id', 'name');
  const convertedUser = convertDataToSelectOptions(fetchedUsers, 'id', 'name');
  const convertedDepartment = convertDataToSelectOptions(fetchedDepartment, 'id', 'name');
  const convertedDivision = convertDataToSelectOptions(fetchedDivision, 'id', 'name');

  return {
    roles: convertedLevel,
    bankCode: convertedBank,
    superior: convertedUser,
    maritalStatus: MaritalStatusOptions,
    employmentStatus: EmploymentStatusOptions,
    gender: GenderOptions,
    division: convertedDivision,
    department: convertedDepartment,
  };
};

export default { addEmployeeHandler, updateDropdownOptions };
