import React, { useCallback, useRef } from 'react';
import { useCanvasDrawer, useElementDimensions } from '~/hooks';
import Box from '../Box';
import { useMeydaAnalyser } from '~/hooks/useMeydaAnalyser';
import { MeydaFeaturesObject } from 'meyda';
import { Image } from 'p5';
import { COLORS } from '~/styles/theme';
import { CanvasDrawer } from '~/hooks/useCanvasDrawer';
import { useStoreState } from '~/global-state/hooks';

const useDrawLine = (
  canvasDrawer: CanvasDrawer | undefined,
  width: number | undefined,
  height: number | undefined,
  color: string
) => {
  const image = useRef<Image | null>(null);
  const prevHeight = useRef<number | null>(null);

  return useCallback(
    (value: number) => {
      if (canvasDrawer && width && height) {
        canvasDrawer.stroke(color);
        if (prevHeight.current || prevHeight.current === 0)
          canvasDrawer.line(
            width - 1,
            height - value * height,
            width - 2,
            height - prevHeight.current * height + 1
          );

        prevHeight.current = value;

        if (image.current) {
          canvasDrawer.set(-1, 0, image.current);
          canvasDrawer.updatePixels();
        }
        image.current = canvasDrawer.get(0, 0, width, height);
      }
    },
    [canvasDrawer]
  );
};

export const CoefficientsGraph: React.FC = () => {
  const rmsContainer = useRef<HTMLDivElement | null>(null);
  const {
    bufferSize,
    height: propHeight,
    isRmsShown,
    isCentroidShown,
    isRolloffShown
  } = useStoreState((state) => state.ui.audioUIState.coefficients);

  const halfBufferSize = bufferSize / 2;

  const { canvasDrawer } = useCanvasDrawer(rmsContainer);
  const { width, height } = useElementDimensions(rmsContainer);

  const onRmsFrame = useDrawLine(
    canvasDrawer,
    width,
    height,
    COLORS.accentPrimary100
  );
  const onCentroidFrame = useDrawLine(
    canvasDrawer,
    width,
    height,
    COLORS.accentSecondary100
  );
  const onSpectralFrame = useDrawLine(
    canvasDrawer,
    width,
    height,
    COLORS.primary100
  );

  const onFrame = (features: Partial<MeydaFeaturesObject>) => {
    canvasDrawer?.clear();

    isRmsShown && onRmsFrame(features.rms ?? 0);
    isCentroidShown &&
      onCentroidFrame((features.spectralCentroid ?? 0) / halfBufferSize);
    isRolloffShown && onSpectralFrame((features.spectralRolloff ?? 0) / 22050);
  };

  useMeydaAnalyser(
    ['rms', 'spectralCentroid', 'spectralRolloff'],
    onFrame,
    bufferSize
  );

  return (
    <Box
      width='100%'
      height={propHeight ?? 300}
      background={COLORS.background20}
      borderRadius='1rem'
    >
      <Box width='100%' height='100%' ref={rmsContainer} />
    </Box>
  );
};

export default CoefficientsGraph;
