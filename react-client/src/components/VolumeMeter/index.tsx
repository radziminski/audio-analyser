import React, { useEffect, useRef, useState } from 'react';

import { Container } from './parts';
import { FlexBox } from 'components/Box';
import { useCanvasDrawer, useAudioContext, useElementDimensions } from 'hooks';
import { drawInstantaneousVolume, drawMaxAverageVolume } from './helpers';
import { calculateBufferAverage, calculateBufferMaxAverage } from 'utils/audio';

interface Props {
  audioElement: HTMLAudioElement;
}
export const VolumeMeter: React.FC<Props> = ({ audioElement }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioContext = useAudioContext();
  const [meterStarted, setMeterStarted] = useState<boolean>(false);
  const { ready, canvasDrawer } = useCanvasDrawer(containerRef);

  const { width, height } = useElementDimensions(containerRef);

  useEffect(() => {
    if (canvasDrawer && ready) startMeter();
  }, [canvasDrawer, ready]);

  const startMeter = () => {
    console.log(audioContext);
    if (meterStarted) return console.error('error');
    setMeterStarted(true);

    const sourceNode = audioContext.createMediaElementSource(audioElement);

    const gain = audioContext.createGain();
    gain.gain.value = 1;

    const analyserLeft = audioContext.createAnalyser();
    const analyserRight = audioContext.createAnalyser();
    const analyserMaxLeft = audioContext.createAnalyser();
    const analyserMaxRight = audioContext.createAnalyser();

    const splitter = audioContext.createChannelSplitter(2);
    const merger = audioContext.createChannelMerger(2);

    sourceNode.connect(gain);
    gain.connect(splitter);
    splitter.connect(analyserLeft, 0);
    splitter.connect(analyserRight, 1);
    splitter.connect(analyserMaxLeft, 0);
    splitter.connect(analyserMaxRight, 1);
    analyserLeft.connect(merger, 0, 1);
    analyserRight.connect(merger, 0, 0);
    //merger.connect(audioContext.destination);

    // Time domain samples are always provided with the count of
    // fftSize even though there is no FFT involved.
    // (Note that fftSize can only have particular values, not an
    // arbitrary integer.)
    const instFFTSize = 1024 * 4;
    const avgFFTSize = 1024 * 32;
    analyserRight.fftSize = instFFTSize;
    analyserLeft.fftSize = instFFTSize;
    analyserMaxLeft.fftSize = avgFFTSize;
    analyserMaxRight.fftSize = avgFFTSize;
    const sampleBufferRight = new Float32Array(analyserRight.fftSize);
    const sampleBufferLeft = new Float32Array(analyserLeft.fftSize);
    const sampleBufferInstLeft = new Float32Array(analyserMaxLeft.fftSize);
    const sampleBufferInstRight = new Float32Array(analyserMaxRight.fftSize);

    function loop() {
      analyserRight.getFloatTimeDomainData(sampleBufferRight);
      analyserLeft.getFloatTimeDomainData(sampleBufferLeft);
      analyserMaxLeft.getFloatTimeDomainData(sampleBufferInstLeft);
      analyserMaxRight.getFloatTimeDomainData(sampleBufferInstRight);

      // Compute average power over the interval.
      const instantaneousAverageLeft = calculateBufferAverage(sampleBufferLeft);
      const instantaneousAverageRight = calculateBufferAverage(
        sampleBufferRight
      );
      const maxAverageLeft = calculateBufferMaxAverage(sampleBufferInstLeft);
      const maxAverageRight = calculateBufferMaxAverage(sampleBufferInstRight);

      // Display values
      drawInstantaneousVolume(
        instantaneousAverageLeft,
        instantaneousAverageRight,
        canvasDrawer,
        height || 0,
        width || 0,
        1,
        12,
        0
      );
      drawMaxAverageVolume(
        maxAverageLeft,
        maxAverageRight,
        canvasDrawer,
        height || 0,
        width || 0,
        1
      );

      requestAnimationFrame(loop);
    }
    loop();
  };

  return <Container ref={containerRef} />;
};

export default VolumeMeter;
