import React, { useEffect, useMemo, useRef, useState } from 'react';
import Box, { FlexBox } from 'components/Box';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import { useStoreState } from 'global-state/hooks';
import { COLORS } from 'styles/theme';

interface Props {
  buffer: AudioBuffer;
  barWidth: number;
  barSpacing: number;
  barMinHeight: number;
  barBorderRadius: number;
  height: number;
  audioElement: HTMLAudioElement;
}

export const TestWaveform: React.FC<Props> = ({
  buffer,
  barWidth,
  barSpacing,
  barBorderRadius,
  height,
  audioElement
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [bars, setBars] = useState<number[]>([]);
  const [samplesPerBar, setSamplesPerBar] = useState<number>(0);
  const [currP5, setCurrP5] = useState<p5>();

  useEffect(() => {
    if (
      buffer &&
      buffer.getChannelData &&
      containerRef &&
      containerRef.current
    ) {
      // const buff = buffer.getChannelData(0);
      // const containerWidth = containerRef.current.offsetWidth;
      // const barAndSpaceWidth = barWidth + barSpacing;
      // const barsNumber = Math.round(containerWidth / barAndSpaceWidth);
      // const samplesPerBar = Math.round(buff.length / barsNumber);
      // setSamplesPerBar(samplesPerBar);
      // const currBars: number[] = [];
      // (window as any).buffer = buffer;
      // let k = 0;
      // for (let i = 0; i < barsNumber; i++) {
      //   let average = 0;
      //   for (let j = 0; j < samplesPerBar; j++) {
      //     average += Math.abs(buff[k++] ?? 0);
      //   }
      //   currBars.push(Math.round((average * 500) / samplesPerBar));
      // }
      // console.log('FURST');
      // setBars([...currBars]);
    }
  }, [containerRef, buffer]);

  useEffect(() => {
    if (currP5 && audioElement && containerRef.current && bars.length === 0) {
      console.log('setting up on !!!!');
      const ctx = new AudioContext();
      fetch(audioElement.src)
        .then((data) => data.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .then((audioBuffer) => {
          console.log(audioBuffer);
          if (containerRef.current) {
            const buff = audioBuffer.getChannelData(0);
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
            console.log('FURST');
            setBars([...currBars]);
          }
        })
        .catch((e) => console.error(e));

      const loop = () => {
        const time = audioElement.currentTime;
        const duration = audioElement.duration;
        if (time) {
          currP5.clear();
          currP5.noStroke();
          currP5.fill(COLORS.accentSecondary100);

          // bars.forEach((bar, index) => {
          //   currP5.rect(index * (barWidth + barSpacing), 0, barWidth, bar);
          // });

          // const currPosition = Math.round(
          //   (time / duration) * (containerRef.current?.offsetWidth || 0)
          // );

          const currPosition =
            (time / duration) * (containerRef.current?.offsetWidth || 0);

          currP5.rect(
            currPosition,
            0,
            2,
            containerRef.current?.clientHeight || 0
          );
        }
        requestAnimationFrame(loop);
      };
      loop();
    }
  }, [currP5, containerRef]);

  useEffect(() => {
    if (containerRef.current && cursorRef.current && !currP5) {
      const sketch = function (p) {
        p.setup = function () {
          p.createCanvas(
            containerRef?.current?.getBoundingClientRect().width,
            containerRef?.current?.getBoundingClientRect().height
          );

          // bars.forEach((bar, index) => {
          //   p.rect(index * (barWidth + barSpacing), 0, barWidth, bar);
          // });
        };
      };
      const x = new p5(sketch, cursorRef.current);
      setCurrP5(x);
    }
  }, [cursorRef, containerRef, bars]);

  const barsRendered = useMemo(() => {
    return (
      bars?.map((barHeight, i) => {
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
      }) ?? undefined
    );
  }, [bars]);

  return (
    <Box>
      <FlexBox
        height={height}
        ref={containerRef}
        justifyContent='center'
        alignItems='center'
        position='relative'
        onClick={(e) => {
          if (!containerRef.current || !audioElement) return;
          const containerPosition =
            containerRef?.current?.getBoundingClientRect().left ?? 0;
          const relativePosition = e.nativeEvent.pageX - containerPosition;
          console.log(containerPosition);
          console.log(e.nativeEvent.pageX);
          console.log(relativePosition);
          const ratio = relativePosition / containerRef.current.offsetWidth;
          audioElement.currentTime = ratio * audioElement.duration;
        }}
      >
        {barsRendered}

        <Box
          position='absolute'
          width='100%'
          height='100%'
          ref={cursorRef}
        ></Box>
      </FlexBox>
    </Box>
  );
};

export default TestWaveform;
