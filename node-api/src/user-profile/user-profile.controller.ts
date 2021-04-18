import { logObject } from './../logger/utils';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
// import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';
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
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Logger } from 'winston';
import { Response } from 'express';

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
  async getMine(@Request() req) {
    this.logger.error('user');
    logObject(this.logger, 'user', req.user);
    const profile = await this.userProfileService.findOneByEmail(
      req.user.email,
    );

    if (!profile)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with email '${req.user.email}' does not have a profile.`,
        },
        HttpStatus.BAD_REQUEST,
      );

    return profile;
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const user = await this.userProfileService.findOne(id);

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with id '${id}' does not exist.`,
        },
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Res() res: Response,
    @Body() createUserDto: CreateUserProfileDto,
  ) {
    try {
      const userProfile = await this.userProfileService.create(createUserDto);

      return res.status(HttpStatus.CREATED).json({ userProfile });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
  }
}
