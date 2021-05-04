import React from 'react';
import { Route, RouteProps } from 'react-router';

type Props = RouteProps;

export const ProtectedRoute: React.FC<Props> = ({ ...props }) => {
  return <Route {...props} />;
};

export default ProtectedRoute;
