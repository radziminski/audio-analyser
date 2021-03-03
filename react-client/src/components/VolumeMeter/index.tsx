import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

import { Container } from './parts';
import { FlexBox } from 'components/Box';

interface Props {
  sth?: any;
  audioElement: HTMLAudioElement;
}
export const VolumeMeter: React.FC<Props> = ({ sth, audioElement }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { current: ctx } = useRef(new AudioContext());
  const [currP5, setCurrP5] = useState<p5>();
  const [started, setStarted] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  const containerWidth = containerRef.current?.offsetWidth;
  const containerHeight = containerRef.current?.clientHeight;

  useEffect(() => {
    if (containerRef && containerRef.current && !currP5) {
      const sketch = function (p) {
        p.setup = function () {
          console.log(
            'in setup',
            containerRef?.current?.getBoundingClientRect().width,
            containerRef?.current?.getBoundingClientRect().height
          );
          p.createCanvas(
            containerRef?.current?.getBoundingClientRect().width,
            containerRef?.current?.getBoundingClientRect().height
          );
          setReady(true);
        };
      };
      const x = new p5(sketch, containerRef.current);

      console.log(x);
      setCurrP5(x);
    }
  }, [containerRef, containerRef.current]);

  useEffect(() => {
    if (currP5 && ready) startMeter();
  }, [currP5, ready]);

  const startMeter = () => {
    console.log(ctx);
    if (started) return console.error('error');
    setStarted(true);

    const sourceNode = ctx.createMediaElementSource(audioElement);

    const gain = ctx.createGain();
    gain.gain.value = 1;

    const analyserLeft = ctx.createAnalyser();
    const analyserRight = ctx.createAnalyser();
    const analyserInst = ctx.createAnalyser();

    const splitter = ctx.createChannelSplitter(2);
    const merger = ctx.createChannelMerger(2);

    sourceNode.connect(gain);
    gain.connect(splitter);
    splitter.connect(analyserLeft, 0);
    splitter.connect(analyserRight, 1);
    splitter.connect(analyserInst, 0);
    analyserLeft.connect(merger, 0, 1);
    analyserRight.connect(merger, 0, 0);
    merger.connect(ctx.destination);

    const ORANGE_THRESHOLD = 15;

    function displayAverageVolume(
      value: number,
      type: 'left' | 'right',
      clear = false
    ) {
      if (!currP5) return;

      let currSample = value;
      const containerHeight =
        containerRef?.current?.getBoundingClientRect().height || 0;

      if (!value || value === -Infinity || value === Infinity || isNaN(value))
        currSample = containerHeight;

      const offsetX = type === 'left' ? 0 : 36;
      const width = 34;

      currSample = Math.abs(currSample) * 7;
      const maxGreenRectHeight = ORANGE_THRESHOLD * 7;

      if (clear) currP5.clear();
      currP5.noStroke();

      if (value > -ORANGE_THRESHOLD) {
        currP5.fill('#48A300');
        // draw green rect
        currP5.rect(
          offsetX,
          maxGreenRectHeight,
          width,
          containerHeight - maxGreenRectHeight,
          0,
          0,
          type === 'right' ? 12 : 0,
          type === 'left' ? 12 : 0
        );
        currP5.fill('#ECB831');
        currP5.rect(
          offsetX,
          currSample,
          width,
          containerHeight - currSample - (containerHeight - maxGreenRectHeight)
        );
      } else {
        currP5.fill('#48A300');
        // draw only green rect
        currP5.rect(
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
      if (!currP5) return;

      let currSample = value;
      const containerHeight =
        containerRef?.current?.getBoundingClientRect().height || 0;

      if (!value || value === -Infinity || value === Infinity || isNaN(value))
        currSample = containerHeight;

      const offsetX = type === 'left' ? 0 : 36;
      const width = 34;

      currSample = Math.abs(currSample) * 7;

      if (clear) currP5.clear();
      currP5.stroke(255, 0, 0);
      // draw green rect
      currP5.line(0, currSample, width, currSample);
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

  return (
    <>
      <Container ref={containerRef}></Container>
      <FlexBox flexDirection='column' width={100}></FlexBox>
      {/* <button onClick={audioRef?.current?.}>stop</button> */}
    </>
  );
};

export default VolumeMeter;
