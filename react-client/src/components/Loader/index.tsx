import React from 'react';

import { Container } from '~/components/Loader/parts';

interface Props {
  size?: number;
  strokeSize?: number;
  color?: string;
}

export const Loader: React.FC<Props> = ({ size, strokeSize, color }) => {
  return (
    <Container size={size} strokeSize={strokeSize} color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
};

export default Loader;
