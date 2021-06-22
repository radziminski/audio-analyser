import Box, { Center } from '~/components/Box';
import { Heading2 } from '~/components/Text';
import React from 'react';
import { COLORS } from '~/styles/theme';

interface Props {
  light?: boolean;
}

export const GlobalMessageView: React.FC<Props> = ({ light, children }) => {
  return (
    <Center
      width='100%'
      height='100vh'
      background={light ? COLORS.white : COLORS.background20}
    >
      <Box maxWidth='800px' textAlign='center' width='100%'>
        <Heading2
          color={light ? COLORS.black : COLORS.white}
          fontSize='1.4rem'
          fontWeight={400}
        >
          {children}
        </Heading2>
      </Box>
    </Center>
  );
};

export default GlobalMessageView;
