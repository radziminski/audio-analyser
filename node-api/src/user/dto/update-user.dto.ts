import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;
}
