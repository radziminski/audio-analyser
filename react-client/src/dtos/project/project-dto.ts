import { ProjectUserDto } from './project-user-dto';
import { ProjectFileDto } from './project-file-dto';

export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  editedAt: string;
}

export interface ProjectWithUsersAndFilesDto extends ProjectDto {
  users: ProjectUserDto[];
  files: ProjectFileDto[];
}
