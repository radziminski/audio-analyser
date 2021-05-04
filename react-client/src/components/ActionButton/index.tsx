import Button from 'components/Button';
import styled from 'styled-components';
import React from 'react';
import Loader from 'components/Loader';

const Container = styled(Button)`
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  font-size: 1rem;
  transition: all 0.2s;
  height: 3.2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary80};
  }
`;

interface Props {
  isLoading?: boolean;
}

export const ActionButton: React.FC<Props> = ({ children, isLoading }) => {
  return (
    <Container>
      {isLoading ? <Loader size={20} strokeSize={3} /> : children}
    </Container>
  );
};

export default ActionButton;
