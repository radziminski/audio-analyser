import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findOne(email);

    return user && user.password === password;
  }

  async login(data: LoginDto) {
    const payload = { email: data.email, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
