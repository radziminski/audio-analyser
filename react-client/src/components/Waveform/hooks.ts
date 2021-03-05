import { useAnimationFrameLoop } from '../../hooks/useAnimationFrameLoop/index';
import { COLORS } from '../../styles/theme';
import { useCanvasDrawer } from 'hooks/useCanvasDrawer';
import { useEffect, useState, useCallback } from 'react';
import { useElementDimensions } from 'hooks/useElementDimensions';

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
  }, [audioBuffer, barWidth, barSpacing, dimensionsReady, width]);

  return {
    peaks,
    samplesPerBar
  };
};

export const useCursorDrawer = <T extends HTMLElement | null>(
  cursorContainerRef: React.MutableRefObject<T>,
  audioElement: HTMLAudioElement
) => {
  const { canvasDrawer, ready } = useCanvasDrawer(cursorContainerRef);
  const { height, dimensionsReady } = useElementDimensions(cursorContainerRef);

  useEffect(() => {
    if (!canvasDrawer || !ready || !dimensionsReady) return;

    canvasDrawer.fill(COLORS.accentSecondary100);
    canvasDrawer.noStroke();

    canvasDrawer.rect(0, 0, 2, height || 0);
  }, [canvasDrawer, ready, dimensionsReady]);

  const cursorAnimationFunction = useCallback(() => {
    if (canvasDrawer && ready && audioElement && cursorContainerRef.current) {
      const time = audioElement.currentTime || 0;
      const duration = audioElement.duration;

      if (time) {
        canvasDrawer.clear();
        canvasDrawer.noStroke();
        canvasDrawer.fill(COLORS.accentSecondary100);

        const currPosition =
          (time / duration) * (cursorContainerRef.current?.offsetWidth || 0);

        canvasDrawer.rect(
          currPosition,
          0,
          2,
          cursorContainerRef.current?.clientHeight || 0
        );
      }
    }
  }, [canvasDrawer, audioElement, cursorContainerRef]);

  useAnimationFrameLoop(cursorAnimationFunction);
};
