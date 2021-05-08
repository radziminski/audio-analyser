import { CreateProjectDto } from './../../dtos/project/create-project-dto';
import { IProject, IProjectState } from './types';
import ProjectService from './../../services/ProjectService';
import { action, thunk } from 'easy-peasy';

const projectState: IProjectState = {
  projects: null,
  isLoading: false,

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setProjects: action((state, payload) => {
    state.projects = payload;
  }),

  clearProjects: action((state) => {
    state.projects = null;
    state.isLoading = false;
  }),

  fetchProjects: thunk(async (actions) => {
    actions.setIsLoading(true);

    try {
      const projectsDto = await ProjectService.fetchMyProjects();

      const projects: IProject[] = projectsDto.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        createdAt: project.createdAt,
        editedAt: project.editedAt,
        files: project.files.map((file) => file.file),
        users: project.users.map((user) => ({
          id: user.user?.id,
          email: user.user?.email,
          profileId: user.user?.profile?.id,
          roles: user.user?.roles
        }))
      }));

      actions.setProjects(projects);

      return projects;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoading(false);
    }
  }),

  createProject: thunk(async (actions, payload, helpers) => {
    actions.setIsLoading(true);

    try {
      const createProjectDto: CreateProjectDto = { ...payload };

      const project = await ProjectService.createProject(createProjectDto);

      actions.setProjects([
        ...(helpers.getState().projects ?? []),
        {
          id: project.id,
          title: project.title,
          description: project.description,
          createdAt: project.createdAt,
          users: [],
          files: []
        }
      ]);

      return project;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoading(false);
    }
  })
};

export default projectState;
