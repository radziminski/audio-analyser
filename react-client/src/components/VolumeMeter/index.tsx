import React, { useRef } from 'react';

import { Container } from './parts';
import { useStartMeter } from './hooks';

export const VolumeMeter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useStartMeter(containerRef);

  return <Container ref={containerRef} />;
};

export default VolumeMeter;
