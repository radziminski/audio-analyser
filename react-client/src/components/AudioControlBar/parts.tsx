import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  background: #5a28ce;
  position: absolute;
  bottom: 0;
  right: 0;
  color: white;
  font-size: 32px;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }
`;
