const PATH = {
  Login: '/login',
  Dashboard: '/dashboard',
  Admin: {
    Summary: '/summary',
  },
  Reimbursement: {
    ADD_REQUEST: '/reimbursement/add',
    LIST_REQUEST: '/reimbursement',
    DETAIL: '/reimbursement/detail',
    LIST_ADMIN: '/reimbursement/admin',
    APPROVAL: '/reimbursement/approval',
    SUMMARY: '/reimbursement/summary',
    TYPE: '/reimbursement/type',
  },
  Overtime: {
    ADD_REQUEST: '/overtime/add',
    LIST_REQUEST: '/overtime',
    DETAIL: '/overtime/detail',
    LIST_SUPERVISOR: '/overtime/supervisor',
    APPROVAL: '/overtime/approval',
    SUMMARY: '/overtime/summary',
  },
  Password: {
    CHANGE: '/password/change',
  },
  Employees: {
    LIST: '/employee',
    DETAIL: '/employee/detail',
    EDIT: '/employee/edit',
    ADD: '/employee/add',
  },
  Organization: {
    DIVISION_LIST: '/division',
    DEPARTEMENT_LIST: '/department',
  },
  TaskManagement: {
    STAFF: '/task-management',
    ADD: '/task-management/add',
    SUPERVISOR: '/task-management/supervisor',
    EDIT: '/task-management/edit/',
  },
};

export default PATH;
