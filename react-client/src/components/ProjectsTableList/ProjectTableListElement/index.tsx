import React from 'react';

import Box, { FlexBox } from '~/components/Box';
import { TableListButton } from '~/components/TableList/parts';
import Text from '~/components/Text';
import { IProject } from '~/global-state/project/types';

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
          <TableListButton
            onClick={() => onEnter(project.id)}
          >
            Enter
            </TableListButton>
          <TableListButton
            type='danger'
            onClick={() => onDelete(project.id)}
          >
            Delete
            </TableListButton>
        </FlexBox>
      </Field>
    </>
  );
};

export default ProjectTableListElement;
