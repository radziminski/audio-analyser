import styled from 'styled-components';

export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  width: 300px;
  background: ${(props) =>
    props.selected ? props.theme.colors.background50 : 'transparent'};
  border-radius: 8px;
  padding: 12px 30px;
  font-size: 18px;
  color: white;
  font-weight: 400;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.15s;
  align-items: center;
  opacity: ${(props) => (props.selected ? 1 : 0.45)};

  &:hover {
    background: ${(props) => props.theme.colors.background50};
  }
`;
