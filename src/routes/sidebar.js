const routes = [
  {
    path: '/dashboard',
    icon: 'HomeIcon',
    name: 'Dashboard',
  },
  {
    path: '/forms',
    icon: 'FormsIcon',
    name: 'Forms',
  },
  {
    path: '/cards',
    icon: 'CardsIcon',
    name: 'Cards',
  },
  {
    path: '/charts',
    icon: 'ChartsIcon',
    name: 'Charts',
  },
  {
    path: '/buttons',
    icon: 'ButtonsIcon',
    name: 'Buttons',
  },
  {
    path: '/modals',
    icon: 'ModalsIcon',
    name: 'Modals',
  },
  {
    path: '/tables',
    icon: 'TablesIcon',
    name: 'Tables',
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/404',
        name: '404',
      },
      {
        path: '/blank',
        name: 'Blank',
      },
    ],
  },
];

export default routes;
