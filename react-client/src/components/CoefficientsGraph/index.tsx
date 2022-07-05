import { MeydaFeaturesObject } from 'meyda';
import { Image } from 'p5';
import React, { RefObject, useCallback, useMemo, useRef } from 'react';

import { useStoreState } from '~/global-state/hooks';
import { useCanvasDrawer, useElementDimensions } from '~/hooks';
import { useMeydaAnalyser } from '~/hooks/useMeydaAnalyser';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';

import Box, { FlexBox } from '../Box';
import Text, { Heading5 } from '../Text';

const HALF_SAMPLING_FREQ = 44100 / 2;
const MAX_RMS = 0.6;
const useDrawLine = (
  container: RefObject<HTMLDivElement>,
  color: string,
  startHeight?: number
) => {
  const image = useRef<Image | null>(null);
  const { canvasDrawer } = useCanvasDrawer(container);
  const { width, height } = useElementDimensions(container);

  const prevHeight = useRef<number>(startHeight ?? 0);
  const startPointX = width ? width - 1 : 0;
  const endPointX = width ? width - 2 : 0;

  return useCallback(
    (value: number) => {
      if (canvasDrawer && width && height) {
        canvasDrawer.clear();
        canvasDrawer.stroke(color);
        canvasDrawer.line(
          startPointX,
          height * (1 - value),
          endPointX,
          height * (1 - prevHeight.current)
        );

        prevHeight.current = value;

        if (image.current) {
          canvasDrawer.noSmooth();
          canvasDrawer.set(-1, 0, image.current);
          canvasDrawer.updatePixels();
        }
        image.current = canvasDrawer.get(0, 0, width, height);
      }
    },
    [canvasDrawer, width, height, color]
  );
};

export const CoefficientsGraph: React.FC = () => {
  const rmsContainer = useRef<HTMLDivElement | null>(null);
  const centroidContainer = useRef<HTMLDivElement | null>(null);
  const rolloffContainer = useRef<HTMLDivElement | null>(null);

  const {
    bufferSize,
    height: propHeight,
    isRmsShown,
    isCentroidShown,
    isRolloffShown
  } = useStoreState((state) => state.ui.audioUIState.coefficients);

  const halfBufferSize = bufferSize / 2;

  const graphsData = useMemo(
    () => [
      {
        title: 'RMS (Root Mean Square):',
        yAxis: ['0', MAX_RMS / 2, MAX_RMS]
      },
      {
        title: 'Spectral Centroid:',
        yAxis: ['0', halfBufferSize / 2, halfBufferSize]
      },
      {
        title: 'Spectral Rolloff:',
        yAxis: [
          '0 kHz',
          `${Math.round(HALF_SAMPLING_FREQ / 2 / 1000)} kHz`,
          `${Math.round(HALF_SAMPLING_FREQ / 1000)} kHz`
        ]
      }
    ],
    [halfBufferSize]
  );

  const containers = [
    isRmsShown && { container: rmsContainer, data: graphsData[0] },
    isCentroidShown && { container: centroidContainer, data: graphsData[1] },
    isRolloffShown && { container: rolloffContainer, data: graphsData[2] }
  ].filter((c) => Boolean(c));

  const onRmsFrame = useDrawLine(rmsContainer, COLORS.accentPrimary100, 0);
  const onCentroidFrame = useDrawLine(
    centroidContainer,
    COLORS.accentSecondary100,
    0
  );
  const onSpectralFrame = useDrawLine(rolloffContainer, COLORS.primary100, 1);

  const onFrame = useCallback(
    (features: Partial<MeydaFeaturesObject>) => {
      isRmsShown && onRmsFrame((features.rms ?? 0) / 0.6);
      isCentroidShown &&
        onCentroidFrame((features.spectralCentroid ?? 0) / halfBufferSize);
      isRolloffShown &&
        onSpectralFrame((features.spectralRolloff ?? 0) / HALF_SAMPLING_FREQ);
    },
    [
      isRmsShown,
      isCentroidShown,
      isRolloffShown,
      onRmsFrame,
      onCentroidFrame,
      onSpectralFrame,
      halfBufferSize
    ]
  );

  useMeydaAnalyser(
    ['rms', 'spectralCentroid', 'spectralRolloff'],
    onFrame,
    bufferSize
  );

  return (
    <FlexBox justifyContent='space-between'>
      {containers.map(
        (graph, i) =>
          graph && (
            <Box flexGrow={1} marginLeft={i ? '2rem' : 0} key={i}>
              <Heading5 light>{graph.data.title}</Heading5>
              <FlexBox marginTop='1rem'>
                <FlexBox
                  marginRight='4px'
                  flexDirection='column-reverse'
                  justifyContent='space-between'
                  alignItems='center'
                  flexShrink={0}
                >
                  {graph.data.yAxis.map((label) => (
                    <Box key={label} width='max-content'>
                      <Text
                        fontWeight={FONT_WEIGHTS.light}
                        color={COLORS.white}
                        fontSize='0.8rem'
                      >
                        {label}
                      </Text>
                    </Box>
                  ))}
                </FlexBox>

                <Box
                  height={propHeight ?? 300}
                  background={COLORS.background20}
                  borderRadius='1rem'
                  flexGrow={1}
                >
                  <Box width='100%' height='100%' ref={graph.container} />
                </Box>
              </FlexBox>
            </Box>
          )
      )}
    </FlexBox>
  );
};

export default CoefficientsGraph;
