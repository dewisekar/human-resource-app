import URL from './url';
import PATH from './path';
import COLOR from './color';
import ErrorMessage from './error-message';

const Accessibility = {
  ALL: 'ALL',
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  STAFF: 'STAFF',
};

const AlertMessage = {
  EMPTY_FORM: 'Please fill this form.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};

const CURRENCY = {
  IDR: 'Rp',
};

const AdditionalClasses = {
  FormInput: 'block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1',
};

const AxiosError = {
  TOKEN_EXPIRED: 'Token is expired',
};

export default {
  URL,
  Accessibility,
  AlertMessage,
  PATH,
  COLOR,
  CURRENCY,
  ErrorMessage,
  AdditionalClasses,
  AxiosError,
};
