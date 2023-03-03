import utils from '../../utils';
import constants from '../../constants';

const { unpackError, patchRequest, convertDataToSelectOptions } = utils;
const {
  URL, AlertMessage, AxiosErrorMessage, MaritalStatusOptions,
  GenderOptions, EmploymentStatusOptions,
} = constants;

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
    ...otherProps,
    superior: superiorValue,
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

const updateDropdownOptions = (payload) => {
  const {
    fetchedUsers, fetchedLevel, fetchedDepartment, fetchedDivision, fetchedBank, userId,
  } = payload;

  const convertedLevel = convertDataToSelectOptions(fetchedLevel, 'id', 'name');
  const convertedBank = convertDataToSelectOptions(fetchedBank, 'id', 'name');
  const filteredUser = fetchedUsers.filter((item) => item.id.toString() !== userId.toString());
  const convertedUser = convertDataToSelectOptions(filteredUser, 'id', 'name');
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

export default { convertData, updateEmployeeHandler, updateDropdownOptions };
