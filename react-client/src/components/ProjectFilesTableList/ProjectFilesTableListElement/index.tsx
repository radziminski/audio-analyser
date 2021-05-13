import ActionButton from '~/components/ActionButton';
import Box, { FlexBox } from '~/components/Box';
import Text from '~/components/Text';
import { IFile } from '~/global-state/project/types';
import React from 'react';
import { Field } from './parts';

interface Props {
  file: IFile;
  onAnalyze: (id: number) => void;
  onDelete: (id: number) => void;
  isEven?: boolean;
}

const formatDate = (date: string) => date?.replace('T', ' ').split('.')[0];

const formatSubtitle = (text: string, threshold = 90) => {
  if (text.length < threshold) return text;
  return text.slice(0, threshold - 3) + '...';
};

const formatSize = (size: number) => {
  if (size < 1024) return size + ' B';
  if (size < 1024 * 1024) return Math.round((size / 1024) * 10) / 10 + ' KB';
  if (size < 1024 * 1024 * 1024)
    return Math.round((size / (1024 * 1024)) * 10) / 10 + ' MB';
};

export const ProjectFileTableListElement: React.FC<Props> = ({
  file,
  isEven,
  onAnalyze,
  onDelete
}) => {
  return (
    <>
      <Field padding='1.5rem 1rem' differentColor={isEven}>
        <Box marginBottom='0.2rem'>
          <Text
            as='div'
            fontSize='1.2rem'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            overflow='hidden'
            maxWidth='250px'
          >
            {file.name}
          </Text>
        </Box>
        {file.originalName && (
          <Text
            fontSize='0.6rem'
            as='div'
            textOverflow='ellipsis'
            maxWidth='250px'
          >
            {formatSubtitle(file.originalName)}
          </Text>
        )}
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{formatSize(file.size)}</Text>
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{file.length ?? '[Length will be here]'}</Text>
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>
          {file.createdAt ? formatDate(file.createdAt) : 'Unknown'}
        </Text>
      </Field>

      <Field differentColor={isEven}>
        <FlexBox>
          <Box width='90px' marginRight='1rem'>
            <ActionButton
              height='2rem'
              padding='0'
              fontSize='0.8rem'
              borderRadius='6px'
              onClick={() => onAnalyze(file.id)}
            >
              Analyze!
            </ActionButton>
          </Box>
          <Box width='90px' marginRight='1rem'>
            <ActionButton
              type='danger'
              height='2rem'
              padding='0'
              fontSize='0.8rem'
              borderRadius='6px'
              onClick={() => onDelete(file.id)}
            >
              Delete
            </ActionButton>
          </Box>
        </FlexBox>
      </Field>
    </>
  );
};

export default ProjectFileTableListElement;
