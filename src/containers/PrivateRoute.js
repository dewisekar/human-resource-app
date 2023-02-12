import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import utils from '../utils';
import constants from '../constants';

const { PATH } = constants;
const { hasRole } = utils;

const PrivateRoute = (props) => {
  const { accessibility, component: Component, ...otherProps } = props;

  const renderComponent = (routeProps) => (
    hasRole(accessibility)
      ? <Component {...routeProps} />
      : <Redirect to={PATH.Dashboard} />
  );

  return <Route {...otherProps} render={renderComponent} />;
};

export default PrivateRoute;
