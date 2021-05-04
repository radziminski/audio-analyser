import Box from 'components/Box';
import Logo from 'components/Logo';
import { Heading2, Paragraph } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Route, Switch } from 'react-router';
import { COLORS, FONT_WEIGHTS } from 'styles/theme';
import RegisterView from './register';
import LoginView from './login';
import { Container, LeftBar, RightBar } from './parts';

export const AuthView: React.FC = () => {
  return (
    <Container>
      <LeftBar>
        <Box position='absolute' left='4rem' top='4rem'>
          <Logo />
        </Box>
        <Box position='absolute' left='4rem' top='40%' width='75%'>
          <Heading2
            color={COLORS.white}
            fontWeight={FONT_WEIGHTS.medium}
            fontSize='2.2rem'
          >
            Welcome to Audio Analyser!
          </Heading2>
          <Box marginTop='1rem'>
            <Paragraph
              lineHeight='150%'
              color={COLORS.white}
              fontWeight={FONT_WEIGHTS.extraLight}
            >
              Consectetur cupidatat velit esse laborum enim minim consequat
              magna voluptate ullamco amet labore irure deserunt. Cupidatat
              magna nulla do excepteur velit. Proident minim dolor qui cupidatat
              commodo aliquip aliquip nulla in.
            </Paragraph>
          </Box>
        </Box>
        <Box position='absolute' left='4rem' top='4rem'>
          <Logo />
        </Box>
      </LeftBar>
      <RightBar>
        <Switch>
          <Route path={ROUTES.AUTH_LOGIN} component={LoginView} />
          <Route path={ROUTES.AUTH_REGISTER} component={RegisterView} />
        </Switch>
      </RightBar>
    </Container>
  );
};

export default AuthView;
