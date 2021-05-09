import { CreateProjectDto } from './../../dtos/project/create-project-dto';
import { IProject, IProjectState } from './types';
import ProjectService from './../../services/ProjectService';
import { action, thunk, computed } from 'easy-peasy';

const projectState: IProjectState = {
  projects: null,
  isLoading: false,
  isLoadingProject: null,
  fetchedAll: false,

  project: computed((state) => (id: number) =>
    state.projects?.find((p) => p.id === id)
  ),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setIsLoadingProject: action((state, payload) => {
    state.isLoadingProject = payload;
  }),

  setProjects: action((state, payload) => {
    state.projects = payload;
  }),

  setFetchedAll: action((state, payload) => {
    state.fetchedAll = payload;
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
      actions.setFetchedAll(true);

      return projects;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoading(false);
    }
  }),

  fetchProject: thunk(async (actions, payload, helpers) => {
    actions.setIsLoadingProject(payload);

    try {
      const projectDto = await ProjectService.fetchProject(payload);

      const project: IProject = {
        id: projectDto.id,
        title: projectDto.title,
        description: projectDto.description,
        createdAt: projectDto.createdAt,
        editedAt: projectDto.editedAt,
        files: projectDto.files.map((file) => file.file),
        users: projectDto.users.map((user) => ({
          id: user.user?.id,
          email: user.user?.email,
          profileId: user.user?.profile?.id,
          roles: user.user?.roles
        }))
      };

      actions.setProjects([...(helpers.getState().projects ?? []), project]);

      return project;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoadingProject(null);
    }
  }),

  createProject: thunk(async (actions, payload, helpers) => {
    actions.setIsLoadingProject(true);

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
      actions.setIsLoadingProject(null);
    }
  }),

  deleteProject: thunk(async (actions, payload, helpers) => {
    actions.setIsLoadingProject(payload);
    try {
      const id = payload;

      await ProjectService.deleteProject(id);

      const newProjects = helpers
        .getState()
        ?.projects?.filter((project) => project.id !== id);

      actions.setProjects(newProjects || []);

      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoadingProject(null);
    }
  }),

  uploadProjectFile: thunk(async (actions, payload, helpers) => {
    const { id, file } = payload;
    actions.setIsLoadingProject(id);

    try {
      const projectDto = await ProjectService.uploadProjectFile(id, file);

      const project: IProject = {
        id: projectDto.id,
        title: projectDto.title,
        description: projectDto.description,
        createdAt: projectDto.createdAt,
        editedAt: projectDto.editedAt,
        files: projectDto.files.map((file) => file.file),
        users: projectDto.users.map((user) => ({
          id: user.user?.id,
          email: user.user?.email,
          profileId: user.user?.profile?.id,
          roles: user.user?.roles
        }))
      };

      actions.setProjects([
        ...(helpers
          .getState()
          .projects?.filter((project) => project.id !== id) ?? []),
        project
      ]);

      return project;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      actions.setIsLoadingProject(null);
    }
  })
};

export default projectState;
