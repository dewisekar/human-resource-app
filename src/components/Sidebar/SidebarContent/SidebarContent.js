import React, { useState, useEffect } from 'react';

import handlers from './SidebarContent.handler';
import SidebarSubmenu from '../SidebarSubmenu/SidebarSubmenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import SidebarMenuDivider from '../SidebarMenuDivider/SidebarMenuDivider';
import utils from '../../../utils';

const { getRole } = utils;
const { getSidebarMenu } = handlers;

const SidebarContent = () => {
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    const fetchedRoles = getRole();
    const filtered = getSidebarMenu(fetchedRoles);
    setFilteredRoutes(filtered);
  }, []);

  const renderSidebarMenu = (route) => {
    const RenderMenu = {
      SUBMENU_HEADER: <SidebarSubmenu route={route} key={route.name} />,
      MENU: <SidebarMenu route={route}/>,
      DIVIDER: <SidebarMenuDivider route={route}/>,
    };

    return RenderMenu[route.type];
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        Jiera Official
      </a>
      <ul className="mt-6">
        {filteredRoutes.map((route) => (renderSidebarMenu(route)))}
      </ul>
    </div>
  );
};

export default SidebarContent;
