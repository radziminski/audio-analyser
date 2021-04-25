import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserProfileDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}
