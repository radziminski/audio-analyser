import React, { useRef } from 'react';

import { getVolumeRelativeToContainer } from '~/utils/audio';

import Box, { FlexBox } from '../Box';
import { Heading5 } from '../Text';
import { useStartMeter } from './hooks';
import VolumeValueTag, { Container } from './parts';

export const VolumeMeter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useStartMeter(containerRef);

  return (
    <FlexBox flexDirection='column'>
      <Heading5 light>Volume:</Heading5>
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
