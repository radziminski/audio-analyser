import React, { useState } from 'react';
import { Container } from './parts';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import Icon from 'components/Icon';
import Box from 'components/Box';
import AudioTimer from 'components/AudioTimer';
import VolumeSlider from 'components/VolumeSlider';

export const AudioControlBar: React.FC = () => {
  const [gainValue, setGainValue] = useState(1);
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
      <Box width={200} overflow='hidden'>
        <VolumeSlider
          min={0}
          max={1}
          value={gainValue}
          step={0.05}
          onChange={(value) => {
            if (controller) controller.masterGainNode.gain.value = value;
            setGainValue(value);
          }}
        />
      </Box>
    </Container>
  );
};

export default AudioControlBar;
