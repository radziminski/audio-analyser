import React from 'react';
import { Input } from './parts';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  width?: string;
  maxWidth?: string;
}
export const Slider: React.FC<Props> = ({
  min,
  max,
  step,
  value,
  onChange,
  width,
  maxWidth
}) => {
  return (
    <Input
      width={width}
      maxWidth={maxWidth}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      type='range'
    />
  );
};

export default Slider;
