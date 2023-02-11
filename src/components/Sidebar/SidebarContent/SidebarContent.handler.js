import config from './SidebarContent.config';

const DASHBOARD = 'DASHBOARD';
const GENERAL = 'GENERAL';

const getSidebarMenu = (roles) => {
  const { sidebarRoutes } = config;
  const routes = [...sidebarRoutes[DASHBOARD]];

  roles.forEach((role) => routes.push(...sidebarRoutes[role]));

  routes.push(...sidebarRoutes[GENERAL]);

  return routes;
};

export default { getSidebarMenu };
