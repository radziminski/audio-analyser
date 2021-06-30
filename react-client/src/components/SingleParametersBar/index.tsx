import { MeydaFeaturesObject } from 'meyda';
import React, { useCallback, useEffect, useRef } from 'react';
import { useCanvasDrawer } from '~/hooks';
import { CanvasDrawer } from '~/hooks/useCanvasDrawer';
import audioService from '~/services/AudioService';
import { FONT_WEIGHTS, COLORS } from '~/styles/theme';
import Box, { FlexBox } from '../Box';
import Text, { Heading5 } from '../Text';

const PITCH_CLASSES = [
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯',
  'A',
  'A♯',
  'B'
];

const BAND_SQUARE_SIZE = 50;
const BAND_SQUARE_DISTANCE = 5;
const BAND_SQUARE_BORDER_RADIUS = 5;

const MFCC_BANDS_NUM = 13;

const drawBandSquares = (drawer: CanvasDrawer, bands: number[]) => {
  drawer.clear();
  drawer.noStroke();

  bands.forEach((band, index) => {
    drawer.fill(
      `rgba(112, 51 ,255, ${Math.max(Math.round(band * 100) / 100, 0.2)})`
    );

    drawer.rect(
      index * (BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE),
      0,
      BAND_SQUARE_SIZE,
      BAND_SQUARE_SIZE,
      BAND_SQUARE_BORDER_RADIUS,
      BAND_SQUARE_BORDER_RADIUS
    );
  });
};

interface Props {
  isChromaOpened?: boolean;
  isMfccOpened?: boolean;
}

export const SingleParametersBar: React.FC<Props> = ({
  isChromaOpened = true,
  isMfccOpened = true
}) => {
  const chromaContainerRef = useRef<HTMLDivElement | null>(null);
  const mfccContainerRef = useRef<HTMLDivElement | null>(null);

  const { canvasDrawer: chromaCanvasDrawer } =
    useCanvasDrawer(chromaContainerRef);

  const { canvasDrawer: mfccCanvasDrawer } = useCanvasDrawer(mfccContainerRef);

  const onFrame = useCallback(
    (features: Partial<MeydaFeaturesObject>) => {
      const chromaBands = features.chroma;
      const mfccBands = features.mfcc;

      if (isChromaOpened && chromaBands && chromaCanvasDrawer)
        drawBandSquares(chromaCanvasDrawer, chromaBands);

      if (isMfccOpened && mfccBands && mfccCanvasDrawer)
        drawBandSquares(mfccCanvasDrawer, mfccBands);
    },
    [chromaCanvasDrawer, mfccCanvasDrawer, isChromaOpened, isMfccOpened]
  );

  useEffect(() => {
    if (!chromaCanvasDrawer && !mfccCanvasDrawer) return;

    const analyzer = audioService.createMeydaAnalyzer(
      2048,
      ['chroma', 'mfcc'],
      onFrame
    );

    return () => {
      analyzer.stop();
    };
  }, [onFrame]);

  const chromaBar = (
    <Box
      marginRight='3rem'
      width={(BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE) * PITCH_CLASSES.length}
    >
      <Box marginBottom='0.5rem'>
        <Heading5 color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
          Chroma bands:
        </Heading5>
      </Box>
      <FlexBox
        height={BAND_SQUARE_SIZE}
        width='100%'
        position='relative'
        marginBottom='1.5rem'
      >
        <FlexBox position='absolute' top={0} left={0}>
          {PITCH_CLASSES.map((band) => (
            <FlexBox
              key={band}
              height={BAND_SQUARE_SIZE}
              width={BAND_SQUARE_SIZE}
              marginRight={`${BAND_SQUARE_DISTANCE}px`}
              justifyContent='center'
              alignItems='center'
            >
              <Text color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
                {band}
              </Text>
            </FlexBox>
          ))}
        </FlexBox>

        <Box width='100%' ref={chromaContainerRef} />
      </FlexBox>
    </Box>
  );

  const mfccBar = (
    <Box width={(BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE) * MFCC_BANDS_NUM}>
      <Box marginBottom='0.5rem'>
        <Heading5 color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
          Mel-Frequency Cepstral Coefficients:
        </Heading5>
      </Box>
      <FlexBox height={BAND_SQUARE_SIZE} width='100%' position='relative'>
        <FlexBox position='absolute' top={0} left={0}>
          {Array.from(Array(13).keys()).map((bandNum) => (
            <FlexBox
              key={bandNum}
              height={BAND_SQUARE_SIZE}
              width={BAND_SQUARE_SIZE}
              marginRight={`${BAND_SQUARE_DISTANCE}px`}
              justifyContent='center'
              alignItems='center'
            >
              <Text color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
                {bandNum + 1}
              </Text>
            </FlexBox>
          ))}
        </FlexBox>

        <Box width='100%' ref={mfccContainerRef} />
      </FlexBox>
    </Box>
  );

  return (
    <FlexBox marginBottom='2rem' flexWrap='wrap'>
      {isChromaOpened && chromaBar}
      {isMfccOpened && mfccBar}
    </FlexBox>
  );
};

export default SingleParametersBar;
