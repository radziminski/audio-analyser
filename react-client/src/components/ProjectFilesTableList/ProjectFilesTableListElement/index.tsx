import ActionButton from 'components/ActionButton';
import Box, { FlexBox } from 'components/Box';
import Text from 'components/Text';
import { ROUTES } from 'constants/routes';
import { IFile } from 'global-state/project/types';
import React from 'react';
import { useHistory } from 'react-router';
import { Field } from './parts';

interface Props {
  file: IFile;
  isEven?: boolean;
}

const formatDate = (date: string) => date?.replace('T', ' ').split('.')[0];

export const ProjectFileTableListElement: React.FC<Props> = ({
  file,
  isEven
}) => {
  const history = useHistory();

  return (
    <>
      <Field padding='1.5rem 1rem' differentColor={isEven}>
        <Box marginBottom='0.2rem'>
          <Text fontSize='1.2rem'>{file.name}</Text>
        </Box>
        {file.originalName && (
          <Text fontSize='0.6rem'>{file.originalName}</Text>
        )}
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{file.size}</Text>
      </Field>
      <Field differentColor={isEven}>
        <Text fontSize='0.9rem'>{file.length}</Text>
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
              onClick={() => {
                history.push(
                  ROUTES.DASHBOARD_ANALYSER.replace(':id', file.id.toString())
                );
              }}
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
