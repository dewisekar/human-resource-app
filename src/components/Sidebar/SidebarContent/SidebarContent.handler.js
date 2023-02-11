import config from './SidebarContent.config';

const DASHBOARD = 'DASHBOARD';

const getSidebarMenu = (roles) => {
  const { sidebarRoutes } = config;
  const routes = [...sidebarRoutes[DASHBOARD]];

  roles.forEach((role) => routes.push(...sidebarRoutes[role]));

  return routes;
};

export default { getSidebarMenu };
