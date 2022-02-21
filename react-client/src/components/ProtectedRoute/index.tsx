import React, { useCallback, useEffect, useState } from 'react';
import { Route, RouteProps, useHistory } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import RequestService from '~/services/RequestService';
import LoadingView from '~/views/loading';

type Props = RouteProps;

export const ProtectedRoute: React.FC<Props> = (props) => {
  const history = useHistory();

  const {
    ui: { closeModal },
    auth: { logout: stateLogout },
    project: { clearProjects },
    user: { clear: clearUser, fetchUser },
    audio: { clear: clearAudio }
  } = useStoreActions((store) => store);

  const {
    auth: { isAuthenticated },
    user: { user }
  } = useStoreState((store) => store);

  const onLogout = useCallback(() => {
    closeModal();
    clearProjects();
    clearUser();
    clearAudio();
    clearProjects();
    stateLogout();
    history.push(ROUTES.AUTH_LOGIN);
  }, [closeModal, clearProjects, clearProjects, clearUser, clearAudio, stateLogout, history]);

  useEffect(() => {
    RequestService.setLogoutOnUnauthorizedInterceptor(onLogout);
  }, [onLogout]);


  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) onLogout();
  }, [isAuthenticated, onLogout]);

  const getMe = useCallback(async () => {
    try {
      await fetchUser();
    } catch (error) {
      if (error.response?.status === 401) onLogout();
      else
        setError(
          'There was a problem with accessing the servers. Reload the page to try again.'
        );
    }
  }, [fetchUser, onLogout, setError]);

  useEffect(() => {
    if (!user) getMe();
  }, [isAuthenticated, getMe, user]);

  if (isAuthenticated && user) return <Route {...props} />;

  return <LoadingView error={error} />;
};

export default ProtectedRoute;
