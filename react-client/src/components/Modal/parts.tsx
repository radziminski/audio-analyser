import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modalMiddle};
  background-color: ${({ theme }) => theme.colors.background70};
  color: ${({ theme }) => theme.colors.white};
  width: 612px;
  border-radius: 12px;
  padding: 3rem;
  animation: fade-in 0.2s ease-out;
  animation-fill-mode: forwards;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
