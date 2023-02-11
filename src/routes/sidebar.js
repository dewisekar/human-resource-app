import constants from '../constants';

const { Accessibility } = constants;

const routes = [
  {
    path: '/dashboard',
    icon: 'HomeIcon',
    name: 'Dashboard',
    role: Accessibility.ALL,
  },
  {
    path: '/forms',
    icon: 'FormsIcon',
    name: 'Forms',
    role: Accessibility.SUPERVISOR,
  },
  {
    path: '/cards',
    icon: 'CardsIcon',
    name: 'Cards',
    role: Accessibility.ADMIN,
  },
  {
    path: '/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
    role: Accessibility.STAFF,
  },
  {
    path: '/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
    role: Accessibility.ALL,
  },
  {
    path: '/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
    role: Accessibility.ALL,
  },
  {
    path: '/tables',
    icon: 'TablesIcon',
    name: 'Tables',
    role: Accessibility.ALL,
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
        role: Accessibility.ALL,
      },
      {
        path: '/404',
        name: '404',
        role: Accessibility.ALL,
      },
      {
        path: '/blank',
        name: 'Blank',
        role: Accessibility.ALL,
      },
    ],
  },
];

// const sidebarRoutes = {
//   DASHBOARD: [
//     {
//       path: '/dashboard',
//       icon: 'HomeIcon',
//       name: 'Dashboard',
//       role: Accessibility.ALL,
//     },
//   ],
//   ADMIN: [

//   ]
// };

export default { routes };
