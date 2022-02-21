import React, { useEffect, useRef, useState } from 'react';

import AudioTimer from '~/components/AudioTimer';
import Box, { FlexBox } from '~/components/Box';
import Icon from '~/components/Icon';
import VolumeSlider from '~/components/VolumeSlider';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import { usePlayOnSpace } from '~/hooks';
import audioService from '~/services/AudioService';

import { Container, IconContainer } from './parts';

const ICON_SIZE_SMALL = 24;
const ICON_SIZE_BIG = 34;

export const AudioControlBar: React.FC = () => {
  const [displayedCurrTime, setDisplayedCurrTime] = useState(0);
  const currTimeCheckerInterval = useRef<NodeJS.Timeout>();

  const { duration, isPlaying, currSource } = useStoreState(
    (state) => state.audio
  );

  const { play, pause, setCurrTime } = useStoreActions(
    (actions) => actions.audio
  );

  usePlayOnSpace(
    () => play(),
    () => pause(),
    isPlaying
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
  }, [isPlaying]);

  useEffect(() => {
    setDisplayedCurrTime(audioService?.audioElement?.currentTime);
  }, []);

  const goForward = () => {
    if (audioService) setCurrTime(audioService.audioElement.duration);
  };
  const goBackward = () => {
    setCurrTime(0);
  };

  if (!currSource) return null;

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
