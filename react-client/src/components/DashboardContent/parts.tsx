import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background50};
  margin-left: 400px;
  height: 100vh;
  position: relative;
`;

export const ScrollContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 50px;
  padding-bottom: 100px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  opacity: 0.85;
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
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
      background: ${({ theme }) => theme.colors.white};
      opacity: 0.5;
      border-radius: 50%;
    }
  }
`;

export const SubTitles = styled.div`
  display: flex;
`;
