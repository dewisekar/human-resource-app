import StorageUtil from './StorageUtil';

const { getToken } = StorageUtil;

const ifLoggedIn = () => {
  const token = getToken();
  return !!token;
};

export default { ifLoggedIn };
