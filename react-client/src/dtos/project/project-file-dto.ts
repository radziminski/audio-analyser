import { FileDto } from 'dtos/file/file-dto';

export interface ProjectFileDto {
  id: number;
  fileId: number;
  projectId: number;
  file: FileDto;
}
