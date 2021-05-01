import { IsString } from 'class-validator';

export class AddProjectFileDto {
  @IsString()
  projectId: number;
}
