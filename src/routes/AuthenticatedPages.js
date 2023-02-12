import React from 'react';

import { Redirect } from 'react-router-dom';

import Layout from '../containers/Layout';
import utils from '../utils';
import constants from '../constants';

const { isLoggedIn } = utils;
const { PATH } = constants;

const AuthenticatedPages = () => {
  const isAuthenticated = isLoggedIn();

  return (
    <>
      {
        isAuthenticated
          ? (
            <Layout/>
          ) : <Redirect to={PATH.Login} />
      }
    </>
  );
};

export default AuthenticatedPages;
