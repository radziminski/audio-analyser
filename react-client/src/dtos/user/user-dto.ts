export interface ProfileDto {
  id: number;
  firstName: string;
  lasName: string;
}

export interface UserDto {
  id: number;
  email: string;
  roles: string[];
  profile: ProfileDto;
}
