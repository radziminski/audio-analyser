import React, { useEffect, useRef, useState } from 'react';
import { Container, IconContainer } from './parts';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import Icon from 'components/Icon';
import Box, { FlexBox } from 'components/Box';
import AudioTimer from 'components/AudioTimer';
import VolumeSlider from 'components/VolumeSlider';
import audioService from 'global-state/audio/audioController';

const ICON_SIZE_SMALL = 24;
const ICON_SIZE_BIG = 34;

export const AudioControlBar: React.FC = () => {
  const [displayedCurrTime, setDisplayedCurrTime] = useState(0);
  const currTimeCheckerInterval = useRef<NodeJS.Timeout>();

  const { duration, isPlaying } = useStoreState((state) => state.audio);

  const { play, pause, setCurrTime } = useStoreActions(
    (actions) => actions.audio
  );

  useEffect(() => {
    if (isPlaying && audioService) {
      currTimeCheckerInterval.current = setInterval(
        () => setDisplayedCurrTime(audioService.audioElement.currentTime),
        100
      );
    } else {
      currTimeCheckerInterval.current &&
        clearInterval(currTimeCheckerInterval.current);
      currTimeCheckerInterval.current = undefined;
    }

    return () =>
      currTimeCheckerInterval.current &&
      clearInterval(currTimeCheckerInterval.current);
  }, [isPlaying, audioService]);

  const goForward = () => {
    if (audioService) setCurrTime(audioService.audioElement.duration);
  };
  const goBackward = () => {
    setCurrTime(0);
  };

  return (
    <Container>
      <AudioTimer currTime={displayedCurrTime} duration={duration} />
      <FlexBox align-items='center'>
        <IconContainer>
          <Icon
            size={ICON_SIZE_SMALL}
            icon={'skip-backward-fill'}
            onClick={() => goBackward()}
          />
        </IconContainer>
        <Box cursor='pointer'>
          {audioService?.isPlaying ? (
            <Icon
              size={ICON_SIZE_BIG}
              icon={'pause-circle'}
              onClick={() => pause()}
            />
          ) : (
            <Icon
              size={ICON_SIZE_BIG}
              icon={'play-circle'}
              onClick={() => play()}
            />
          )}
        </Box>
        <IconContainer>
          <Icon
            size={ICON_SIZE_SMALL}
            icon={'skip-forward-fill'}
            onClick={() => goForward()}
          />
        </IconContainer>
      </FlexBox>

      <Box width={200} overflow='hidden'>
        <VolumeSlider />
      </Box>
    </Container>
  );
};

export default AudioControlBar;
