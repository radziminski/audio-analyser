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
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { UserProfileService } from 'src/user-profile/user-profile.service';
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
  async login(@Request() req: RequestWithUser) {
    return this.authService.getToken(req.user.email);
  }

  @UseGuards(LocalAuthGuard)
  @UseGuards(JwtAuthGuard)
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

    try {
      await this.userService.create({
        email: registerDto.email,
        password: registerDto.password,
      });

      const createdUserProfile = await this.userProfileService.create({
        email: registerDto.email,
        firstName: registerDto.first_name,
        lastName: registerDto.last_name,
      });

      return {
        id: createdUserProfile.id,
        email: createdUserProfile.email,
        first_name: createdUserProfile.firstName,
        last_name: createdUserProfile.lastName,
      };
    } catch (error) {
      throw new BadRequestException({
        error,
      });
    }
  }
}
