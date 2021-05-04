import React from 'react';
import { ROUTES } from 'constants/routes';
import NavPanel from 'components/NavPanel';
import { Redirect, Route, Switch } from 'react-router';
import DashboardHomeView from './dashboard-home';
import AnalyserView from './analyser';
import ProjectsView from './projects';

const DashboardView: React.FC = () => {
  return (
    <>
      <NavPanel />

      <Switch>
        <Route path={ROUTES.DASHBOARD} exact>
          <Redirect to={ROUTES.DASHBOARD_HOME} />
        </Route>
        <Route path={ROUTES.DASHBOARD_HOME}>
          <DashboardHomeView />
        </Route>
        <Route path={ROUTES.DASHBOARD_ANALYSER}>
          <AnalyserView />
        </Route>
        <Route path={ROUTES.DASHBOARD_PROJECTS}>
          <ProjectsView />
        </Route>
      </Switch>
    </>
  );
};

export default DashboardView;
