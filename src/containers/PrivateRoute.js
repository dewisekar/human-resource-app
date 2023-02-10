import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import utils from '../utils';
import constants from '../constants';

const { PATH } = constants;
const { hasRole, isLoggedIn, clearAllKey } = utils;

const PrivateRoute = (props) => {
  const { accessibility, component: Component, ...otherProps } = props;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    try {
      const runApp = async () => {
        const isLogged = isLoggedIn();

        if (!isLogged) {
          clearAllKey();
        }

        setIsUserLoggedIn(isLogged);
      };

      runApp();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderComponent = (routeProps) => {
    if (isUserLoggedIn === false) { return <Redirect to={PATH.Login} />; }

    return (
      hasRole(accessibility)
        ? <Component {...routeProps} />
        : <Redirect to={PATH.Dashboard} />
    );
  };

  return <Route {...otherProps} render={renderComponent} />;
};

export default PrivateRoute;
