import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  opacity: 0.82;
  transition: opacity 0.15s;
  position: relative;

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
  min-width: 160px;
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

export const Tooltip = styled.div`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.stickedFront};
  width: 300px;
  background-color: ${({ theme }) => theme.colors.background50};
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  top: -3rem;
  right: 1rem;
  overflow: hidden;

  animation: slide-in-bottom 0.2s;
`;

export const TooltipItem = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background50};
  padding: 1rem 2rem;
  transition: all 0.3s;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.light};
  opacity: 0.8;
  display: flex;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background70};
    opacity: 1;
  }
`;
