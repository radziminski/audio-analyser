import React, { useRef } from 'react';

import VolumeValueTag, { Container } from './parts';
import { useStartMeter } from './hooks';
import { getVolumeRelativeToContainer } from '~/utils/audio';
import { Heading5 } from '../Text';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';
import Box, { FlexBox } from '../Box';

export const VolumeMeter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useStartMeter(containerRef);

  return (
    <FlexBox flexDirection='column'>
      <Heading5 color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
        Volume:
      </Heading5>
      <Container ref={containerRef}>
        {Array.from(Array(12).keys()).map((i) => (
          <Box
            key={i}
            position='absolute'
            top={`${getVolumeRelativeToContainer(i, 10)}%`}
            left='50%'
            transform='translate(-50%, -100%)'
            zIndex={1}
          >
            <VolumeValueTag value={i * 3} />
          </Box>
        ))}
      </Container>
    </FlexBox>
  );
};

export default VolumeMeter;
