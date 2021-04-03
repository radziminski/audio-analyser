import React, { useRef } from 'react';

import VolumeValueTag, { CanvasContainer, Container } from './parts';
import { useStartMeter } from './hooks';
import Box from 'components/Box';
import { getVolumeRelativeToContainer } from 'utils/audio';

export const VolumeMeter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useStartMeter(containerRef);

  return (
    <Container ref={containerRef}>
      <CanvasContainer />

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
  );
};

export default VolumeMeter;
