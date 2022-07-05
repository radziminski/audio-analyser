import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { ModalType } from '~/components/Modal/types';
import TableList, { ITableListColumn } from '~/components/TableList';
import { ROUTES } from '~/constants/routes';
import { useStoreActions, useStoreState } from '~/global-state/hooks';
import { IProject } from '~/global-state/project/types';

import ProjectTableListElement from './ProjectTableListElement';

export enum ProjectTableListLabel {
  Title = 'Title',
  Created = 'Created At',
  Edited = 'Edited At',
  Actions = 'Actions'
}
const PROJECT_TABLE_COLUMNS: ITableListColumn<ProjectTableListLabel>[] = [
  {
    title: ProjectTableListLabel.Title,
    width: 4
  },
  {
    title: ProjectTableListLabel.Created,
    width: 3
  },
  {
    title: ProjectTableListLabel.Edited,
    width: 3
  },
  {
    title: ProjectTableListLabel.Actions,
    width: 2,
    noArrow: true
  }
];

const isProjectTableListLabel = (
  label: string
): label is ProjectTableListLabel =>
  Object.values(ProjectTableListLabel).includes(label as ProjectTableListLabel);

const sortProjectsByLabel = (
  projects: IProject[],
  label: ProjectTableListLabel,
  reversed: boolean
) => {
  let sortedProjects = projects;
  if (label === ProjectTableListLabel.Title) {
    sortedProjects = projects.sort((projectA, projectB) =>
      projectA.title.localeCompare(projectB.title)
    );
  }

  if (label === ProjectTableListLabel.Created) {
    sortedProjects = projects.sort((projectA, projectB) =>
      projectA.createdAt.localeCompare(projectB.createdAt)
    );
  }

  if (label === ProjectTableListLabel.Edited) {
    sortedProjects = projects.sort((projectA, projectB) =>
      (projectA.editedAt || '').localeCompare(projectB?.editedAt ?? '')
    );
  }

  if (reversed) return sortedProjects.reverse();

  return sortedProjects;
};

interface Props {
  projectsShownLimit?: number;
}

export const ProjectsTableList: React.FC<Props> = ({ projectsShownLimit }) => {
  const [error, setError] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<ProjectTableListLabel>(
    projectsShownLimit
      ? ProjectTableListLabel.Edited
      : ProjectTableListLabel.Created
  );
  const [sortDescending, setSortDescending] = useState<boolean>(
    !!projectsShownLimit
  );

  const { projects, fetchedAll, isLoading } = useStoreState(
    (state) => state.project
  );
  const {
    project: { fetchProjects, deleteProject },
    ui: { openModal, modifyModalArgs, closeModal }
  } = useStoreActions((state) => state);
  const history = useHistory();

  const shownProjects =
    projects && projectsShownLimit
      ? sortProjectsByLabel(
          sortProjectsByLabel(projects, ProjectTableListLabel.Created, true),
          ProjectTableListLabel.Edited,
          true
        ).slice(0, projectsShownLimit)
      : projects;

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
        onLabelClick={(label) => {
          if (label === ProjectTableListLabel.Actions) return;
          if (label === selectedLabel) {
            setSortDescending(!sortDescending);
            return;
          }

          setSortDescending(false);
          setSelectedLabel(
            isProjectTableListLabel(label) ? label : ProjectTableListLabel.Title
          );
        }}
        selectedLabelArrowReversed={!sortDescending}
        selectedLabel={selectedLabel}
      >
        {shownProjects &&
          sortProjectsByLabel(shownProjects, selectedLabel, sortDescending).map(
            (project, index) => (
              <ProjectTableListElement
                project={project}
                key={project.id}
                isEven={index % 2 === 0}
                onEnter={onEnterProject}
                onDelete={onDeleteProject}
              />
            )
          )}
      </TableList>
    </>
  );
};

export default ProjectsTableList;
