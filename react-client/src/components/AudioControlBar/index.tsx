import React from 'react';
import { Container } from './parts';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import Icon from 'components/Icon';
import Box from 'components/Box';
import AudioTimer from 'components/AudioTimer';

export const AudioControlBar: React.FC = () => {
  const { isPlaying, currTime } = useStoreState((state) => state.audio);
  const { play, pause } = useStoreActions((actions) => actions.audio);

  return (
    <Container>
      <AudioTimer />

      {isPlaying ? (
        <Icon icon={'pause-circle'} onClick={() => pause()} />
      ) : (
        <Icon icon={'play-circle'} onClick={() => play()} />
      )}
      <Box width={100}></Box>
    </Container>
  );
};

export default AudioControlBar;
