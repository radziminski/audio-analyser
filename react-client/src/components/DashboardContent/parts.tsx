import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
  background: ${({ theme }) => theme.colors.background50};
  margin-left: 400px;
  min-height: 100vh;
  position: relative;
`;

export const Title = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 400;
  opacity: 0.85;
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  color: white;
  font-weight: 300;
  opacity: 0.5;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    &::after {
      margin: 0 10px;
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: white;
      opacity: 0.5;
      border-radius: 50%;
    }
  }
`;

export const SubTitles = styled.div`
  display: flex;
`;
