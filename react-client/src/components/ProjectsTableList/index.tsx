import TableList, { ITableListColumn } from 'components/TableList';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect } from 'react';
import ProjectTableListElement from './ProjectTableListElement';

const PROJECT_TABLE_COLUMNS: ITableListColumn[] = [
  {
    title: 'Title',
    width: 3
  },
  {
    title: 'Created At',
    width: 2
  },
  {
    title: 'Edited At',
    width: 2
  },
  {
    title: 'Link ',
    width: 1,
    noArrow: true
  }
];

export const ProjectsTableList: React.FC = () => {
  const { projects } = useStoreState((state) => state.project);
  const { fetchProjects } = useStoreActions((state) => state.project);

  useEffect(() => {
    if (!projects) fetchProjects();
    console.log(projects);
  }, [projects]);

  return (
    <TableList columns={PROJECT_TABLE_COLUMNS}>
      {projects &&
        projects.map((project, index) => (
          <ProjectTableListElement
            project={project}
            key={project.id}
            isEven={index % 2 === 0}
          />
        ))}
    </TableList>
  );
};

export default ProjectsTableList;
