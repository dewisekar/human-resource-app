const URL = {
  Login: {
    LOGIN_URL: '/login',
  },
  User: {
    USER_URL: '/user/',
    USER_ALL_URL: '/user/all',
    USE_DETAIL_URL: '/user/detail/',
    USER_LEVEL_ALL_URL: '/user/level/all',
    BANK_URL: '/user/bank/all',
    USER_SUBORDINATE_URL: '/user/subordinate',
    USER_BIRTHDAYS_THIS_MONTH: '/user/birthdays/this-month',
  },
  Reimbursement: {
    REIMBURSEMENT_URL: '/reimbursement',
    REIMBURSEMENT_DETAIL_URL: '/reimbursement/detail/',
    REIMBURSEMENT_ADMIN_DETAIL_URL: '/admin/reimbursement/detail/',
    REIMBURSEMENT_ADMIN_URL: '/admin/reimbursement',
    APPROVE_URL: '/admin/reimbursement/approve/',
    DOWNLOAD_PROOF_URL: '/reimbursement/proof/download/',
    TYPE_URL: '/reimbursement/type/',
    SUMMARY: '/reimbursement/summary',
    TYPE_SUMMARY: '/reimbursement/type/summary',
  },
  Overtime: {
    OVERTIME_URL: '/overtime',
    OVERTIME_DETAIL_URL: '/overtime/detail/',
    OVERTIME_ADMIN_DETAIL_URL: '/admin/overtime/detail/',
    OVERTIME_SUPERVISOR_DETAIL_URL: '/supervisor/overtime/detail/',
    OVERTIME_ADMIN_URL: '/admin/overtime',
    OVERTIME_SUPERVISOR_URL: '/supervisor/overtime',
    APPROVE_URL: '/supervisor/overtime/approve/',
    DOWNLOAD_PROOF_URL: '/overtime/proof/download/',
    SUMMARY: '/overtime/summary',
  },
  Password: {
    PASSWORD: '/password',
  },
  Organization: {
    DIVISION_ALL_URL: '/organization/division/all',
    DEPARTMENT_ALL_URL: '/organization/department/all',
    DIVISION_URL: '/organization/division/',
    DEPARTMENT_URL: '/organization/department/',
  },
  TaskManagement: {
    TASK: '/task/',
    DETAIL: '/task/detail/',
    SUPERVISOR: '/task/supervisor',
    ASSIGN: '/task/assign',
    BOD_TODAY: '/admin/task/today',
    BOD_ALL: '/admin/task/all',
    NEWEST_TASK: '/admin/task/newest',
  },
  Attendance: {
    SCAN: '/attendance/report/scan',
    LATE_CHECK_IN: '/attendance/report/late-check-in',
    UNREGISTERED_USER: '/attendance/unregistered-user',
  },
};

export default URL;
