import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Box from '~/components/Box';
import NavPanel from '~/components/NavPanel';
import { ROUTES } from '~/constants/routes';
import NotFoundView from '~/views/not-found';

import AnalyserView from './analyser';
import DashboardHomeView from './home';
import ProjectView from './project';
import ProjectsView from './projects';
import SettingsView from './settings';

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
        <Route path={ROUTES.DASHBOARD_SETTINGS}>
          <SettingsView />
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
