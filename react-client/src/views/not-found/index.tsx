import Anchor from '~/components/Anchor';
import { ROUTES } from '~/constants/routes';
import React from 'react';
import GlobalMessageView from '../global-message';

interface Props {
  light?: boolean;
}

export const NotFoundView: React.FC<Props> = ({ light }) => {
  return (
    <GlobalMessageView light={light}>
      Page not found. Login or register{' '}
      <Anchor to={ROUTES.AUTH_LOGIN}>here.</Anchor>
    </GlobalMessageView>
  );
};

export default NotFoundView;
