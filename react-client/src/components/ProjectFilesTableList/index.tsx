import TableList, { ITableListColumn } from 'components/TableList';
import { ROUTES } from 'constants/routes';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import { IFile } from 'global-state/project/types';
import React from 'react';
import { useHistory } from 'react-router';
import ProjectTableListElement from './ProjectFilesTableListElement';

const PROJECT_FILES_TABLE_COLUMNS: ITableListColumn[] = [
  {
    title: 'Name',
    width: 2
  },
  {
    title: 'Size',
    width: 1
  },
  {
    title: 'Length',
    width: 1
  },
  {
    title: 'Created At',
    width: 2
  },

  {
    title: 'Actions',
    width: 2,
    noArrow: true
  }
];

interface Props {
  files: IFile[];
}

export const ProjectFilesTableList: React.FC<Props> = ({ files }) => {
  const { projects, fetchedAll, isLoading } = useStoreState(
    (state) => state.project
  );
  const {
    project: { fetchProjects, deleteProject },
    ui: { openModal, modifyModalArgs, closeModal }
  } = useStoreActions((state) => state);
  const history = useHistory();

  return (
    <TableList
      columns={PROJECT_FILES_TABLE_COLUMNS}
      isEmpty={!files || !files.length}
    >
      {files &&
        files.map((file, index) => (
          <ProjectTableListElement
            file={file}
            key={file.id}
            isEven={index % 2 === 0}
            onAnalyze={(id: number) => {
              history.push(
                ROUTES.DASHBOARD_ANALYSER.replace(':id', id.toString())
              );
            }}
            onDelete={(id: number) => {
              //
            }}
          />
        ))}
    </TableList>
  );
};

export default ProjectFilesTableList;
