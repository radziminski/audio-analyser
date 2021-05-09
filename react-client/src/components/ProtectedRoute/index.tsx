import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect, useState } from 'react';
import { Route, RouteProps, useHistory } from 'react-router';
import LoadingView from 'views/loading';

type Props = RouteProps;

export const ProtectedRoute: React.FC<Props> = (props) => {
  const [error, setError] = useState<string | null>(null);
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
      else
        setError(
          'There was a problem with accessing the servers. Reload the page to try again.'
        );
    }
  };

  useEffect(() => {
    if (!user) getMe();
  }, [isAuthenticated]);

  if (isAuthenticated && user) return <Route {...props} />;

  return <LoadingView error={error} />;
};

export default ProtectedRoute;
