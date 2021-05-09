import ProtectedRoute from 'components/ProtectedRoute';
import { ROUTES } from 'constants/routes';
import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import AuthView from './auth';
import DashboardView from './dashboard';
import RequestService from 'services/RequestService';
import { useStoreActions } from 'global-state/hooks';
import NotFoundView from './not-found';

export const AppRoutes: React.FC = () => {
  const history = useHistory();
  const {
    ui: { closeModal },
    auth: { logout },
    project: { clearProjects },
    user: { clear }
  } = useStoreActions((store) => store);

  const onLogout = useCallback(() => {
    closeModal();
    logout();
    clearProjects();
    clear();
    history.push(ROUTES.AUTH_LOGIN);
  }, [closeModal, logout, clearProjects, clear, history]);

  useEffect(() => {
    RequestService.setLogoutOnUnauthorizedInterceptor(onLogout);
  }, [onLogout]);

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
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
