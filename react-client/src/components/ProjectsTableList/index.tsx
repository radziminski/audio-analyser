import { ModalType } from 'components/Modal/types';
import TableList, { ITableListColumn } from 'components/TableList';
import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useCallback, useEffect } from 'react';
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
  const { projects, fetchedAll, isLoading } = useStoreState(
    (state) => state.project
  );
  const {
    project: { fetchProjects, deleteProject },
    ui: { openModal, modifyModalArgs, closeModal }
  } = useStoreActions((state) => state);
  const history = useHistory();

  const onEnterProject = useCallback((id: number) => {
    history.push(ROUTES.DASHBOARD_PROJECT.replace(':id', id.toString()));
  }, []);

  const onDeleteProject = (id: number) => {
    openModal({
      modal: ModalType.confirmAction,
      args: {
        title: 'Are you sure about deleting this project?',
        message: 'This action cannot be undone.',
        onConfirm: async () => {
          try {
            modifyModalArgs({ isActionLoading: true });
            await deleteProject(id);
            closeModal();
          } catch (err) {
            // TODO err
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!projects || !fetchedAll) fetchProjects();
    console.log(projects);
  }, [projects]);

  return (
    <>
      <TableList
        columns={PROJECT_TABLE_COLUMNS}
        isLoading={isLoading}
        isEmpty={!projects || !projects.length}
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
