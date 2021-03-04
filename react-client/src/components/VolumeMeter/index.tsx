import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

import { Container } from './parts';
import { FlexBox } from 'components/Box';
import { useCanvasDrawer, useAudioContext } from 'hooks';

interface Props {
  audioElement: HTMLAudioElement;
}
export const VolumeMeter: React.FC<Props> = ({ audioElement }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioContext = useAudioContext();
  const [meterStarted, setMeterStarted] = useState<boolean>(false);
  const { ready, canvasDrawer: p5Drawer } = useCanvasDrawer(containerRef);

  useEffect(() => {
    if (p5Drawer && ready) startMeter();
  }, [p5Drawer, ready]);

  const startMeter = () => {
    console.log(audioContext);
    if (meterStarted) return console.error('error');
    setMeterStarted(true);

    const sourceNode = audioContext.createMediaElementSource(audioElement);

    const gain = audioContext.createGain();
    gain.gain.value = 1;

    const analyserLeft = audioContext.createAnalyser();
    const analyserRight = audioContext.createAnalyser();
    const analyserInst = audioContext.createAnalyser();

    const splitter = audioContext.createChannelSplitter(2);
    const merger = audioContext.createChannelMerger(2);

    sourceNode.connect(gain);
    gain.connect(splitter);
    splitter.connect(analyserLeft, 0);
    splitter.connect(analyserRight, 1);
    splitter.connect(analyserInst, 0);
    analyserLeft.connect(merger, 0, 1);
    analyserRight.connect(merger, 0, 0);
    merger.connect(audioContext.destination);

    const ORANGE_THRESHOLD = 15;

    function displayAverageVolume(
      value: number,
      type: 'left' | 'right',
      clear = false
    ) {
      if (!p5Drawer) return;

      let currSample = value;
      const containerHeight =
        containerRef?.current?.getBoundingClientRect().height || 0;

      if (!value || value === -Infinity || value === Infinity || isNaN(value))
        currSample = containerHeight;

      const offsetX = type === 'left' ? 0 : 36;
      const width = 34;

      currSample = Math.abs(currSample) * 7;
      const maxGreenRectHeight = ORANGE_THRESHOLD * 7;

      if (clear) p5Drawer.clear();
      p5Drawer.noStroke();

      if (value > -ORANGE_THRESHOLD) {
        p5Drawer.fill('#48A300');
        // draw green rect
        p5Drawer.rect(
          offsetX,
          maxGreenRectHeight,
          width,
          containerHeight - maxGreenRectHeight,
          0,
          0,
          type === 'right' ? 12 : 0,
          type === 'left' ? 12 : 0
        );
        p5Drawer.fill('#ECB831');
        p5Drawer.rect(
          offsetX,
          currSample,
          width,
          containerHeight - currSample - (containerHeight - maxGreenRectHeight)
        );
      } else {
        p5Drawer.fill('#48A300');
        // draw only green rect
        p5Drawer.rect(
          offsetX,
          currSample,
          width,
          containerHeight - currSample > 0 ? containerHeight - currSample : 0,
          0,
          0,
          type === 'right' ? 12 : 0,
          type === 'left' ? 12 : 0
        );
      }
    }

    function displayInstantaneousVolume(
      value: number,
      type: 'left' | 'right',
      clear = false
    ) {
      if (!p5Drawer) return;

      let currSample = value;
      const containerHeight =
        containerRef?.current?.getBoundingClientRect().height || 0;

      if (!value || value === -Infinity || value === Infinity || isNaN(value))
        currSample = containerHeight;

      const offsetX = type === 'left' ? 0 : 36;
      const width = 34;

      currSample = Math.abs(currSample) * 7;

      if (clear) p5Drawer.clear();
      p5Drawer.stroke(255, 0, 0);
      // draw green rect
      p5Drawer.line(0, currSample, width, currSample);
    }

    // Time domain samples are always provided with the count of
    // fftSize even though there is no FFT involved.
    // (Note that fftSize can only have particular values, not an
    // arbitrary integer.)
    const fftSize = 1024 * 4;
    analyserRight.fftSize = fftSize;
    analyserLeft.fftSize = fftSize;
    analyserInst.fftSize = 1024 * 32;
    const sampleBufferRight = new Float32Array(analyserRight.fftSize);
    const sampleBufferLeft = new Float32Array(analyserLeft.fftSize);
    const sampleBufferInst = new Float32Array(analyserInst.fftSize);

    function loop() {
      analyserRight.getFloatTimeDomainData(sampleBufferRight);
      analyserLeft.getFloatTimeDomainData(sampleBufferLeft);
      analyserInst.getFloatTimeDomainData(sampleBufferInst);

      // Compute average power over the interval.
      let sumOfSquaresRight = 0;
      for (let i = 0; i < sampleBufferRight.length; i++) {
        sumOfSquaresRight += sampleBufferRight[i] ** 2;
      }
      const avgPowerDecibelsRight =
        10 * Math.log10(sumOfSquaresRight / sampleBufferRight.length);

      // Compute average power over the interval.
      let sumOfSquaresLeft = 0;
      for (let i = 0; i < sampleBufferLeft.length; i++) {
        const squareLeft = sampleBufferLeft[i] ** 2;
        sumOfSquaresLeft += squareLeft;
      }
      const avgPowerDecibelsLeft =
        10 * Math.log10(sumOfSquaresLeft / sampleBufferLeft.length);

      const maxSamples = sampleBufferInst
        .sort()
        .reverse()
        .subarray(0, analyserInst.fftSize / 4);
      let sum = 0;
      for (let i = 0; i < maxSamples.length; i++) {
        const value = maxSamples[i] ** 2;
        sum += value;
      }
      const avgPower = sum / maxSamples.length;

      const peakInstantaneousPowerDecibels = 10 * Math.log10(avgPower);

      // Note that you should then add or subtract as appropriate to
      // get the _reference level_ suitable for your application.

      // Display value.
      displayAverageVolume(avgPowerDecibelsLeft, 'left', true);
      displayAverageVolume(avgPowerDecibelsRight, 'right');
      displayInstantaneousVolume(peakInstantaneousPowerDecibels, 'left');

      requestAnimationFrame(loop);
    }
    loop();
  };

  return <Container ref={containerRef} />;
};

export default VolumeMeter;
