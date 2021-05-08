import Button from 'components/Button';
import styled from 'styled-components';
import React from 'react';
import Loader from 'components/Loader';

export type ButtonType = 'submit' | 'danger' | 'normal';

const Container = styled(Button)<{
  padding?: string;
  fontSize?: string;
  height?: string;
  type?: ButtonType;
}>`
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ padding }) => padding ?? '1rem 2rem'};
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  transition: all 0.2s;
  height: ${({ height }) => height ?? '3.2rem'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary80};
  }
`;

interface Props {
  isLoading?: boolean;
  padding?: string;
  fontSize?: string;
  height?: string;
  onClick?: () => void;
  type?: ButtonType;
}

export const ActionButton: React.FC<Props> = ({
  children,
  padding,
  fontSize,
  isLoading,
  height,
  onClick,
  type
}) => {
  return (
    <Container
      padding={padding}
      fontSize={fontSize}
      height={height}
      onClick={onClick}
      type={type === 'submit' ? type : undefined}
    >
      {isLoading ? <Loader size={20} strokeSize={3} /> : children}
    </Container>
  );
};

export default ActionButton;
