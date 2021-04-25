import { RequestWithUser } from './../auth/types/index';
import {
  Body,
  Request,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Res,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Response } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
// import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';

@Controller('user-profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @Get()
  async getAll(): Promise<UserProfile[]> {
    const users = await this.userProfileService.findAll();

    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMine(@Request() req: RequestWithUser) {
    const profile = await this.userProfileService.findOneByEmail(
      req.user.email,
    );

    if (!profile) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with email '${req.user.email}' does not have a profile.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return profile;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const user = await this.userProfileService.findOne(id);

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with id '${id}' does not exist.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  @Patch()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Res() res: Response,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    //TODO: Implement updatating user profile
  }
}
