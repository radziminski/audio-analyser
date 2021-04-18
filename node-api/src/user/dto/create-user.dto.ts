import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @MinLength(8, {
    message: 'Password should be at least 8 characters long',
  })
  @MaxLength(50, {
    message: 'Password should be maximum 50 characters long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one lowercase and uppercase letter',
  })
  password: string;
}
