import jwt from 'jsonwebtoken';

import StorageUtil from './StorageUtil';
import constants from '../constants';

const { getToken, getRole } = StorageUtil;
const { Accessibility } = constants;

const isLoggedIn = () => {
  const dateNow = new Date();
  const token = getToken();

  if (!token) { return false; }

  const decodedToken = jwt.decode(token, { complete: true });
  const { payload: { exp } } = decodedToken;

  if (exp * 1000 > dateNow.getTime()) { return true; }

  return false;
};

const hasRole = (pageAccessibility) => {
  const userRole = getRole();
  if (pageAccessibility[0] === Accessibility.ALL) { return true; }

  return userRole.some((role) => pageAccessibility.includes(role));

  // return userRole.includes(pageAccessibility);
};

export default { isLoggedIn, hasRole };
