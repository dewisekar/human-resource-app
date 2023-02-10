const ROLE_KEY = 'role';
const NAME_KEY = 'name';
const ID_KEY = 'id';
const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';

const saveRole = (role) => (sessionStorage.setItem(ROLE_KEY, role));

const saveName = (name) => sessionStorage.setItem(NAME_KEY, name);

const saveUserId = (userId) => sessionStorage.setItem(ID_KEY, userId);

const saveUsername = (username) => sessionStorage.setItem(USERNAME_KEY, username);

const saveToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);

const getRole = () => sessionStorage.getItem(ROLE_KEY);

const getName = () => sessionStorage.getItem(NAME_KEY);

const getUserId = () => sessionStorage.getItem(ID_KEY);

const getUsername = () => sessionStorage.getItem(USERNAME_KEY);

const getToken = () => sessionStorage.getItem(TOKEN_KEY);

const clearAllKey = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(NAME_KEY);
  sessionStorage.removeItem(ID_KEY);
  sessionStorage.removeItem(USERNAME_KEY);
  sessionStorage.removeItem(ROLE_KEY);
};

export default {
  saveName,
  saveUserId,
  saveUsername,
  saveToken,
  saveRole,
  getRole,
  getName,
  getUserId,
  getUsername,
  getToken,
  clearAllKey,
};
