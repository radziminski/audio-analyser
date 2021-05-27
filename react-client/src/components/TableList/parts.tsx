import styled from 'styled-components';

import React from 'react';
import Box, { FlexBox } from '~/components/Box';
import Icon from '~/components/Icon';
import Text from '~/components/Text';
import { COLORS } from '~/styles/theme';
import ActionButton, { ButtonType } from '../ActionButton';

export const TableListButton: React.FC<{
  onClick: () => void;
  type?: ButtonType;
  width?: string;
}> = ({ children, onClick, type, width }) => {
  return (
    <Box width={width ?? '90px'} marginRight='1rem'>
      <ActionButton
        type={type}
        height='2rem'
        padding='0'
        fontSize='0.8rem'
        borderRadius='6px'
        onClick={() => onClick()}
      >
        {children}
      </ActionButton>
    </Box>
  );
};

export const Container = styled.div<{
  columnsWidths: number[];
  maxHeight?: string;
}>`
  display: grid;
  width: 100%;
  grid-template-columns: ${({ columnsWidths }) =>
    columnsWidths.map((width) => width + 'fr ')};
  max-height: ${({ maxHeight }) => maxHeight};
`;

export const Label: React.FC<{ text: string; noArrow?: boolean }> = ({
  text,
  noArrow
}) => {
  return (
    <FlexBox
      alignItems='center'
      cursor={noArrow ? 'auto' : 'pointer'}
      paddingBottom='1rem'
    >
      <Box marginRight='1rem'>
        <Text color={COLORS.white}>{text}</Text>
      </Box>
      {!noArrow && <Icon icon='arrow-down-fill' size={14} />}
    </FlexBox>
  );
};
