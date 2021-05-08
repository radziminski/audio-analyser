import styled from 'styled-components';

export const Field = styled.div<{ padding?: string; differentColor?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme, differentColor }) =>
    !differentColor ? theme.colors.background50 : theme.colors.background20};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 5rem;
  padding: ${({ padding }) => padding};
`;
