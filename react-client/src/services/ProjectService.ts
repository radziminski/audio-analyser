import { ProjectWithUsersAndFilesDto } from './../dtos/project/project-dto';
import { API_ROUTES } from './../constants/api-routes';
import RequestService from './RequestService';
import { CreateProjectDto } from 'dtos/project/create-project-dto';

export class ProjectService {
  async fetchMyProjects(): Promise<ProjectWithUsersAndFilesDto[]> {
    const response = await RequestService.client.get(API_ROUTES.PROJECT);

    return response.data;
  }

  async createProject(
    createProjectDto: CreateProjectDto
  ): Promise<ProjectWithUsersAndFilesDto> {
    const response = await RequestService.client.post(
      API_ROUTES.PROJECT,
      createProjectDto
    );

    return response.data.project;
  }
}

const userService = new ProjectService();
export default userService;
