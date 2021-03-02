import React, { useEffect, useRef, useState } from 'react';
import Box, { FlexBox } from 'components/Box';
import { getWavBytes } from 'utils/audio-convertion';

interface Props {
  buffer: AudioBuffer;
  barWidth: number;
  barSpacing: number;
  barMinHeight: number;
  barBorderRadius: number;
  height: number;
}

export const TestWaveform: React.FC<Props> = ({
  buffer,
  barWidth,
  barSpacing,
  barBorderRadius
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bars, setBars] = useState<number[]>([]);
  const [cursorXPosition, setCursorXPosition] = useState<number>(0);
  const [samplesPerBar, setSamplesPerBar] = useState<number>(0);
  const sampleRate = 48000;

  useEffect(() => {
    if (
      buffer &&
      buffer.getChannelData &&
      containerRef &&
      containerRef.current
    ) {
      const buff = buffer.getChannelData(0);
      const containerWidth = containerRef.current.offsetWidth;
      const barAndSpaceWidth = barWidth + barSpacing;
      const barsNumber = Math.round(containerWidth / barAndSpaceWidth);
      const samplesPerBar = Math.round(buff.length / barsNumber);
      setSamplesPerBar(samplesPerBar);
      const currBars: number[] = [];
      (window as any).buffer = buffer;
      let k = 0;
      for (let i = 0; i < barsNumber; i++) {
        let average = 0;
        for (let j = 0; j < samplesPerBar; j++) {
          average += Math.abs(buff[k++] ?? 0);
        }
        currBars.push(Math.round((average * 500) / samplesPerBar));
      }
      setBars([...currBars]);
    }
  }, [containerRef, buffer]);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCursorXPosition((prevPosition) => prevPosition + 1);
    //   const containerPosition = containerRef?.current?.getBoundingClientRect();
    //   if (cursorXPosition > (containerPosition?.width ?? 0))
    //     clearInterval(interval);
    // }, 50);
  }, [cursorXPosition]);

  return (
    <Box>
      <FlexBox
        ref={containerRef}
        justifyContent='center'
        alignItems='center'
        position='relative'
        onClick={(e) => {
          const containerPosition =
            containerRef?.current?.getBoundingClientRect().left ?? 0;
          const relativePosition = e.nativeEvent.pageX - containerPosition;
          console.log(containerPosition);
          console.log(e.nativeEvent.pageX);
          console.log(relativePosition);
          setCursorXPosition(relativePosition);
        }}
        onDrag={(e) => {
          const containerPosition =
            containerRef?.current?.getBoundingClientRect().left ?? 0;
          const relativePosition = e.nativeEvent.pageX - containerPosition;
          console.log(containerPosition);
          console.log(e.nativeEvent.pageX);
          console.log(relativePosition);
          setCursorXPosition(relativePosition);
        }}
      >
        {bars?.map((barHeight, i) => {
          return (
            <Box
              key={i}
              height={barHeight}
              width={`${barWidth}px`}
              marginRight={`${barSpacing}px`}
              background='red'
              borderRadius={barBorderRadius}
            />
          );
        }) ?? undefined}
        <Box
          height='100%'
          width='1px'
          background='pink'
          position='absolute'
          top={0}
          left={`${cursorXPosition}px`}
          draggable
        ></Box>
      </FlexBox>
    </Box>
  );
};

export default TestWaveform;
