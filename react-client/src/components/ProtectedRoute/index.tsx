import { useStoreActions, useStoreState } from 'global-state/hooks';
import React from 'react';
import { Route, RouteProps } from 'react-router';

type Props = RouteProps;

export const ProtectedRoute: React.FC<Props> = ({ ...props }) => {
  const { authError, isLoading, isAuthenticated } = useStoreState(
    (store) => store.auth
  );

  const { register, setError } = useStoreActions((store) => store.auth);

  return <Route {...props} />;
};

export default ProtectedRoute;
