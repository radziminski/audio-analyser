import { useElementDimensions } from './../../hooks/useElementDimensions/index';
import { useCanvasDrawer } from './../../hooks/useCanvasDrawer/index';
import { drawInstantaneousVolume, drawMaxAverageVolume } from './helpers';
import {
  calculateBufferAverage,
  calculateBufferMaxAverage
} from './../../utils/audio';
import { useAnimationFrameLoop } from './../../hooks/useAnimationFrameLoop/index';
import audioService, {
  LEFT_CHANNEL,
  RIGHT_CHANNEL
} from '~/services/AudioService';
import { useEffect, useState, useRef, MutableRefObject } from 'react';

export const useInitAnalysers = () => {
  const [analysersIds, setAnalysersIds] = useState<number[]>([]);
  const [analysersReady, setAnalysersReady] = useState<boolean>(false);

  const analyserInstRightNodeRef = useRef<AnalyserNode>();
  const analyserInstLeftNodeRef = useRef<AnalyserNode>();
  const analyserAvgRightNodeRef = useRef<AnalyserNode>();
  const analyserAvgLeftNodeRef = useRef<AnalyserNode>();

  useEffect(() => {
    if (analysersReady) return;

    const analyserRight = audioService.createAnalyser(LEFT_CHANNEL);
    const analyserLeft = audioService.createAnalyser(RIGHT_CHANNEL);

    const analyserMaxRight = audioService.createAnalyser(LEFT_CHANNEL);
    const analyserMaxLeft = audioService.createAnalyser(RIGHT_CHANNEL);

    setAnalysersIds((prevIds) => [
      ...prevIds,
      analyserRight.id,
      analyserLeft.id,
      analyserMaxRight.id,
      analyserMaxLeft.id
    ]);

    analyserInstRightNodeRef.current = analyserRight.analyserNode;
    analyserInstLeftNodeRef.current = analyserLeft.analyserNode;

    analyserAvgRightNodeRef.current = analyserMaxRight.analyserNode;
    analyserAvgLeftNodeRef.current = analyserMaxLeft.analyserNode;

    const instFFTSize = 1024 * 4;
    const avgFFTSize = 1024 * 32;
    analyserInstRightNodeRef.current.fftSize = instFFTSize;
    analyserInstLeftNodeRef.current.fftSize = instFFTSize;
    analyserAvgRightNodeRef.current.fftSize = avgFFTSize;
    analyserAvgLeftNodeRef.current.fftSize = avgFFTSize;

    setAnalysersReady(true);

    return () => {
      analysersIds.forEach((id) => {
        audioService.removeAnalyser(id);
      });
      setAnalysersIds([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    analysersReady,
    analyserInstRight: analyserInstRightNodeRef.current,
    analyserInstLeft: analyserInstLeftNodeRef.current,
    analyserAvgRight: analyserAvgRightNodeRef.current,
    analyserAvgLeft: analyserAvgLeftNodeRef.current
  };
};

interface InitMeterProps {
  analyserInstRight?: AnalyserNode;
  analyserInstLeft?: AnalyserNode;
  analyserAvgRight?: AnalyserNode;
  analyserAvgLeft?: AnalyserNode;
  analysersReady: boolean;
  containerRef: MutableRefObject<HTMLElement | null>;
}

export const useInitMeter = ({
  analyserInstRight,
  analyserInstLeft,
  analyserAvgRight,
  analyserAvgLeft,
  analysersReady,
  containerRef
}: InitMeterProps) => {
  const { ready, canvasDrawer } = useCanvasDrawer(containerRef);
  const { width, height, dimensionsReady } = useElementDimensions(containerRef);

  useAnimationFrameLoop(() => {
    const sampleBufferRight = new Float32Array(analyserInstRight?.fftSize || 0);
    const sampleBufferLeft = new Float32Array(analyserInstLeft?.fftSize || 0);
    const sampleBufferInstLeft = new Float32Array(
      analyserAvgRight?.fftSize || 0
    );
    const sampleBufferInstRight = new Float32Array(
      analyserAvgLeft?.fftSize || 0
    );

    analyserInstRight?.getFloatTimeDomainData(sampleBufferRight);
    analyserInstLeft?.getFloatTimeDomainData(sampleBufferLeft);
    analyserAvgRight?.getFloatTimeDomainData(sampleBufferInstRight);
    analyserAvgLeft?.getFloatTimeDomainData(sampleBufferInstLeft);

    // Compute average power over the interval.
    const instantaneousAverageLeft = calculateBufferAverage(sampleBufferLeft);
    const instantaneousAverageRight = calculateBufferAverage(sampleBufferRight);
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
  }, ready && canvasDrawer && dimensionsReady && analysersReady);
};

export const useStartMeter = (
  containerRef: MutableRefObject<HTMLElement | null>
) => {
  const {
    analyserInstLeft,
    analyserInstRight,
    analyserAvgRight,
    analyserAvgLeft,
    analysersReady
  } = useInitAnalysers();

  useInitMeter({
    analyserInstRight,
    analyserInstLeft,
    analyserAvgRight,
    analyserAvgLeft,
    analysersReady,
    containerRef
  });
};
