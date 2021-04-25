import { EncryptionService } from './../encryption/encryption.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { LoginCredentials } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginCredentials): Promise<boolean> {
    const { email, password } = credentials;
    const foundUser = await this.userService.findOne(email);

    const passwordMatch = this.encryptionService.compare(
      password,
      foundUser.password,
    );

    return foundUser && passwordMatch;
  }

  async getToken(email: string) {
    const payload = { email: email, sub: 1 };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(user: { email: string; password: string }) {
    const { email, password } = user;
    const hashedPassword = await this.encryptionService.hash(password);

    return this.userService.create({
      email,
      password: hashedPassword,
    });
  }
}
