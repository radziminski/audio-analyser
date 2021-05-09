import { Center } from 'components/Box';
import { Heading5 } from 'components/Text';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FONT_WEIGHTS } from 'styles/theme';
import { Container } from './parts';

interface Props {
  onFileChange: (file: File) => void;
}

export const FileDropZone: React.FC<Props> = ({ onFileChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) onFileChange(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <Heading5 fontWeight={FONT_WEIGHTS.normal} fontSize='1rem'>
        {isDragActive
          ? 'Drop the file here!'
          : 'Drag & drop the file here, or click to select files manually'}
      </Heading5>
    </Container>
  );
};

export default FileDropZone;
