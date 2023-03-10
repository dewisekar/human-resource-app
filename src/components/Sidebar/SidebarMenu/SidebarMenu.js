import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import * as Icons from '../../../icons';

const SidebarMenu = ({ route }) => {
  const renderIcon = (icon) => {
    const Icon = Icons[icon];
    return <Icon className="w-5 h-5" aria-hidden="true" />;
  };

  return (
    <li className="relative px-6 py-3" key={route.name}>
        <NavLink
        exact
        to={route.path}
        className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        activeClassName="text-gray-800 dark:text-gray-100"
        >
            <Route path={route.path} exact={route.exact}>
                <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
                ></span>
            </Route>

            {renderIcon(route.icon)}
            <span className="ml-4">{route.name}</span>
        </NavLink>
    </li>
  );
};
export default SidebarMenu;
