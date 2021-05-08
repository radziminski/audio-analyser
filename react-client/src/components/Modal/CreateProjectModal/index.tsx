import ActionButton from 'components/ActionButton';
import Box from 'components/Box';
import Form from 'components/Form';
import { Paragraph } from 'components/Text';
import TextInput from 'components/TextInput';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useState } from 'react';
import Modal from '..';

interface Props {
  onClose?: () => void;
}

export const CreateProjectModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createProject = useStoreActions((state) => state.project.createProject);
  const { isLoading } = useStoreState((state) => state.project);

  const onSubmit = async () => {
    try {
      await createProject({ title, description });
      onClose && onClose();
    } catch (e) {
      /// TODO
    }
  };

  return (
    <Modal title='Create New Project' onClose={onClose}>
      <Box marginBottom='2rem'>
        <Paragraph fontSize='0.8rem' textAlign='center'>
          Eiusmod do proident mollit ad nulla officia duis magna magna dolor
          dolore. Consectetur esse id non aliqua non sunt Lorem.
        </Paragraph>
      </Box>
      <Form onSubmit={onSubmit}>
        <Box marginBottom='1rem'>
          <TextInput
            label='Title'
            placeholder='Ex. New Project'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        <Box marginBottom='3rem'>
          <TextInput
            label='Description'
            placeholder='Ex. New Project'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Box>
          <ActionButton isLoading={isLoading}>Confirm</ActionButton>
        </Box>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
