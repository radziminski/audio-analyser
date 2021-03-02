import Box from 'components/Box';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import { Container } from './parts';

const formatTime = (currTime: number): string => {
  let minutes = 0;
  let time = Math.round(currTime);
  while (time >= 60) {
    minutes++;
    time -= 60;
  }
  return `${minutes.toString().length < 2 ? '0' + minutes : minutes}:${
    time.toString().length < 2 ? '0' + time : time
  }`;
};

export const AudioTimer: React.FC = () => {
  const { duration, currTime } = useStoreState((state) => state.audio);

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
