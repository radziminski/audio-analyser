import ActionButton from 'components/ActionButton';
import Box from 'components/Box';
import DashboardContent from 'components/DashboardContent';
import CreateProjectModal from 'components/Modal/CreateProjectModal';
import ProjectsTableList from 'components/ProjectsTableList';
import React, { useState } from 'react';

export const ProjectsView: React.FC = () => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

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
            onClick={() => setShowCreateProjectModal(true)}
          >
            + Add new project
          </ActionButton>
        </Box>
      </DashboardContent>

      {showCreateProjectModal && (
        <CreateProjectModal onClose={() => setShowCreateProjectModal(false)} />
      )}
    </>
  );
};

export default ProjectsView;
