import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  opacity: 0.82;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary100};
  width: 48px;
  height: 48px;
  border-radius: 12px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-flex-start;
  justify-content: space-between;
  margin-left: 30px;
  color: white;
  padding: 2px;
`;

export const UpperTextContainer = styled.div`
  font-size: 14px;
  color: white;
  opacity: 0.45;
`;
export const LowerTextContainer = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: white;
`;

export const IconContainer = styled.div`
  display: flex;
  color: white;
  opacity: 0.45;
  margin-left: 26px;
`;
