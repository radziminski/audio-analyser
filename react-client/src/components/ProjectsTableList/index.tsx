import { ModalType } from 'components/Modal/types';
import TableList, { ITableListColumn } from 'components/TableList';
import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ProjectTableListElement from './ProjectTableListElement';

const PROJECT_TABLE_COLUMNS: ITableListColumn[] = [
  {
    title: 'Title',
    width: 4
  },
  {
    title: 'Created At',
    width: 3
  },
  {
    title: 'Edited At',
    width: 3
  },
  {
    title: 'Actions',
    width: 2,
    noArrow: true
  }
];

export const ProjectsTableList: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { projects, fetchedAll, isLoading } = useStoreState(
    (state) => state.project
  );
  const {
    project: { fetchProjects, deleteProject },
    ui: { openModal, modifyModalArgs, closeModal }
  } = useStoreActions((state) => state);
  const history = useHistory();

  const onEnterProject = useCallback(
    (id: number) => {
      history.push(ROUTES.DASHBOARD_PROJECT.replace(':id', id.toString()));
    },
    [history]
  );

  const getProjects = useCallback(async () => {
    setError(null);
    try {
      await fetchProjects();
    } catch (error) {
      setError(
        'There was a problem with fetching the projects. Reload the page to try again.'
      );
    }
  }, [setError, fetchProjects]);

  const onDeleteProject = (id: number) => {
    openModal({
      modal: ModalType.confirmAction,
      args: {
        title: 'Are you sure about deleting this project?',
        message: 'This action cannot be undone.',
        onConfirm: async () => {
          try {
            modifyModalArgs({ isActionLoading: true, error: undefined });
            await deleteProject(id);
            closeModal();
          } catch (err) {
            modifyModalArgs({
              error:
                'There was a problem with deleting the project. Try again later.',
              isActionLoading: false
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!projects || !fetchedAll) getProjects();
  }, [projects, fetchedAll, getProjects]);

  return (
    <>
      <TableList
        columns={PROJECT_TABLE_COLUMNS}
        isLoading={isLoading}
        showMessage={!projects || !projects.length || !!error}
        errorMessage={error ?? 'No projects to show.'}
      >
        {projects &&
          projects.map((project, index) => (
            <ProjectTableListElement
              project={project}
              key={project.id}
              isEven={index % 2 === 0}
              onEnter={onEnterProject}
              onDelete={onDeleteProject}
            />
          ))}
      </TableList>
    </>
  );
};

export default ProjectsTableList;
