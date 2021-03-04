import React from 'react';
import { Container, Slider } from './parts';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}
export const VolumeSlider: React.FC<Props> = ({
  value,
  onChange,
  min,
  max,
  step
}) => {
  return (
    <Container>
      <Slider
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
      />
    </Container>
  );
};

export default VolumeSlider;
