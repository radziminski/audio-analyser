import { CreateUserProfileDto } from './dto/create-user-profile.dto';
// import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { UserProfileService } from './user-profile.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
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

  @Get(':id')
  async getOne(@Res() res: Response, @Param('id') id: string) {
    const user = await this.userProfileService.findOne(id);

    if (!user)
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: `User with id '${id}' does not exist.`,
      });

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
