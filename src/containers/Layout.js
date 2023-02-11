import React, {
  useContext, Suspense, useEffect, lazy,
} from 'react';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';
import routes from '../routes';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from './Main';
import PrivateRoute from './PrivateRoute';
import ThemedSuspense from '../components/ThemedSuspense';
import { SidebarContext } from '../context/SidebarContext';

const Page404 = lazy(() => import('../pages/404'));

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => (route.component ? (
                  <PrivateRoute
                    key={i}
                    exact={true}
                    path={route.path}
                    component={route.component}
                    accessibility={route.accessibility}
                  />
              ) : null))}
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  );
}

export default Layout;
