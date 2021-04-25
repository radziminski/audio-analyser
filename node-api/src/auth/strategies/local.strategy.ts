import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Request, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';

export type RequestWithUser = Request & {
  user: {
    email: string;
  };
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<{ email: string }> {
    const validated = await this.authService.validateUser({ email, password });

    if (!validated) {
      throw new UnauthorizedException({
        status: 401,
        error: 'Password incorrect or User does not exist.',
      });
    }

    return { email };
  }
}
