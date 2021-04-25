import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginCredentials } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginCredentials): Promise<boolean> {
    const { email, password } = credentials;
    const foundUser = await this.usersService.findOne(email);

    return foundUser && foundUser.password === password;
  }

  async getToken(email: string) {
    const payload = { email: email, sub: 1 };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
