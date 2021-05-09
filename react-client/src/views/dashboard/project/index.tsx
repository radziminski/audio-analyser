import ActionButton from 'components/ActionButton';
import Box, { Center } from 'components/Box';
import DashboardContent from 'components/DashboardContent';
import Loader from 'components/Loader';
import { ModalType } from 'components/Modal/types';
import ProjectFilesTableList from 'components/ProjectFilesTableList';
import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

export const ProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    project: { fetchProject },
    audio: { addAudioSources },
    ui: { openModal }
  } = useStoreActions((state) => state);
  const {
    project: { project: getProject }
  } = useStoreState((state) => state);

  const project = getProject(Number(id));

  const history = useHistory();

  const getCurrProject = async () => {
    try {
      await fetchProject(Number(id));
    } catch (error) {
      if (error.response?.status === 400)
        history.push(ROUTES.DASHBOARD_PROJECTS);
    }
  };

  useEffect(() => {
    if (!project) {
      getCurrProject();
    }
  }, [project, getCurrProject]);

  useEffect(() => {
    if (project?.files && project.files.length) {
      addAudioSources(
        project.files.reduce((acc, file) => {
          return {
            ...acc,
            [file.id]: file.url
          };
        }, {})
      );
    }
  }, [project?.files]);

  if (!project)
    return (
      <DashboardContent>
        <Center height='100%'>
          <Loader />
        </Center>
      </DashboardContent>
    );

  return (
    <>
      <DashboardContent
        title={project?.title ?? 'Project'}
        subTitles={[project?.description || '']}
        canGoBack
      >
        <Box height='2rem' />
        <ProjectFilesTableList files={project.files} />

        <Box maxWidth='240px' margin='0 auto' marginTop='2rem'>
          <ActionButton
            padding='0.5rem 1rem'
            height='2.5rem'
            fontSize='0.8rem'
            onClick={() =>
              openModal({
                modal: ModalType.addNewFile,
                args: { customArg: id }
              })
            }
          >
            + Add new file
          </ActionButton>
        </Box>
      </DashboardContent>
    </>
  );
};

export default ProjectView;
