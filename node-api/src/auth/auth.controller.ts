import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestWithUser } from './types/index';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  BadRequestException,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { UserProfileService } from '../user-profile/user-profile.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestWithUser) {
    return this.authService.getToken(req.user.email);
  }

  @UseGuards(LocalAuthGuard, JwtAuthGuard)
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Request() req: RequestWithUser,
    @Body() body: ChangePasswordDto,
  ) {
    await this.userService.updatePassword(req.user.email, {
      password: body.new_password,
    });

    return {
      message: 'Password changed.',
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.findOne(registerDto.email);
    if (user)
      throw new BadRequestException({
        error: 'The user with given email already exists.',
      });

    const {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    } = registerDto;

    try {
      await this.authService.createUser({
        email,
        password,
      });

      const createdUserProfile = await this.userProfileService.create({
        email,
        firstName,
        lastName,
      });

      return {
        id: createdUserProfile.id,
        email: createdUserProfile.email,
        first_name: createdUserProfile.firstName,
        last_name: createdUserProfile.lastName,
      };
    } catch (error) {
      throw new BadRequestException({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error,
      });
    }
  }
}
