import ActionButton from 'components/ActionButton';
import Box, { FlexBox } from 'components/Box';
import Text from 'components/Text';
import { IProject } from 'global-state/project/types';
import React from 'react';
import { Field } from './parts';

interface Props {
  project: IProject;
  onEnter: (id: number) => void;
  onDelete: (id: number) => void;
  isEven?: boolean;
}

const formatDate = (date: string) => date?.replace('T', ' ').split('.')[0];

export const ProjectTableListElement: React.FC<Props> = ({
  project,
  isEven,
  onEnter,
  onDelete
}) => {
  return (
    <>
      <Field padding='1.5rem 1rem' differentColor={isEven}>
        <Box marginBottom='0.2rem'>
          <Text fontSize='1.2rem'>{project.title}</Text>
        </Box>
        {project.description && (
          <Text fontSize='0.6rem'>{project.description}</Text>
        )}
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{formatDate(project.createdAt)}</Text>
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{formatDate(project.editedAt ?? 'never')}</Text>
      </Field>
      <Field differentColor={isEven}>
        <FlexBox>
          <Box width='90px' marginRight='1rem'>
            <ActionButton
              height='2rem'
              padding='0'
              fontSize='0.8rem'
              onClick={() => onEnter(project.id)}
              borderRadius='6px'
            >
              Enter
            </ActionButton>
          </Box>
          <Box width='90px' marginRight='1rem'>
            <ActionButton
              type='danger'
              height='2rem'
              padding='0'
              fontSize='0.8rem'
              borderRadius='6px'
              onClick={() => onDelete(project.id)}
            >
              Delete
            </ActionButton>
          </Box>
        </FlexBox>
      </Field>
    </>
  );
};

export default ProjectTableListElement;
