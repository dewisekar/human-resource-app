import constants from '../../../constants';

const { PATH } = constants;

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
      icon: 'FingerprintIcon',
      name: 'Attendance',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.Attendance.SCAN,
          name: 'Scan Report',
        },
        {
          path: PATH.Reimbursement.TYPE,
          name: 'Manage Type',
        },
      ],
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
    {
      icon: 'CalendarIcon',
      name: 'Task Management',
      type: 'SUBMENU_HEADER',
      routes: [
        {
          path: PATH.TaskManagement.BOD_TODAY,
          name: 'Today\'s Tasks',
        },
        {
          path: PATH.TaskManagement.BOD_ALL,
          name: 'All Tasks',
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

export default { sidebarRoutes };
