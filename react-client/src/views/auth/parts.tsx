import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const LeftBar = styled.div`
  width: 40%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background50};
  position: relative;
  box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.4);
`;

export const RightBar = styled.div`
  width: 60%;
  height: 100%;
  padding: 8rem 10rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
