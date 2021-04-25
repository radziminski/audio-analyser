import { RequestWithUser } from './../auth/types/index';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Patch(':email')
  updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEmail(email, updateUserDto);
  }

  @Delete(':email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('email') email: string) {
    await this.userService.remove(email);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateEmail(req.user.email, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(@Request() req: RequestWithUser) {
    await this.userService.remove(req.user.email);
    return;
  }
}
