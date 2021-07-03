import styled from 'styled-components';

export const Input = styled.input<{
  width?: string;
  maxWidth?: string;
}>`
  width: ${({ width }) => width ?? 'auto'};
  max-width: ${({ maxWidth }) => maxWidth ?? 'none'};
`;
