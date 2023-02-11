import { lazy } from 'react';

import constants from '../constants';

const { Accessibility, PATH } = constants;

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Forms = lazy(() => import('../pages/Forms'));
const Cards = lazy(() => import('../pages/Cards'));
const Charts = lazy(() => import('../pages/Charts'));
const Buttons = lazy(() => import('../pages/Buttons'));
const Modals = lazy(() => import('../pages/Modals'));
const Tables = lazy(() => import('../pages/Tables'));
const Page404 = lazy(() => import('../pages/404'));
const Blank = lazy(() => import('../pages/Blank'));
const ReimbursementRequest = lazy(() => import('../pages/reimbursement/ReimbursementRequest'));

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
    accessibility: Accessibility.ALL,
  },
  {
    path: '/forms',
    component: Forms,
    accessibility: Accessibility.SUPERVISOR,
  },
  {
    path: '/cards',
    component: Cards,
    accessibility: Accessibility.ADMIN,
  },
  {
    path: '/charts',
    component: Charts,
    accessibility: Accessibility.STAFF,
  },
  {
    path: '/buttons',
    component: Buttons,
    accessibility: Accessibility.ALL,
  },
  {
    path: '/modals',
    component: Modals,
    accessibility: Accessibility.ALL,
  },
  {
    path: '/tables',
    component: Tables,
    accessibility: Accessibility.ALL,
  },
  {
    path: '/404',
    component: Page404,
    accessibility: Accessibility.ALL,
  },
  {
    path: '/blank',
    component: Blank,
    accessibility: Accessibility.ALL,
  },
  {
    path: PATH.Reimbursement.ADD_REQUEST,
    component: ReimbursementRequest,
    accessibility: Accessibility.STAFF,
  },
];

export default routes;
