import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register() {
    // TODO: Registration
  }
}
