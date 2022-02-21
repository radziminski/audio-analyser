import styled from 'styled-components';

import Button from '~/components/Button';

import { ButtonType } from '.';

export const Container = styled(Button)<{
  padding?: string;
  fontSize?: string;
  height?: string;
  btnType?: ButtonType;
  borderRadius?: string;
}>`
  width: 100%;
  border-radius: ${({ borderRadius }) => borderRadius ?? '0.5rem'};
  background-color: ${({ theme, btnType }) =>
    btnType === 'danger'
      ? theme.colors.danger100
      : btnType === 'text'
      ? 'transparent'
      : theme.colors.primary100};
  color: ${({ theme, btnType }) =>
    btnType === 'text' ? theme.colors.white : theme.colors.white};
  padding: ${({ padding }) => padding ?? '1rem 2rem'};
  font-size: ${({ fontSize }) => fontSize ?? '1rem'};
  transition: all 0.2s;
  height: ${({ height }) => height ?? '3.2rem'};

  opacity: ${({ btnType }) => (btnType === 'text' ? 0.8 : 1)};

  &:hover {
    &:not(:disabled) {
      background-color: ${({ theme, btnType }) =>
        btnType === 'danger'
          ? theme.colors.danger70
          : btnType === 'text'
          ? 'transparent'
          : theme.colors.primary80};
      color: ${({ theme }) => theme.colors.white};
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.6;
  }
`;
