import { MeydaFeaturesObject } from 'meyda';
import React, { useCallback, useEffect, useRef } from 'react';
import { useCanvasDrawer } from '~/hooks';
import audioService from '~/services/AudioService';
import { FONT_WEIGHTS, COLORS } from '~/styles/theme';
import Box, { FlexBox } from '../Box';
import Text from '../Text';

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
const PITCH_NUM = PITCH_CLASSES.length;

export const SingleParametersBar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ready, canvasDrawer } = useCanvasDrawer(containerRef);

  const onFrame = useCallback(
    (features: Partial<MeydaFeaturesObject>) => {
      if (canvasDrawer) {
        canvasDrawer.clear();
        canvasDrawer.stroke('rgba(255, 255, 255, 0)');

        features.chroma?.forEach((band, index) => {
          canvasDrawer.fill(
            `rgba(112, 51 ,255, ${Math.max(Math.round(band * 100) / 100, 0.2)})`
          );

          canvasDrawer?.rect(
            index * BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE * index,
            0,
            BAND_SQUARE_SIZE,
            BAND_SQUARE_SIZE,
            5,
            5
          );
        });

        features.mfcc?.forEach((band, index) => {
          canvasDrawer.fill(
            `rgba(112, 51 ,255, ${Math.max(Math.round(band * 100) / 100, 0.2)})`
          );

          canvasDrawer?.rect(
            index * BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE * index,
            BAND_SQUARE_SIZE + BAND_SQUARE_DISTANCE,
            BAND_SQUARE_SIZE,
            BAND_SQUARE_SIZE,
            5,
            5
          );
        });
      }
    },
    [ready, canvasDrawer]
  );

  useEffect(() => {
    const analyzer = audioService.createMeydaAnalyzer(
      2048,
      ['chroma', 'mfcc'],
      onFrame
    );

    return () => {
      analyzer.stop();
    };
  }, [onFrame]);

  console.log(canvasDrawer);

  return (
    <FlexBox height={150} width='100%' position='relative'>
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

      <Box width='100%' ref={containerRef} />
    </FlexBox>
  );
};

export default SingleParametersBar;
