import Box, { FlexBox } from 'components/Box';
import Logo from 'components/Logo';
import { Heading2, Paragraph } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { COLORS, FONT_WEIGHTS } from 'styles/theme';
import RegisterView from './register';
import LoginView from './login';
import { Container, LeftBar, RightBar } from './parts';
import { Link } from 'react-router-dom';

export const AuthView: React.FC = () => {
  const location = useLocation();

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
        <FlexBox marginBottom='2rem'>
          <Link to={ROUTES.AUTH_LOGIN}>
            <Box
              background={
                location.pathname === ROUTES.AUTH_LOGIN
                  ? COLORS.primary100
                  : 'transparent'
              }
              border={`1px solid ${COLORS.primary100}`}
              width='1rem'
              height='1rem'
              marginRight='1rem'
              borderRadius='4px'
              cursor='pointer'
            />
          </Link>

          <Link to={ROUTES.AUTH_REGISTER}>
            <Box
              background={
                location.pathname === ROUTES.AUTH_REGISTER
                  ? COLORS.primary100
                  : 'transparent'
              }
              border={`1px solid ${COLORS.primary100}`}
              width='1rem'
              height='1rem'
              borderRadius='4px'
              cursor='pointer'
            />
          </Link>
        </FlexBox>
        <Switch>
          <Route path={ROUTES.AUTH_LOGIN} component={LoginView} />
          <Route path={ROUTES.AUTH_REGISTER} component={RegisterView} />
        </Switch>
      </RightBar>
    </Container>
  );
};

export default AuthView;
