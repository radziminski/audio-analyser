import React, { useCallback, useRef } from 'react';
import Box, { FlexBox } from '~/components/Box';
import { useElementDimensions } from '~/hooks';
import { COLORS } from '~/styles/theme';
import { useBarsDrawer, useCalculatePeaks, useCursorDrawer } from './hooks';
import { Container, Timeline, WaveformContainer } from './parts';

interface Props {
  audioBuffer: AudioBuffer | null | undefined;
  isLoadingAudioBuffer: boolean;
  didLoadAudioBuffer: boolean;
  barWidth: number;
  barSpacing: number;
  barMinHeight: number;
  height: number;
  audioElement: HTMLAudioElement;
}

export const Waveform: React.FC<Props> = ({
  barWidth,
  barSpacing,
  height,
  audioElement,
  audioBuffer
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorContainerRef = useRef<HTMLDivElement | null>(null);
  const barsContainerRef = useRef<HTMLDivElement | null>(null);
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

  useBarsDrawer(
    barsContainerRef,
    audioElement,
    peaks || [],
    barWidth,
    barSpacing
  );

  // == Old bars rendered as react divs
  // const barsRendered = useMemo(() => {
  //   return (
  //     peaks?.map((barHeight, i) => {
  //       return (
  //         <Box
  //           key={i}
  //           height={barHeight}
  //           width={`${barWidth}px`}
  //           marginRight={`${barSpacing}px`}
  //           background='white'
  //           borderRadius={barBorderRadius}
  //         />
  //       );
  //     }) ?? null
  //   );
  // }, [peaks, barBorderRadius, barSpacing, barWidth]);

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
    [audioElement, dimensionsReady, containerLeft, containerWidth]
  );

  return (
    <Container>
      <WaveformContainer>
        <FlexBox
          height={height}
          width='100%'
          ref={containerRef}
          justifyContent='center'
          alignItems='center'
          position='relative'
          onClick={onWaveformClicked}
        >
          <Box
            position='absolute'
            width='100%'
            height='100%'
            ref={barsContainerRef}
          />
          <Box
            position='absolute'
            width='100%'
            height='100%'
            ref={cursorContainerRef}
          />
        </FlexBox>
      </WaveformContainer>
      <Timeline
        duration={audioElement.duration}
        tickHeight={10}
        tickColor={COLORS.white}
        tickOpacity={0.75}
        tickSpacing={13}
        tickWidth={2}
        ticksPerBar={4}
        subTickWidthDifference={1}
        subTickHeightMultiplier={0.5}
        timestampHeight={24}
        timestampColor={COLORS.white}
        timestampFontSize={12}
      />
    </Container>
  );
};

export default Waveform;
