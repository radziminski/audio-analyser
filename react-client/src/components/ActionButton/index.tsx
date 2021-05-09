import Button from 'components/Button';
import styled from 'styled-components';
import React from 'react';
import Loader from 'components/Loader';

export type ButtonType = 'danger' | 'submit' | 'normal';

const Container = styled(Button)<{
  padding?: string;
  fontSize?: string;
  height?: string;
  btnType?: ButtonType;
  borderRadius?: string;
}>`
  width: 100%;
  border-radius: ${({ borderRadius }) => borderRadius ?? '0.5rem'};
  background-color: ${({ theme, btnType }) =>
    btnType === 'danger' ? theme.colors.danger100 : theme.colors.primary100};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ padding }) => padding ?? '1rem 2rem'};
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  transition: all 0.2s;
  height: ${({ height }) => height ?? '3.2rem'};

  &:hover {
    background-color: ${({ theme, btnType }) =>
      btnType === 'danger' ? theme.colors.danger70 : theme.colors.primary80};
  }
`;

interface Props {
  isLoading?: boolean;
  padding?: string;
  fontSize?: string;
  height?: string;
  onClick?: () => void;
  type?: ButtonType;
  borderRadius?: string;
}

export const ActionButton: React.FC<Props> = ({
  children,
  padding,
  fontSize,
  isLoading,
  height,
  onClick,
  borderRadius,
  type
}) => {
  return (
    <Container
      padding={padding}
      fontSize={fontSize}
      height={height}
      onClick={onClick}
      type={type === 'submit' ? type : undefined}
      btnType={type}
      borderRadius={borderRadius}
    >
      {isLoading ? <Loader size={20} strokeSize={3} /> : children}
    </Container>
  );
};

export default ActionButton;
