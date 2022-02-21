import React from 'react';

import Loader from '~/components/Loader';

import { Container } from './parts';

export type ButtonType = 'danger' | 'submit' | 'normal' | 'text';

interface Props {
  isLoading?: boolean;
  padding?: string;
  fontSize?: string;
  height?: string;
  onClick?: () => void;
  type?: ButtonType;
  borderRadius?: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<Props> = ({
  children,
  padding,
  fontSize,
  isLoading,
  height,
  onClick,
  borderRadius,
  type,
  disabled
}) => {
  return (
    <Container
      padding={padding}
      fontSize={fontSize}
      height={height}
      onClick={!isLoading && !disabled ? () => onClick && onClick() : undefined}
      type={type === 'submit' ? type : undefined}
      btnType={type}
      borderRadius={borderRadius}
      disabled={disabled}
    >
      {isLoading ? <Loader size={20} strokeSize={3} /> : children}
    </Container>
  );
};

export default ActionButton;
