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
      icon: 'MoneyIcon',
      name: 'Reimbursement',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Reimbursement.LIST_ADMIN,
          name: 'Approvement Request',
        },
        {
          path: PATH.Reimbursement.TYPE,
          name: 'Manage Type',
        },
      ],
    },
    {
      icon: 'ChartsIcon',
      name: 'Summary',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Reimbursement.SUMMARY,
          name: 'Reimbursement',
        },
        {
          path: PATH.Overtime.SUMMARY,
          name: 'Overtime',
        },
        {
          path: PATH.Admin.Summary,
          name: 'All Summary',
        },
      ],
    },
    {
      icon: 'PeopleIcon',
      name: 'Organization',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Employees.LIST,
          name: 'Employees',
        },
        {
          path: PATH.Organization.DIVISION_LIST,
          name: 'Divisions',
        },
        {
          path: PATH.Organization.DEPARTEMENT_LIST,
          name: 'Departments',
        },
      ],
    },
  ],
  BOD: [
    {
      name: 'Board of Directors',
      type: 'DIVIDER',
    },
    {
      icon: 'ChartsIcon',
      name: 'Summary',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Reimbursement.SUMMARY,
          name: 'Reimbursement',
        },
        {
          path: PATH.Overtime.SUMMARY,
          name: 'Overtime',
        },
        {
          path: PATH.Admin.Summary,
          name: 'All Summary',
        },
      ],
    },
    {
      icon: 'PeopleIcon',
      name: 'Organization',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Employees.LIST,
          name: 'Employees',
        },
      ],
    },
  ],
  SUPERVISOR: [
    {
      name: 'Supervisor',
      type: 'DIVIDER',
    },
    {
      icon: 'DocumentIcon',
      name: 'Approval Request',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Overtime.LIST_SUPERVISOR,
          name: 'Overtime',
        },
      ],
    },
    {
      icon: 'CalendarIcon',
      name: 'Task Management',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.TaskManagement.SUPERVISOR,
          name: 'Your Team Tasks',
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
    {
      path: PATH.TaskManagement.STAFF,
      icon: 'CalendarIcon',
      name: 'Task Management',
      type: 'MENU',
    },
  ],
  GENERAL: [
    {
      type: 'DIVIDER',
      name: 'General',
    },
    {
      path: '/password/change',
      icon: 'LockIcon',
      name: 'Change Password',
      type: 'MENU',
    },
  ],
};

export default { routes, sidebarRoutes };
