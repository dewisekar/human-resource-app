import { lazy } from 'react';

import constants from '../constants';

const { Accessibility, PATH } = constants;

const Forms = lazy(() => import('../pages/Forms'));
const Cards = lazy(() => import('../pages/Cards'));
const Charts = lazy(() => import('../pages/Charts'));
const Buttons = lazy(() => import('../pages/Buttons'));
const Modals = lazy(() => import('../pages/Modals'));
const Tables = lazy(() => import('../pages/Tables'));
const Page404 = lazy(() => import('../pages/404'));
const Blank = lazy(() => import('../pages/Blank'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const ReimbursementRequest = lazy(() => import('../pages/ReimbursementRequest/ReimbursementRequest'));
const ReimbursementList = lazy(() => import('../pages/ReimbursementList/ReimbursementList'));
const ReimbursementDetail = lazy(() => import('../pages/ReimbursementDetail/ReimbursementDetail'));
const ReimbursementApproval = lazy(() => import('../pages/ReimbursementApproval/ReimbursementApproval'));
const ReimbursementListAdmin = lazy(() => import('../pages/ReimbursementListAdmin/ReimbursementListAdmin'));
const ReimbursementSummaryAdmin = lazy(() => import('../pages/ReimbursementSummaryAdmin/ReimbursementSummaryAdmin'));
const OvertimeRequest = lazy(() => import('../pages/OvertimeRequest/OvertimeRequest'));
const OvertimeList = lazy(() => import('../pages/OvertimeList/OvertimeList'));
const OvertimeListSupervisor = lazy(() => import('../pages/OvertimeListSupervisor/OvertimeListSupervisor'));
const OvertimeDetail = lazy(() => import('../pages/OvertimeDetail/OvertimeDetail'));
const OvertimeApproval = lazy(() => import('../pages/OvertimeApproval/OvertimeApproval'));
const ChangePassword = lazy(() => import('../pages/ChangePassword/ChangePassword'));
const OvertimeSummaryAdmin = lazy(() => import('../pages/OvertimeSummaryAdmin/OvertimeSummaryAdmin'));
const Employees = lazy(() => import('../pages/Employees/Employees'));
const EmployeeDetail = lazy(() => import('../pages/EmployeeDetail/EmployeeDetail'));
const EmployeeEdit = lazy(() => import('../pages/EmployeeEdit/EmployeeEdit'));
const EmployeeAdd = lazy(() => import('../pages/EmployeeAdd/EmployeeAdd'));
const Divisions = lazy(() => import('../pages/Divisions/Divisions'));
const Departments = lazy(() => import('../pages/Departments/Departments'));
const ReimbursementType = lazy(() => import('../pages/ReimbursementType/ReimbursementType'));
const AdminApprovalOverView = lazy(() => import('../pages/AdminApprovalOverView/AdminApprovalOverView'));
const StaffTaskManagement = lazy(() => import('../pages/StaffTaskManagement/StaffTaskManagement'));
const TaskManagementAdd = lazy(() => import('../pages/TaskManagementAdd/TaskManagementAdd'));
const TaskManagementAssign = lazy(() => import('../pages/TaskManagementAssign/TaskManagementAssign'));
const TaskManagementEdit = lazy(() => import('../pages/TaskManagementEdit/TaskManagementEdit'));
const SupervisorTaskManagement = lazy(() => import('../pages/SupervisorTaskManagement/SupervisorTaskManagement'));
const BodTodayTaskManagement = lazy(() => import('../pages/BodTodayTaskManagement/BodTodayTaskManagement'));
const BodAllTaskManagement = lazy(() => import('../pages/BodAllTaskManagement/BodAllTaskManagement'));
const AttendanceScan = lazy(() => import('../pages/AttendanceScan/AttendanceScan'));
const AttendanceMissedScan = lazy(() => import('../pages/AttendanceMissedScan/AttendanceMissedScan'));

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
    accessibility: [Accessibility.ALL],
  },
  {
    path: '/forms',
    component: Forms,
    accessibility: [Accessibility.SUPERVISOR],
  },
  {
    path: '/cards',
    component: Cards,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: '/charts',
    component: Charts,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: '/buttons',
    component: Buttons,
    accessibility: [Accessibility.ALL],
  },
  {
    path: '/modals',
    component: Modals,
    accessibility: [Accessibility.ALL],
  },
  {
    path: '/tables',
    component: Tables,
    accessibility: [Accessibility.ALL],
  },
  {
    path: '/404',
    component: Page404,
    accessibility: [Accessibility.ALL],
  },
  {
    path: '/blank',
    component: Blank,
    accessibility: [Accessibility.ALL],
  },
  {
    path: PATH.Reimbursement.ADD_REQUEST,
    component: ReimbursementRequest,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.Reimbursement.LIST_REQUEST,
    component: ReimbursementList,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.Reimbursement.DETAIL,
    component: ReimbursementDetail,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.Reimbursement.LIST_ADMIN,
    component: ReimbursementListAdmin,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Reimbursement.SUMMARY,
    component: ReimbursementSummaryAdmin,
    accessibility: [Accessibility.ADMIN, Accessibility.BOD],
  },
  {
    path: PATH.Reimbursement.APPROVAL,
    component: ReimbursementApproval,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Overtime.ADD_REQUEST,
    component: OvertimeRequest,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.Overtime.LIST_REQUEST,
    component: OvertimeList,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.Overtime.DETAIL,
    component: OvertimeDetail,
    accessibility: [Accessibility.STAFF, Accessibility.ADMIN],
  },
  {
    path: PATH.Overtime.LIST_SUPERVISOR,
    component: OvertimeListSupervisor,
    accessibility: [Accessibility.SUPERVISOR],
  },
  {
    path: PATH.Overtime.APPROVAL,
    component: OvertimeApproval,
    accessibility: [Accessibility.SUPERVISOR],
  },
  {
    path: PATH.Overtime.SUMMARY,
    component: OvertimeSummaryAdmin,
    accessibility: [Accessibility.ADMIN, Accessibility.BOD],
  },
  {
    path: PATH.Password.CHANGE,
    component: ChangePassword,
    accessibility: [Accessibility.ALL],
  },
  {
    path: PATH.Employees.LIST,
    component: Employees,
    accessibility: [Accessibility.ADMIN, Accessibility.BOD],
  },
  {
    path: PATH.Employees.DETAIL,
    component: EmployeeDetail,
    accessibility: [Accessibility.ADMIN, Accessibility.BOD],
  },
  {
    path: PATH.Employees.EDIT,
    component: EmployeeEdit,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Employees.ADD,
    component: EmployeeAdd,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Organization.DIVISION_LIST,
    component: Divisions,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Organization.DEPARTEMENT_LIST,
    component: Departments,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Reimbursement.TYPE,
    component: ReimbursementType,
    accessibility: [Accessibility.ADMIN],
  },
  {
    path: PATH.Admin.Summary,
    component: AdminApprovalOverView,
    accessibility: [Accessibility.ADMIN, Accessibility.BOD],
  },
  {
    path: PATH.TaskManagement.STAFF,
    component: StaffTaskManagement,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.TaskManagement.ADD,
    component: TaskManagementAdd,
    accessibility: [Accessibility.STAFF],
  },
  {
    path: PATH.TaskManagement.ASSIGN,
    component: TaskManagementAssign,
    accessibility: [Accessibility.BOD, Accessibility.SUPERVISOR],
  },
  {
    path: PATH.TaskManagement.EDIT,
    component: TaskManagementEdit,
    accessibility: [Accessibility.STAFF, Accessibility.BOD, Accessibility.SUPERVISOR],
  },
  {
    path: PATH.TaskManagement.SUPERVISOR,
    component: SupervisorTaskManagement,
    accessibility: [Accessibility.SUPERVISOR],
  },
  {
    path: PATH.TaskManagement.BOD_TODAY,
    component: BodTodayTaskManagement,
    accessibility: [Accessibility.BOD],
  },
  {
    path: PATH.TaskManagement.BOD_ALL,
    component: BodAllTaskManagement,
    accessibility: [Accessibility.BOD],
  },
  {
    path: PATH.Attendance.SCAN,
    component: AttendanceScan,
    accessibility: [Accessibility.BOD, Accessibility.ADMIN],
  },
  {
    path: PATH.Attendance.MISSED_SCAN,
    component: AttendanceMissedScan,
    accessibility: [Accessibility.BOD, Accessibility.ADMIN],
  },
];

export default routes;
