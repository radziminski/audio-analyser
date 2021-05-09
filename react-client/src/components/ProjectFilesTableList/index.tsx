import TableList, { ITableListColumn } from 'components/TableList';
import { ROUTES } from 'constants/routes';
import { IFile } from 'global-state/project/types';
import React from 'react';
import { useHistory } from 'react-router';
import ProjectTableListElement from './ProjectFilesTableListElement';

const PROJECT_FILES_TABLE_COLUMNS: ITableListColumn[] = [
  {
    title: 'Name',
    width: 3
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
    width: 1,
    noArrow: true
  }
];

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

  return (
    <TableList
      columns={PROJECT_FILES_TABLE_COLUMNS}
      showMessage={!files || !files.length || !!error}
      errorMessage={error ?? 'There are no files in this project yet.'}
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
            onDelete={() => onDeleteFile(file.id)}
          />
        ))}
    </TableList>
  );
};

export default ProjectFilesTableList;
