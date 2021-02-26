import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background20};
  padding: 50px 40px;
`;
