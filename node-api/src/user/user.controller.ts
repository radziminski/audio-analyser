import { User } from './user.entity';
import { UserService } from './user.service';
import { Controller, Get, Inject } from '@nestjs/common';
import { Logger } from 'winston';

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
    this.logger.info(users);
    this.logger.error('test');
    this.logger.debug('debigtest');
    return users;
  }
}
