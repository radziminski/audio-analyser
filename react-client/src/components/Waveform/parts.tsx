import Box, { FlexBox } from 'components/Box';
import React from 'react';
import styled from 'styled-components';
import { formatTime } from 'utils/time';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
`;

export const WaveformContainer = styled.div`
  background: ${({ theme }) => theme.colors.background70};
  padding: 10px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2px;
`;

interface TimelineProps {
  containerWidth: number;
  height: number;
  tickSpacing?: number;
  tickWidth?: number;
  duration: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  containerWidth,
  height,
  duration,
  tickSpacing = 13,
  tickWidth = 2
}) => {
  const tickWidthWithSpacing = tickSpacing + tickWidth;
  const ticksNum = containerWidth / tickWidthWithSpacing;
  const durationOverTicsNum = duration / ticksNum;

  return (
    <FlexBox height={`${height + 22}px`} padding='0 10px'>
      {Array.from(Array(Math.round(ticksNum)).keys()).map((_, i) =>
        i % 4 === 0 ? (
          <Box position='relative'>
            <Box paddingBottom={'30px'}>
              <Box
                key={i}
                height={`${height}px`}
                background='#fff'
                opacity={0.75}
                width={`${tickWidth}px`}
                marginRight={`${tickSpacing}px`}
              />
            </Box>
            <TickTime>{formatTime(i * durationOverTicsNum)}</TickTime>
          </Box>
        ) : (
          <Box
            key={i}
            height={`${height * 0.5}px`}
            background='#fff'
            opacity={0.75}
            width={`${tickWidth - 1}px`}
            marginRight={`${tickSpacing + 1}px`}
          />
        )
      )}
    </FlexBox>
  );
};

export const TickTime = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 12px;
`;
