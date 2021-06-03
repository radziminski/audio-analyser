import { ProjectWithUsersAndFilesDto } from './../dtos/project/project-dto';
import { API_ROUTES } from './../constants/api-routes';
import RequestService from './RequestService';
import { CreateProjectDto } from '~/dtos/project/create-project-dto';

export class ProjectService {
  async fetchMyProjects(): Promise<ProjectWithUsersAndFilesDto[]> {
    const response = await RequestService.client.get(API_ROUTES.PROJECT);

    return response.data;
  }

  async fetchProject(id: number): Promise<ProjectWithUsersAndFilesDto> {
    const response = await RequestService.client.get(
      API_ROUTES.PROJECT_SINGLE.replace(':id', id.toString())
    );

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

  async deleteProject(id: number): Promise<void> {
    await RequestService.client.delete(
      API_ROUTES.PROJECT_SINGLE.replace(':id', id.toString())
    );
  }

  async uploadProjectFile(
    id: number,
    file: File,
    name?: string
  ): Promise<ProjectWithUsersAndFilesDto> {
    const data = new FormData();
    data.append('audio', file);

    if (name) data.append('name', name);

    const response = await RequestService.client.post(
      API_ROUTES.PROJECT_UPLOAD_FILE.replace(':id', id.toString()),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  }

  async deleteProjectFile(id: number, fileId: number): Promise<void> {
    await RequestService.client.delete(
      API_ROUTES.PROJECT_FILE_SINGLE.replace(':id', id.toString()).replace(
        ':fileId',
        fileId.toString()
      )
    );
  }
}

const userService = new ProjectService();
export default userService;
