import AudioService from 'global-state/audio/audioController';
import React, { useEffect, useRef } from 'react';
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
    if (!analyser.current) return;
    canvasDrawer.clear();

    const currAnalyser = analyser.current;
    const buffer = new Float32Array(currAnalyser.fftSize);
    currAnalyser.getFloatFrequencyData(buffer);

    // console.log(buffer[4]);
    // console.log(sampleToDecibel(Math.abs(buffer[4])));
    const barWidth = 1;

    for (
      let sampleNum = 1;
      sampleNum < currAnalyser?.fftSize / 2;
      sampleNum++
    ) {
      const sample = (buffer[sampleNum] + buffer[sampleNum - 1]) / 2;

      if (sample === -Infinity || sample === 0) {
        canvasDrawer.stroke(COLORS.accentPrimary100);
        canvasDrawer.fill(COLORS.accentPrimary100);
        return canvasDrawer.rect(sampleNum * barWidth, height - 1, barWidth, 1);
      }
      const currSampleDec = (sampleToDecibel(Math.abs(sample)) * height) / 23;
      canvasDrawer.rect(
        sampleNum * barWidth,
        currSampleDec,
        barWidth,
        height - currSampleDec
      );
    }

    // buffer.forEach((sample, sampleNum) => {
    //   if (sampleNum > 511) return;

    //   if (sample === -Infinity || sample === 0) {
    //     canvasDrawer.stroke(COLORS.accentPrimary100);
    //     canvasDrawer.fill(COLORS.accentPrimary100);
    //     return canvasDrawer.rect(sampleNum, height - 1, 1, 1);
    //   }
    //   const currSampleDec = (sampleToDecibel(Math.abs(sample)) * height) / 23;
    //   canvasDrawer.rect(sampleNum, currSampleDec, 1, height - currSampleDec);
    // });
  };

  useAnimationFrameLoop(
    getFreq,
    ready && !!analyser.current && !!container.current
  );

  useEffect(() => {
    const currAnalyser = AudioService.createAnalyser();
    currAnalyser.analyserNode.fftSize = 1024 * 2;
    analyser.current = currAnalyser.analyserNode;
    console.log(AudioService.buffer?.sampleRate);
    console.log(analyser.current.maxDecibels);
    console.log(analyser.current.minDecibels);
  }, []);

  return (
    <>
      <button onClick={getFreq}>getFeq!</button>
      <Box width={512} height={height} ref={container}></Box>
    </>
  );
};

export default FrequencyMeter;
