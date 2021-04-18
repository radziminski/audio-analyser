import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserProfileDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;
}
