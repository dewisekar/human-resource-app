import React, { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import './components/Datatable/Datatable.css';
import './additional.css';
import 'rc-collapse/assets/index.css';

const Login = lazy(() => import('./pages/Login/Login'));
const AuthenticatedPages = lazy(() => import('./routes/AuthenticatedPages'));
const Page404 = lazy(() => import('./pages/404'));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <AuthenticatedPages/>
          <Route component={Page404} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
