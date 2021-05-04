import Box, { FlexBox } from 'components/Box';
import { Heading2, Heading3, Paragraph } from 'components/Text';
import React from 'react';
import { FONT_WEIGHTS } from 'styles/theme';
import LoginForm from './parts';

const LoginView: React.FC = () => {
  return (
    <FlexBox flexDirection='column' maxWidth='600px'>
      <Heading2 fontSize='2rem' fontWeight={FONT_WEIGHTS.medium}>
        Login
      </Heading2>

      <Box marginTop='4rem'>
        <Heading3 fontSize='1.2rem' fontWeight={FONT_WEIGHTS.semiBold}>
          Login to your account
        </Heading3>
      </Box>

      <Box marginTop='2rem' marginBottom='1rem'>
        <Paragraph fontSize='1rem'>
          Welcome back to Audio Analyser! Please provide your credentials to
          login into your account. If you don&apos;t have the account register
          here.
        </Paragraph>
      </Box>

      <LoginForm />
    </FlexBox>
  );
};

export default LoginView;
