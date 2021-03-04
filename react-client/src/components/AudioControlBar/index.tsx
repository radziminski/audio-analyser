import React from 'react';
import { Container } from './parts';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import Icon from 'components/Icon';
import Box from 'components/Box';
import AudioTimer from 'components/AudioTimer';

export const AudioControlBar: React.FC = () => {
  const { controller } = useStoreState((state) => state.audio);
  const { play, pause } = useStoreActions((actions) => actions.audio);

  return (
    <Container>
      <AudioTimer />
      <Box cursor='pointer'>
        {controller?.isPlaying ? (
          <Icon size={34} icon={'pause-circle'} onClick={() => pause()} />
        ) : (
          <Icon size={34} icon={'play-circle'} onClick={() => play()} />
        )}
      </Box>
      <Box width={100}></Box>
    </Container>
  );
};

export default AudioControlBar;
