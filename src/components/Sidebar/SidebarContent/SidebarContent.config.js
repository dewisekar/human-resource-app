import constants from '../../../constants';

const { PATH } = constants;

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

const sidebarRoutes = {
  DASHBOARD: [
    {
      path: '/dashboard',
      icon: 'HomeIcon',
      name: 'Dashboard',
      type: 'MENU',
    },
  ],
  ADMIN: [
    {
      name: 'Admin',
      type: 'DIVIDER',
    },
    {
      path: '/cards',
      icon: 'CardsIcon',
      name: 'Attendance',
      type: 'MENU',
    },
    {
      icon: 'DocumentIcon',
      name: 'Approval Request',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Reimbursement.LIST_ADMIN,
          name: 'Reimbursement',
        },
        {
          path: PATH.Reimbursement.LIST_REQUEST,
          name: 'Overtime',
        },
      ],
    },
    {
      path: '/cards',
      icon: 'CardsIcon',
      name: 'Overtime',
      type: 'MENU',
    },
  ],
  SUPERVISOR: [
    {
      name: 'Supervisor',
      type: 'DIVIDER',
    },
    {
      path: '/cards',
      icon: 'CardsIcon',
      name: 'Buat SPV',
      type: 'MENU',
    },
    {
      icon: 'PagesIcon',
      name: 'Pages',
      type: 'SUBMENU_HEADER',
      routes: [
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

  ],
  STAFF: [
    {
      name: 'Staff',
      type: 'DIVIDER',
    },
    {
      icon: 'MoneyIcon',
      name: 'Reimbursement',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Reimbursement.ADD_REQUEST,
          name: 'Add New Request',
        },
        {
          path: PATH.Reimbursement.LIST_REQUEST,
          name: 'List Request',
        },
      ],
    },
    {
      icon: 'ClockIcon',
      name: 'Overtime',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Overtime.ADD_REQUEST,
          name: 'Add New Request',
        },
        {
          path: PATH.Overtime.LIST_REQUEST,
          name: 'List Request',
        },
      ],
    },
  ],
  GENERAL: [
    {
      type: 'DIVIDER',
      name: 'General',
    },
    {
      path: '/cards',
      icon: 'LockIcon',
      name: 'Change Password',
      type: 'MENU',
    },
  ],
};

export default { routes, sidebarRoutes };
