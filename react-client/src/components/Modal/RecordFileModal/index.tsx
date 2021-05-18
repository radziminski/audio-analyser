import React, { useState } from 'react';
import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import { Heading5, Paragraph } from '~/components/Text';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import ModalWrapper from '../ModalWrapper';
import Icon from '~/components/Icon';
import { FONT_WEIGHTS } from '~/styles/theme';

interface Props {
  onClose: () => void;
  projectId: number;
}

const RecordFileModal: React.FC<Props> = ({ onClose, projectId }) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<boolean>();

  const { uploadProjectFile } = useStoreActions((state) => state.project);
  const { isLoadingProject } = useStoreState((state) => state.project);

  const onSave = () => {
    //
  };
  return (
    <ModalWrapper title='Record Audio Sample' onClose={onClose}>
      <Box marginBottom='3rem'>
        <Paragraph fontSize='0.8rem' textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum aasl.
        </Paragraph>
      </Box>
      <FlexBox flexDirection='column' alignItems='center' marginBottom='3rem'>
        <Icon icon='download' size={64} />
        <Heading5 fontWeight={FONT_WEIGHTS.medium}>Start Recording</Heading5>
      </FlexBox>

      {!file && (
        <Box marginBottom='2rem' height='20px'>
          <Paragraph fontSize='0.8rem' textAlign='center'>
            None audio recorded
          </Paragraph>
        </Box>
      )}

      <ActionButton
        isLoading={isLoadingProject === projectId}
        onClick={onSave}
        disabled={!file}
      >
        {file ? 'Save' : 'Record audio to proceed'}
      </ActionButton>
    </ModalWrapper>
  );
};

export default RecordFileModal;
