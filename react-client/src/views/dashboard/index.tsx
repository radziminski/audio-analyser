import React from 'react';
import { ROUTES } from '~/constants/routes';
import NavPanel from '~/components/NavPanel';
import { Redirect, Route, Switch } from 'react-router';
import DashboardHomeView from './dashboard-home';
import AnalyserView from './analyser';
import ProjectsView from './projects';
import ProjectView from './project';
import NotFoundView from '~/views/not-found';
import Box from '~/components/Box';

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
        <Route path={ROUTES.DASHBOARD_PROJECTS} exact>
          <ProjectsView />
        </Route>
        <Route path={ROUTES.DASHBOARD_PROJECT}>
          <ProjectView />
        </Route>
        <Route>
          <Box marginLeft='300px'>
            <NotFoundView />
          </Box>
        </Route>
      </Switch>
    </>
  );
};

export default DashboardView;
