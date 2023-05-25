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
    ASSIGN: '/task-management/assign',
    BOD_TODAY: '/task-management/bod/today',
    BOD_ALL: '/task-management/bod/all',
  },
  Attendance: {
    SCAN: '/attendance/report/scan',
    MISSED_SCAN: '/attendance/report/missed-scan',
  },
  Payroll: {
    FIX_RATE: '/payroll/fix-rate',
    ADMIN: '/payroll/admin',
    ADD: '/payroll/add',
    PAYROLL: '/payroll',
    DETAIL: '/payroll/detail',
    EDIT: '/payroll/edit',
  },
};

export default PATH;
