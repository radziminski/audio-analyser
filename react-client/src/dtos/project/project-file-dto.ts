import { FileDto } from 'dtos/file/file-dto';

export interface ProjectFileDto {
  id: number;
  userId: number;
  projectId: number;
  user: FileDto;
}
