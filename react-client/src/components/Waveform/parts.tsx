import Box, { FlexBox } from '~/components/Box';
import { useElementDimensions } from '~/hooks';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { formatTime } from '~/utils/time';

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
  duration: number;
  tickHeight?: number;
  tickSpacing?: number;
  tickWidth?: number;
  tickColor?: string;
  tickOpacity?: number;
  tickStyle?: React.CSSProperties;
  subTickHeightMultiplier?: number;
  subTickWidthDifference?: number;
  ticksPerBar?: number;
  timestampFontSize?: number;
  timestampColor?: string;
  timestampStyle?: React.CSSProperties;
  timestampHeight?: number;
  containerStyle?: React.CSSProperties;
  containerPaddingX?: number;
}

// TODO: Reformat tick boxes into styled components

export const Timeline: React.FC<TimelineProps> = ({
  duration,
  tickHeight = 10,
  tickSpacing = 13,
  tickWidth = 2,
  tickColor = '#000000',
  tickOpacity = 0.75,
  tickStyle = {},
  subTickHeightMultiplier = 0.5,
  subTickWidthDifference = 1,
  ticksPerBar = 4,
  timestampFontSize = 14,
  timestampColor = '#000000',
  timestampStyle = {},
  timestampHeight = 20,
  containerStyle = {},
  containerPaddingX = 10
}) => {
  const [renderedDuration, setRenderedDuration] = useState(duration);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementDimensions(containerRef, true, 50);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (duration !== renderedDuration) setRenderedDuration(duration);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tickWidthWithSpacing = tickSpacing + tickWidth;
  const ticksNum = width
    ? Math.round((width - containerPaddingX) / tickWidthWithSpacing)
    : 0;
  const durationOverTicsNum = duration ? duration / ticksNum : 0;

  return (
    <FlexBox
      height={`${tickHeight + timestampHeight}px`}
      padding={`0 ${containerPaddingX}px`}
      ref={containerRef}
      style={{ ...containerStyle }}
    >
      {Array.from(Array(Math.round(ticksNum)).keys()).map((_, i) =>
        !ticksPerBar || ticksPerBar <= 0 || i % ticksPerBar === 0 ? (
          <Box position='relative' key={i}>
            <Box paddingBottom={'30px'}>
              <Box
                height={`${tickHeight}px`}
                background={tickColor}
                opacity={tickOpacity}
                width={`${tickWidth}px`}
                marginRight={`${tickSpacing}px`}
                style={{ ...tickStyle }}
              />
            </Box>
            <TickTimestamp
              height={timestampHeight}
              fontSize={timestampFontSize}
              color={timestampColor}
              style={{ ...timestampStyle }}
            >
              {formatTime(i * durationOverTicsNum)}
            </TickTimestamp>
          </Box>
        ) : (
            <Box
              key={i}
              height={`${tickSpacing * subTickHeightMultiplier}px`}
              background={tickColor}
              opacity={tickOpacity}
              width={`${tickWidth - subTickWidthDifference}px`}
              marginRight={`${tickSpacing + subTickWidthDifference}px`}
              style={{ ...tickStyle }}
            />
          )
      )}
    </FlexBox>
  );
};

export const TickTimestamp = styled.div<{
  height: number;
  fontSize: number;
  color: string;
}>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-70%);
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.color};
  height: ${(props) => props.height}px;
  font-size: ${(props) => props.fontSize}px;
`;
