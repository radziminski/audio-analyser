import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 500px;
  width: 70px;
  background: ${({ theme }) => theme.colors.background20};
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

export const CanvasContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const VolumeValueTagContainer = styled.div<{ value: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ffffff;
  color: ${(props) => (props.value > 30 ? 'transparent' : '#ffffff')};
  opacity: 0.4;
  font-size: ${(props) =>
    props.value < 12 ? 14 : 14 - (props.value / 3 - 3)}px;
  font-weight: 200;
  padding: 3px;
  width: 20px;
`;

interface Props {
  value: number;
  width?: number;
}
export const VolumeValueTag: React.FC<Props> = ({ value }) => {
  return (
    <VolumeValueTagContainer value={value}>{value}</VolumeValueTagContainer>
  );
};

export default VolumeValueTag;
