import ActionButton from 'components/ActionButton';
import Box from 'components/Box';
import FileDropZone from 'components/FileDropZone';
import Text, { Paragraph } from 'components/Text';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useState } from 'react';
import { COLORS, FONT_WEIGHTS } from 'styles/theme';
import ModalWrapper from '../ModalWrapper';

interface Props {
  onClose?: () => void;
  projectId: number;
}

export const AddFileModal: React.FC<Props> = ({ onClose, projectId }) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<boolean>();

  const { uploadProjectFile } = useStoreActions((state) => state.project);
  const { isLoadingProject } = useStoreState((state) => state.project);

  const onFileChange = (newFile: File) => {
    setFile(newFile);
  };

  const onUpload = async () => {
    if (!file) return;
    setError(false);
    try {
      await uploadProjectFile({ id: projectId, file });

      onClose && onClose();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <ModalWrapper title='Add new file to the project' onClose={onClose}>
      <Box>
        <Paragraph fontSize='0.8rem' textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum aasl.
        </Paragraph>
      </Box>

      <Box marginY='2rem'>
        <FileDropZone
          onFileChange={onFileChange}
          disabled={isLoadingProject === projectId}
        />
      </Box>

      {!file && (
        <Box marginBottom='2rem' height='20px'>
          <Paragraph fontSize='0.8rem' textAlign='center'>
            None file selected
          </Paragraph>
        </Box>
      )}
      {file && (
        <Box marginBottom='2rem'>
          <Paragraph fontSize='1rem' textAlign='center'>
            <Text fontWeight={FONT_WEIGHTS.medium}>Selected file: </Text>
            {file.name}
          </Paragraph>
        </Box>
      )}

      {error && (
        <Box marginBottom='1.5rem'>
          <Paragraph
            fontSize='0.8rem'
            textAlign='center'
            color={COLORS.danger100}
            fontWeight={FONT_WEIGHTS.medium}
          >
            There was a problem with uploading the file. Try again later.
          </Paragraph>
        </Box>
      )}
      <ActionButton
        isLoading={isLoadingProject === projectId}
        onClick={onUpload}
        disabled={!file}
      >
        {file ? 'Upload' : 'Choose file to proceed'}
      </ActionButton>
    </ModalWrapper>
  );
};

export default AddFileModal;
