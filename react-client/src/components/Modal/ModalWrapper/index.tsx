import Box from 'components/Box';
import Icon from 'components/Icon';
import { ModalOverlay } from 'components/ModalOverlay';
import { Heading3 } from 'components/Text';
import React from 'react';
import { COLORS, FONT_WEIGHTS } from 'styles/theme';
import { Container } from '../parts';

interface Props {
  title?: string;
  onClose?: () => void;
  blockClose?: () => void;
}

export const ModalWrapper: React.FC<Props> = ({
  children,
  title,
  onClose,
  blockClose
}) => {
  return (
    <>
      <Container>
        {title && (
          <Box
            marginBottom='1rem'
            textAlign='center'
            maxWidth='90%'
            marginX='auto'
          >
            <Heading3 color={COLORS.white} fontWeight={FONT_WEIGHTS.medium}>
              {title}
            </Heading3>
          </Box>
        )}
        {children}
        {!blockClose && (
          <Box
            position='absolute'
            top='1.5rem'
            right='1.5rem'
            onClick={onClose}
            cursor='pointer'
          >
            <Icon icon='close' />
          </Box>
        )}
      </Container>
      <ModalOverlay isVisible={true} onClick={onClose} />
    </>
  );
};

export default ModalWrapper;
