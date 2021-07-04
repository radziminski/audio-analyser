import styled from 'styled-components';

export const ActionBox = styled.div`
  height: 8rem;
  max-width: calc(33% - 1rem);
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 2rem;
  }

  @media ${({ theme }) => theme.mediaQueries.desktopS} {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.laptop} {
    flex-shrink: 1;
    min-width: 0;
  }
`;

export const ActionCard = styled(ActionBox)`
  transition: background-color 0.2s;
  border-radius: 0.6rem;

  background-color: ${({ theme }) => theme.colors.primary100};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary80};
  }
`;
