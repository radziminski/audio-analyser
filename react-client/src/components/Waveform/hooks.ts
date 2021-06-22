import { useAnimationFrameLoop } from '../../hooks/useAnimationFrameLoop/index';
import { COLORS } from '../../styles/theme';
import { useCanvasDrawer } from '~/hooks/useCanvasDrawer';
import { useEffect, useState, useCallback } from 'react';
import { useElementDimensions } from '~/hooks/useElementDimensions';

const PASSED_COLOR = COLORS.accentSecondary100;

export const useCalculatePeaks = <T extends HTMLElement | null>(
  audioBuffer: AudioBuffer | null | undefined,
  barWidth: number,
  barSpacing: number,
  container: React.MutableRefObject<T>
) => {
  const [peaks, setPeaks] = useState<number[]>();
  const [samplesPerBar, setSamplesPerBar] = useState<number>();

  const { dimensionsReady, width, height } = useElementDimensions(
    container,
    true,
    100
  );

  useEffect(() => {
    if (!dimensionsReady || !width || !height || !audioBuffer) return;

    const buff = audioBuffer.getChannelData(0);
    const barAndSpaceWidth = barWidth + barSpacing;
    const barsNumber = Math.round(width / barAndSpaceWidth);

    const samplesPerBar = Math.round(buff.length / barsNumber);
    setSamplesPerBar(samplesPerBar);

    const currBars: number[] = [];
    let sample = 0;
    for (let bar = 0; bar < barsNumber; bar++) {
      let average = 0;
      for (let sampleInBar = 0; sampleInBar < samplesPerBar; sampleInBar++) {
        average += Math.abs(buff[sample++] ?? 0);
      }
      currBars.push(Math.round((average * height) / samplesPerBar));
    }
    const highestBar = Math.max(...currBars);
    const barMultiplier = height / highestBar;

    setPeaks([...currBars.map((bar) => bar * barMultiplier)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBuffer, barWidth, barSpacing, dimensionsReady, width]);

  return {
    peaks,
    samplesPerBar
  };
};

export const useCursorDrawer = <T extends HTMLElement | null>(
  cursorContainerRef: React.MutableRefObject<T>,
  audioElement: HTMLAudioElement,
  cursorWidth = 2
) => {
  const { canvasDrawer, ready } = useCanvasDrawer(cursorContainerRef);
  const { height, width, dimensionsReady } = useElementDimensions(
    cursorContainerRef,
    true,
    50
  );

  useEffect(() => {
    if (!canvasDrawer || !ready || !dimensionsReady) return;

    canvasDrawer.fill(PASSED_COLOR);
    canvasDrawer.noStroke();

    canvasDrawer.rect(0, 0, 2, height || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasDrawer, ready, dimensionsReady]);

  const cursorAnimationFunction = useCallback(() => {
    if (
      !(
        canvasDrawer &&
        ready &&
        audioElement &&
        cursorContainerRef.current &&
        width &&
        height
      )
    )
      return;

    const time = audioElement.currentTime || 0;
    const duration = audioElement.duration;

    if (time || time === 0) {
      canvasDrawer.clear();
      canvasDrawer.noStroke();
      canvasDrawer.fill(PASSED_COLOR);

      let currPosition = (time / duration) * width;

      if (currPosition >= width - cursorWidth)
        currPosition = width - cursorWidth;

      canvasDrawer.rect(currPosition, 0.5, cursorWidth, height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasDrawer, audioElement, cursorContainerRef]);

  useAnimationFrameLoop(cursorAnimationFunction);
};

export const useBarsDrawer = <T extends HTMLElement | null>(
  barsContainerRef: React.MutableRefObject<T>,
  audioElement: HTMLAudioElement,
  peaks: number[],
  barWidth: number,
  barSpacing: number,
  borderRadius = 0
) => {
  const { ready, canvasDrawer } = useCanvasDrawer(barsContainerRef);
  const { height, width, dimensionsReady } = useElementDimensions(
    barsContainerRef,
    true,
    50
  );

  const barsAnimationFunction = useCallback(() => {
    if (
      !(
        barsContainerRef.current &&
        ready &&
        canvasDrawer &&
        dimensionsReady &&
        width &&
        height
      )
    )
      return;
    canvasDrawer.clear();

    const time = audioElement.currentTime || 0;
    const duration = audioElement.duration;
    const currPosition = Math.ceil((time / duration) * width);

    for (let peakNum = 0; peakNum < peaks.length; peakNum++) {
      const peak = peaks[peakNum];

      for (let line = 0; line < barWidth; line++) {
        const positionX = peakNum * barWidth + barSpacing * peakNum + line;
        if (positionX > currPosition)
          canvasDrawer.stroke(
            COLORS.white
          );
        else
          canvasDrawer.stroke(
            PASSED_COLOR
          );
        let actualHeight = height - borderRadius;
        if (line < borderRadius || line > barWidth - borderRadius)
          actualHeight = height;

        const startY = Math.round((actualHeight - peak) / 2);
        const endY = height - startY;

        canvasDrawer.line(positionX, startY, positionX, endY);
      }
    }
  }, [canvasDrawer, audioElement, barsContainerRef, dimensionsReady]);

  useAnimationFrameLoop(barsAnimationFunction);
};
