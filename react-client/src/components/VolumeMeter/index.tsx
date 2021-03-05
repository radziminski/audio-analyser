import React, { useEffect, useRef, useState } from 'react';

import { Container } from './parts';
import { useCanvasDrawer, useElementDimensions } from 'hooks';
import { drawInstantaneousVolume, drawMaxAverageVolume } from './helpers';
import { calculateBufferAverage, calculateBufferMaxAverage } from 'utils/audio';
import {
  AudioController,
  LEFT_CHANNEL,
  RIGHT_CHANNEL
} from 'global-state/audio/audioController';

interface Props {
  audioController: AudioController;
}

export const VolumeMeter: React.FC<Props> = ({ audioController }) => {
  const [analysersIds, setAnalysersIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [meterStarted, setMeterStarted] = useState<boolean>(false);
  const { ready, canvasDrawer } = useCanvasDrawer(containerRef);

  const { width, height } = useElementDimensions(containerRef);

  useEffect(() => {
    if (canvasDrawer && ready) startMeter();
    return () => {
      analysersIds.forEach((id) => {
        audioController.removeAnalyser(id);
      });
      setAnalysersIds([]);
    };
  }, [canvasDrawer, ready]);

  const startMeter = () => {
    if (meterStarted) return;

    const analyserRight = audioController.createAnalyser(LEFT_CHANNEL);
    const analyserLeft = audioController.createAnalyser(RIGHT_CHANNEL);

    const analyserMaxRight = audioController.createAnalyser(LEFT_CHANNEL);
    const analyserMaxLeft = audioController.createAnalyser(RIGHT_CHANNEL);

    setAnalysersIds((prevIds) => [
      ...prevIds,
      analyserRight.id,
      analyserLeft.id,
      analyserMaxRight.id,
      analyserMaxLeft.id
    ]);

    const analyserRightNode = analyserRight.analyserNode;
    const analyserLeftNode = analyserLeft.analyserNode;

    const analyserMaxRightNode = analyserMaxRight.analyserNode;
    const analyserMaxLeftNode = analyserMaxLeft.analyserNode;

    setMeterStarted(true);

    // Time domain samples are always provided with the count of
    // fftSize even though there is no FFT involved.
    // (Note that fftSize can only have particular values, not an
    // arbitrary integer.)
    const instFFTSize = 1024 * 4;
    const avgFFTSize = 1024 * 32;
    analyserRightNode.fftSize = instFFTSize;
    analyserLeftNode.fftSize = instFFTSize;
    analyserMaxLeftNode.fftSize = avgFFTSize;
    analyserMaxRightNode.fftSize = avgFFTSize;
    const sampleBufferRight = new Float32Array(analyserRightNode.fftSize);
    const sampleBufferLeft = new Float32Array(analyserLeftNode.fftSize);
    const sampleBufferInstLeft = new Float32Array(analyserMaxLeftNode.fftSize);
    const sampleBufferInstRight = new Float32Array(
      analyserMaxRightNode.fftSize
    );

    function loop() {
      analyserRightNode.getFloatTimeDomainData(sampleBufferRight);
      analyserLeftNode.getFloatTimeDomainData(sampleBufferLeft);
      analyserMaxLeftNode.getFloatTimeDomainData(sampleBufferInstLeft);
      analyserMaxRightNode.getFloatTimeDomainData(sampleBufferInstRight);

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
