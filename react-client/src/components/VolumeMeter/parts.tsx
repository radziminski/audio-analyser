import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  min-height: 500px;
  width: 70px;
  background: ${({ theme }) => theme.colors.background20};
  border-radius: 12px;
  position: relative;
`;
