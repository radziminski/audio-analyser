import ActionButton from '~/components/ActionButton';
import Box from '~/components/Box';
import DashboardContent from '~/components/DashboardContent';
import { ModalType } from '~/components/Modal/types';
import ProjectsTableList from '~/components/ProjectsTableList';
import { useStoreActions } from '~/global-state/hooks';
import React from 'react';

export const ProjectsView: React.FC = () => {
  const openModal = useStoreActions((state) => state.ui.openModal);

  return (
    <>
      <DashboardContent title='Projects'>
        <Box height='2rem' />

        <ProjectsTableList />

        <Box maxWidth='240px' margin='0 auto' marginTop='2rem'>
          <ActionButton
            padding='0.5rem 1rem'
            height='2.5rem'
            fontSize='0.8rem'
            onClick={() => openModal({ modal: ModalType.createProject })}
          >
            + Add new project
          </ActionButton>
        </Box>
      </DashboardContent>
    </>
  );
};

export default ProjectsView;
