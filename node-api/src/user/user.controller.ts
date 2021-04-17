import { User } from './user.entity';
import { UserService } from './user.service';
import {
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

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @Get()
  async getAll(): Promise<User[]> {
    const users = await this.userService.findAll();

    return users;
  }

  @Get(':id')
  async getOne(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<User | {}> {
    const user = await this.userService.findOne(id);

    if (!user)
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: `User with id '${id}' does not exist.`,
      });

    return res.status(HttpStatus.OK).json(user);
  }
}
