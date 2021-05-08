import { Center } from 'components/Box';
import Loader from 'components/Loader';
import TableList, { ITableListColumn } from 'components/TableList';
import { useStoreActions, useStoreState } from 'global-state/hooks';
import React, { useEffect } from 'react';
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
  const { fetchProjects } = useStoreActions((state) => state.project);

  useEffect(() => {
    if (!projects || !fetchedAll) fetchProjects();
    console.log(projects);
  }, [projects]);

  if (isLoading)
    return (
      <>
        <TableList columns={PROJECT_TABLE_COLUMNS} />
        <Center marginY='4rem'>
          <Loader />
        </Center>
      </>
    );

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
