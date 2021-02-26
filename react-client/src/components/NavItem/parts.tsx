import styled from 'styled-components';

export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  width: 300px;
  background: ${(props) =>
    props.selected ? props.theme.colors.background50 : 'transparent'};
  border-radius: 10px;
  padding: 12px 30px;
  font-size: 18px;
  color: white;
  font-weight: 400;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${(props) => props.theme.colors.background50};
  }
`;
