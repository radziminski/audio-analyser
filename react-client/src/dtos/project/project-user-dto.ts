import { UserDto } from '~/dtos/user/user-dto';

export interface ProjectUserDto {
  id: number;
  userId: number;
  projectId: number;
  user: UserDto;
}
