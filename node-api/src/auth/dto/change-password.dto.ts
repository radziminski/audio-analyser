import { Matches } from 'class-validator';

export class ChangePasswordDto {
  email: string;
  password: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should contain at least one lowercase and uppercase letter',
  })
  new_password: string;
}
