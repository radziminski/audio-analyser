import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  min-height: 120px;
  padding: 1rem;

  border: 2px dashed ${({ theme }) => theme.colors.white}90;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.6;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 0.86;
  }
`;
