import ProtectedRoute from 'components/ProtectedRoute';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AuthView from './auth';
import DashboardView from './dashboard';
export const AppRoutes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.ROOT} exact>
          <Redirect to={ROUTES.DASHBOARD} />
        </Route>
        <Route path={ROUTES.AUTH}>
          <AuthView />
        </Route>
        <ProtectedRoute path={ROUTES.DASHBOARD}>
          <DashboardView />
        </ProtectedRoute>
      </Switch>
    </>
  );
};

export default AppRoutes;
