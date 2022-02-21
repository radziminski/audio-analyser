import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import ProtectedRoute from '~/components/ProtectedRoute';
import { ROUTES } from '~/constants/routes';

import AuthView from './auth';
import DashboardView from './dashboard';
import NotFoundView from './not-found';

export const AppRoutes: React.FC = () => {
  return (
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
      <Route>
        <NotFoundView />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
