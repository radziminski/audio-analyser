import ActionButton from 'components/ActionButton';
import Box, { FlexBox } from 'components/Box';
import { Paragraph } from 'components/Text';
import React from 'react';
import Modal from '../ModalWrapper';

interface Props {
  title: string;
  message?: string;
  isActionLoading?: boolean;
  onConfirm?: () => void;
  onDismiss?: () => void;
}

export const ConfirmActionModal: React.FC<Props> = ({
  title,
  message,
  isActionLoading,
  onConfirm,
  onDismiss
}) => {
  return (
    <Modal title={title} onClose={onDismiss}>
      {message && (
        <Box marginTop='2rem' textAlign='center'>
          <Paragraph>{message}</Paragraph>
        </Box>
      )}
      <FlexBox width='100%' marginTop='4rem' justifyContent='space-between'>
        <Box marginRight='2rem' width='calc(50% - 1rem)'>
          <ActionButton onClick={onDismiss}>Cancel</ActionButton>
        </Box>
        <ActionButton
          type='danger'
          isLoading={isActionLoading}
          onClick={onConfirm}
        >
          Confirm
        </ActionButton>
      </FlexBox>
    </Modal>
  );
};

export default ConfirmActionModal;
