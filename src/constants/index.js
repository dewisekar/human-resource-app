import URL from './url';
import PATH from './path';
import COLOR from './color';
import ErrorMessage from './error-message';

const Accessibility = {
  ALL: 'ALL',
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  STAFF: 'STAFF',
  BOD: 'BOD',
};

const AlertMessage = {
  EMPTY_FORM: 'Please fill this form.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  CONFIRM_APPROVE: 'Are you sure you want to approve this request?',
  CONFIRM_REJECT: 'Are you sure you want to reject this request?',
};

const CURRENCY = {
  IDR: 'Rp',
};

const AdditionalClasses = {
  FormInput: 'block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1',
};

const AxiosErrorMessage = {
  TOKEN_EXPIRED: 'Token is expired',
};

const AxiosErrorStatus = {
  UNAUTHORIZED: 401,
};

const RequestStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

const MonthsSelectOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const MaritalStatusOptions = [
  { label: 'Lajang', value: 'Lajang' },
  { label: 'Kawin', value: 'Kawin' },
];

const GenderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

const EmploymentStatusOptions = [
  { label: 'Full Time', value: 'Full Time' },
  { label: 'Part Time', value: 'Part Time' },
  { label: 'PKWT', value: 'PKWT' },
  { label: 'Freelance', value: 'Freelance' },
  { label: 'Intern', value: 'Intern' },
];

const TaskTypeOptions = [
  { label: 'Daily', value: 'DAILY' },
  { label: 'Weekly', value: 'WEEKLY' },
];

const TaskPriorityOptions = [
  { label: 'LOW', value: 'LOW' },
  { label: 'MEDIUM', value: 'MEDIUM' },
  { label: 'HIGH', value: 'HIGH' },
];

const LongDateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const RequestStatusBadgeEnum = {
  PENDING: 'primary',
  APPROVED: 'success',
  REJECTED: 'danger',
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
  AxiosErrorMessage,
  AxiosErrorStatus,
  RequestStatus,
  MonthsSelectOptions,
  MaritalStatusOptions,
  EmploymentStatusOptions,
  GenderOptions,
  TaskTypeOptions,
  TaskPriorityOptions,
  LongDateOptions,
  RequestStatusBadgeEnum,
};
