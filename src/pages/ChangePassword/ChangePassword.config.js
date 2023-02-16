const passwordMinimumLength = 'Password needs to be at least 6 characters';

const formOptions = [
  {
    label: 'Old Password',
    name: 'oldPassword',
    rules: { required: true },
    type: 'password',
  },
  {
    label: 'New Password',
    name: 'newPassword',
    rules: { required: true, minLength: { value: 6, message: passwordMinimumLength } },
    type: 'password',
  },
  {
    label: 'Confirm New Password',
    name: 'confirmNewPassword',
    rules: { required: true, minLength: { value: 6, message: passwordMinimumLength } },
    type: 'password',
  },
];

const Modals = {
  SESSION: 'SESSION',
  ALERT: 'ALERT',
};

export default { formOptions, Modals };
