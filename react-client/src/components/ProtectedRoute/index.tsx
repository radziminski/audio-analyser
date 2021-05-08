import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router';
import LoadingView from 'views/loading';

type Props = RouteProps;

export const ProtectedRoute: React.FC<Props> = (props) => {
  const {
    auth: { isAuthenticated },
    user: { user }
  } = useStoreState((store) => store);

  const history = useHistory();

  const {
    user: { fetchUser },
    auth: { logout }
  } = useStoreActions((store) => store);

  const logoutAndRedirectToLogin = () => {
    logout();
    history.push(ROUTES.AUTH_LOGIN);
  };

  useEffect(() => {
    if (!isAuthenticated) logoutAndRedirectToLogin();
  }, [isAuthenticated]);

  const getMe = async () => {
    try {
      await fetchUser();
    } catch (error) {
      if (error.response?.status === 401) logoutAndRedirectToLogin();
      // TODO: Error handling for different erorrs
    }
  };

  useEffect(() => {
    if (!user) getMe();
  }, [isAuthenticated]);

  if (isAuthenticated && user) return <Route {...props} />;

  return <LoadingView />;
};

export default ProtectedRoute;
