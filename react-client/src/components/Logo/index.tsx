import React from 'react';

import { APP_TITLE } from '~/constants/constants';

import { Container, LogoIcon, LogoText } from './parts';

const Logo: React.FC = () => {
  return (
    <Container>
      <LogoIcon>{APP_TITLE[0]}</LogoIcon>
      <LogoText>{APP_TITLE}</LogoText>
    </Container>
  );
};

export default Logo;
