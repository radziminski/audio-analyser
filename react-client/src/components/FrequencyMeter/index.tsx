import AudioService from 'global-state/audio/audioController';
import React, { useEffect, useRef, ReactElement } from 'react';
import Box from 'components/Box';
import { useCanvasDrawer, useAnimationFrameLoop } from 'hooks';
import { sampleToDecibel } from 'utils/audio';
import { COLORS } from 'styles/theme';

const height = 400;

const FrequencyMeter: React.FC = () => {
  const analyser = useRef<AnalyserNode>();
  const container = useRef<HTMLDivElement | null>(null);
  const { canvasDrawer, ready } = useCanvasDrawer(container);

  const getFreq = () => {
    if (!canvasDrawer) return;
    canvasDrawer.clear();

    const currAnalyser = analyser.current;
    const buffer = new Float32Array(currAnalyser?.fftSize || 0);
    currAnalyser?.getFloatFrequencyData(buffer);

    buffer.forEach((sample, sampleNum) => {
      if (sampleNum > 1023) return;

      if (sample === -Infinity || sample === 0) {
        canvasDrawer.stroke(COLORS.accentPrimary100);
        canvasDrawer.fill(COLORS.accentPrimary100);
        return canvasDrawer.rect(sampleNum, height - 1, 1, 1);
      }
      const currSampleDec = (sampleToDecibel(Math.abs(sample)) * height) / 30;
      canvasDrawer.rect(sampleNum, currSampleDec, 1, height - currSampleDec);
    });
  };

  useAnimationFrameLoop(
    getFreq,
    ready && !!analyser.current && !!container.current
  );

  useEffect(() => {
    const currAnalyser = AudioService.createAnalyser();
    currAnalyser.analyserNode.fftSize = 1024;
    analyser.current = currAnalyser.analyserNode;
    console.log(AudioService.buffer?.sampleRate);
    console.log(analyser.current.maxDecibels);
    console.log(analyser.current.minDecibels);
  }, []);

  return (
    <>
      <button onClick={getFreq}>getFeq!</button>
      <Box width={512} height={height} ref={container}>
        {' '}
      </Box>
    </>
  );
};

export default FrequencyMeter;
