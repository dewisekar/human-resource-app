import AxiosUtil from './AxiosUtil';
import UnpackError from './UnpackError';
import FormUtil from './FormUtil';
import StorageUtil from './StorageUtil';
import AuthUtil from './AuthUtil';
import PageUtil from './PageUtil';

export default {
  ...AxiosUtil, ...UnpackError, ...FormUtil, ...StorageUtil, ...AuthUtil, ...PageUtil,
};
