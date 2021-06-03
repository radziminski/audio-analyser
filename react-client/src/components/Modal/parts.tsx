import React from 'react';
import styled from 'styled-components';
import { COLORS, FONT_WEIGHTS } from '~/styles/theme';
import Box from '../Box';
import { Paragraph } from '../Text';

export const Container = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modalMiddle};
  background-color: ${({ theme }) => theme.colors.background70};
  color: ${({ theme }) => theme.colors.white};
  width: 612px;
  border-radius: 12px;
  padding: 3rem;
  animation: fade-in 0.2s ease-out;
  animation-fill-mode: forwards;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

interface ModalErrorMessageProps {
  error?: string | null;
}

export const ModalErrorMessage: React.FC<ModalErrorMessageProps> = ({
  error
}) => {
  if (!error) return null;

  return (
    <Box marginBottom='1.5rem'>
      <Paragraph
        fontSize='0.8rem'
        textAlign='center'
        color={COLORS.danger100}
        fontWeight={FONT_WEIGHTS.medium}
      >
        {error}
      </Paragraph>
    </Box>
  );
};
