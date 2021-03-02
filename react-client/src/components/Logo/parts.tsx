import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const LogoIcon = styled.div`
  display: flex;
  width: 46px;
  height: 46px;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: white;
  background: ${({ theme }) => theme.colors.primary100};
  font-weight: 600;
  border-radius: 10px;
  user-select: none;
`;

export const LogoText = styled.div`
  font-size: 24px;
  color: white;
  font-weight: 500;
  margin-left: 18px;
`;
