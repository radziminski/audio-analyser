import React from 'react';
import DashboardContent from 'components/DashboardContent';
import { ROUTES } from 'constants/routes';
import NavPanel from 'components/NavPanel';
import { Redirect, Route, Switch } from 'react-router';
import DashboardHomeView from './dashboard-home';
import AnalyserView from './analyser';
import ProjectsView from './projects';

interface Props {
  title?: string;
  subTitles?: string[];
}

const DashboardView: React.FC<Props> = ({ children, title, subTitles }) => {
  console.log('in dashboard view');
  return (
    <>
      <NavPanel />

      <Switch>
        <Route path={ROUTES.DASHBOARD} exact>
          <Redirect to={ROUTES.DASHBOARD_ANALYSER} />
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
