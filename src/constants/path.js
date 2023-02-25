const PATH = {
  Login: '/login',
  Dashboard: '/dashboard',
  Reimbursement: {
    ADD_REQUEST: '/reimbursement/add',
    LIST_REQUEST: '/reimbursement',
    DETAIL: '/reimbursement/detail',
    LIST_ADMIN: '/reimbursement/admin',
    APPROVAL: '/reimbursement/approval',
    SUMMARY: '/reimbursement/summary',
  },
  Overtime: {
    ADD_REQUEST: '/overtime/add',
    LIST_REQUEST: '/overtime',
    DETAIL: '/overtime/detail',
    LIST_ADMIN: '/overtime/admin',
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
};

export default PATH;
