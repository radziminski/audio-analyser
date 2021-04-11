import { Center } from 'components/Box';
import DashboardContent from 'components/DashboardContent';
import React from 'react';
export const ProjectsView: React.FC = () => {
  return (
    <>
      <DashboardContent title='Projects'>
        Projects here
        <Center color='orangered'>
          LIST OF PROJECTS WITH DIFFERENT AUDIO FILES TO ANALYZE WILL BE HERE
        </Center>
      </DashboardContent>
    </>
  );
};

export default ProjectsView;
