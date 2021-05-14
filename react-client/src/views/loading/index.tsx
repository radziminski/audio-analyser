import AlternativeLoader from '~/components/AlternativeLoader';
import Box, { Center } from '~/components/Box';
import { Heading2 } from '~/components/Text';
import React from 'react';
import { COLORS } from '~/styles/theme';

interface Props {
  error?: string | null;
}

export const LoadingView: React.FC<Props> = ({ error }) => {
  return (
    <Center width='100%' height='100vh' background={COLORS.background20}>
      {!error && <AlternativeLoader size={160} />}
      {error && (
        <Box maxWidth='800px' textAlign='center'>
          <Heading2 color={COLORS.white} fontSize='1.4rem' fontWeight={400}>
            {error}
          </Heading2>
        </Box>
      )}
    </Center>
  );
};

export default LoadingView;
