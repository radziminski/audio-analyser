import ActionButton from 'components/ActionButton';
import Box from 'components/Box';
import FileDropZone from 'components/FileDropZone';
import { Paragraph } from 'components/Text';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useState } from 'react';
import ModalWrapper from '../ModalWrapper';

interface Props {
  onClose?: () => void;
  projectId: number;
}

export const AddFileModal: React.FC<Props> = ({ onClose, projectId }) => {
  const [file, setFile] = useState<File>();

  const { uploadProjectFile } = useStoreActions((state) => state.project);
  const { isLoadingProject } = useStoreState((state) => state.project);

  const onFileChange = (newFile: File) => {
    setFile(newFile);
  };

  const onUpload = async () => {
    if (!file) return;

    try {
      const project = await uploadProjectFile({ id: projectId, file });
      console.log(project);
    } catch (error) {
      //TODO
    }
  };

  return (
    <ModalWrapper title='Add new file to the project' onClose={onClose}>
      <Box>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum aasl.
        </Paragraph>
      </Box>

      <Box marginY='2rem'>
        <FileDropZone onFileChange={onFileChange} />
      </Box>

      <ActionButton
        isLoading={isLoadingProject === projectId}
        onClick={onUpload}
      >
        Upload
      </ActionButton>
    </ModalWrapper>
  );
};

export default AddFileModal;
