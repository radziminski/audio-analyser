import React, { useCallback, useMemo, useRef } from 'react';
import Box, { FlexBox } from 'components/Box';
import { useElementDimensions } from 'hooks';
import { useCalculatePeaks, useCursorDrawer } from './hooks';
import { Container, Timeline, WaveformContainer } from './parts';

interface Props {
  audioBuffer: AudioBuffer | null | undefined;
  isLoadingAudioBuffer: boolean;
  didLoadAudioBuffer: boolean;
  barWidth: number;
  barSpacing: number;
  barMinHeight: number;
  barBorderRadius: number;
  height: number;
  audioElement: HTMLAudioElement;
}

export const Waveform: React.FC<Props> = ({
  barWidth,
  barSpacing,
  barBorderRadius,
  height,
  audioElement,
  audioBuffer
  // isLoadingAudioBuffer,
  // didLoadAudioBuffer
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    left: containerLeft,
    width: containerWidth,
    dimensionsReady
  } = useElementDimensions(containerRef, true, 50);

  useCursorDrawer(cursorContainerRef, audioElement);

  const { peaks } = useCalculatePeaks(
    audioBuffer,
    barWidth,
    barSpacing,
    containerRef
  );

  const barsRendered = useMemo(() => {
    return (
      peaks?.map((barHeight, i) => {
        return (
          <Box
            key={i}
            height={barHeight}
            width={`${barWidth}px`}
            marginRight={`${barSpacing}px`}
            background='white'
            borderRadius={barBorderRadius}
          />
        );
      }) ?? null
    );
  }, [peaks]);

  const onWaveformClicked = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (
        !containerRef.current ||
        !audioElement ||
        !dimensionsReady ||
        !containerLeft ||
        !containerWidth
      )
        return;
      const containerPosition = containerLeft;
      const relativePosition = e.nativeEvent.pageX - containerPosition;

      const ratio = relativePosition / containerWidth;
      audioElement.currentTime = ratio * audioElement.duration;
    },
    [
      containerRef.current,
      audioElement,
      dimensionsReady,
      containerLeft,
      containerWidth
    ]
  );

  return (
    <Container>
      <WaveformContainer>
        <FlexBox
          height={height}
          ref={containerRef}
          justifyContent='center'
          alignItems='center'
          position='relative'
          onClick={onWaveformClicked}
        >
          {barsRendered}
          <Box
            position='absolute'
            width='100%'
            height='100%'
            ref={cursorContainerRef}
          ></Box>
        </FlexBox>
      </WaveformContainer>
      <Timeline
        containerWidth={containerWidth || 0}
        height={14}
        duration={audioElement.duration}
      />
    </Container>
  );
};

export default Waveform;
