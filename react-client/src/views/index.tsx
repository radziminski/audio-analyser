import { ROUTES } from 'constants/routes';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import AnalyserView from './dashboard/analyser';
import DashboardView from './dashboard';
import ProjectsView from './dashboard/projects';
import HomeView from './home';

export const AppRoutes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.ROOT} exact>
          <Redirect to={ROUTES.DASHBOARD_ANALYSER} />
        </Route>
        <Route path={ROUTES.DASHBOARD}>
          <DashboardView />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
