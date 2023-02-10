import React, { lazy } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';

const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/authentication/Login'));

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
