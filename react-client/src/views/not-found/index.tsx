import Anchor from 'components/Anchor';
import Box, { Center } from 'components/Box';
import { Heading2 } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { COLORS } from 'styles/theme';

interface Props {
  light?: boolean;
}

export const NotFoundView: React.FC<Props> = ({ light }) => {
  return (
    <Center
      width='100%'
      height='100vh'
      background={light ? COLORS.white : COLORS.background20}
    >
      <Box maxWidth='800px' textAlign='center'>
        <Heading2
          color={light ? COLORS.black : COLORS.white}
          fontSize='1.4rem'
          fontWeight={400}
        >
          Page not found. Login or register{' '}
          <Anchor to={ROUTES.AUTH_LOGIN}>here.</Anchor>
        </Heading2>
      </Box>
    </Center>
  );
};

export default NotFoundView;
