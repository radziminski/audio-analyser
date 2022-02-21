import React from 'react';

import Box from '~/components/Box';
import { formatTime } from '~/utils/time';

import { Container } from './parts';

interface Props {
  currTime: number;
  duration: number;
}

export const AudioTimer: React.FC<Props> = ({ currTime, duration }) => {
  return (
    <Container>
      <Box width={46}>{formatTime(currTime)}</Box>
      <Box width={12} style={{ fontSize: 12 }}>
        /
      </Box>
      <Box width={46}>{formatTime(duration)}</Box>
    </Container>
  );
};

export default AudioTimer;
