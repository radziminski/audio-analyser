import TableList, { ITableListColumn } from '~/components/TableList';
import { ROUTES } from '~/constants/routes';
import { IFile } from '~/global-state/project/types';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ProjectTableListElement from './ProjectFilesTableListElement';

export enum ProjectFileTableListLabel {
  Name = 'Name',
  Size = 'Size',
  Created = 'Created At',
  Actions = 'Actions'
}

const PROJECT_FILES_TABLE_COLUMNS: ITableListColumn<ProjectFileTableListLabel>[] =
  [
    {
      title: ProjectFileTableListLabel.Name,
      width: 3
    },
    {
      title: ProjectFileTableListLabel.Size,
      width: 1
    },
    {
      title: ProjectFileTableListLabel.Created,
      width: 2
    },

    {
      title: ProjectFileTableListLabel.Actions,
      width: 1,
      noArrow: true
    }
  ];

const sortFilesByLabel = (
  projects: IFile[],
  label: ProjectFileTableListLabel,
  reversed: boolean
) => {
  let sortedProjects = projects;
  if (label === ProjectFileTableListLabel.Name) {
    sortedProjects = projects.sort((projectA, projectB) =>
      projectA.name.localeCompare(projectB.name)
    );
  }

  if (label === ProjectFileTableListLabel.Size) {
    sortedProjects = projects.sort(
      (projectA, projectB) => projectA.size - projectB.size
    );
  }

  if (label === ProjectFileTableListLabel.Created) {
    sortedProjects = projects.sort((projectA, projectB) =>
      (projectA.createdAt || '').localeCompare(projectB?.createdAt ?? '')
    );
  }

  if (reversed) return sortedProjects.reverse();

  return sortedProjects;
};

const isProjectFileTableListLabel = (
  label: string
): label is ProjectFileTableListLabel =>
  Object.values(ProjectFileTableListLabel).includes(
    label as ProjectFileTableListLabel
  );

interface Props {
  files: IFile[];
  onDeleteFile: (id: number) => void;
  error?: string;
}

export const ProjectFilesTableList: React.FC<Props> = ({
  files,
  error,
  onDeleteFile
}) => {
  const history = useHistory();
  const [selectedLabel, setSelectedLabel] = useState<ProjectFileTableListLabel>(
    ProjectFileTableListLabel.Created
  );
  const [sortDescending, setSortDescending] = useState<boolean>(false);

  return (
    <TableList
      columns={PROJECT_FILES_TABLE_COLUMNS}
      showMessage={!files || !files.length || !!error}
      errorMessage={error ?? 'There are no files in this project yet.'}
      selectedLabel={selectedLabel}
      selectedLabelArrowReversed={!sortDescending}
      onLabelClick={(label) => {
        if (label === ProjectFileTableListLabel.Actions) return;
        if (label === selectedLabel) {
          setSortDescending(!sortDescending);
          return;
        }

        setSortDescending(false);
        setSelectedLabel(
          isProjectFileTableListLabel(label)
            ? label
            : ProjectFileTableListLabel.Name
        );
      }}
    >
      {files &&
        sortFilesByLabel(files, selectedLabel, sortDescending).map(
          (file, index) => (
            <ProjectTableListElement
              file={file}
              key={file.id}
              isEven={index % 2 === 0}
              onAnalyze={(id: number) => {
                history.push(
                  ROUTES.DASHBOARD_ANALYSER.replace(':id', id.toString())
                );
              }}
              onDelete={() => onDeleteFile(file.id)}
            />
          )
        )}
    </TableList>
  );
};

export default ProjectFilesTableList;
