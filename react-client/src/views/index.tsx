import { ROUTES } from 'constants/routes';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import DashboardView from './dashboard';
export const AppRoutes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.ROOT} exact>
          <Redirect to={ROUTES.DASHBOARD} />
        </Route>
        <Route path={ROUTES.DASHBOARD}>
          <DashboardView />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
