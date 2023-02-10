import AxiosUtil from './AxiosUtil';
import UnpackError from './UnpackError';
import FormUtil from './FormUtil';
import StorageUtil from './StorageUtil';
import AuthUtil from './AuthUtil';

export default {
  ...AxiosUtil, ...UnpackError, ...FormUtil, ...StorageUtil, ...AuthUtil,
};
