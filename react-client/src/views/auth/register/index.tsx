import Anchor from '~/components/Anchor';
import Box, { FlexBox } from '~/components/Box';
import { Heading2, Heading3, Paragraph } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import React from 'react';
import { FONT_WEIGHTS } from '~/styles/theme';
import RegisterForm from './parts';

export const RegisterView: React.FC = () => {
  return (
    <FlexBox flexDirection='column' maxWidth='600px'>
      <Heading2 fontSize='2rem' fontWeight={FONT_WEIGHTS.medium}>
        Sign up
      </Heading2>

      <Box marginTop='4rem'>
        <Heading3 fontSize='1.2rem' fontWeight={FONT_WEIGHTS.semiBold}>
          Create new account
        </Heading3>
      </Box>

      <Box marginTop='2rem' marginBottom='1rem'>
        <Paragraph fontSize='1rem'>
          Welcome to Audio Analyser! Please provide your email and data to
          create a new account. If you already have a new account login{' '}
          <Anchor to={ROUTES.AUTH_LOGIN}>here.</Anchor>
        </Paragraph>
      </Box>

      <RegisterForm />
    </FlexBox>
  );
};

export default RegisterView;
