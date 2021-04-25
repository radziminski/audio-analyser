import { Controller, Get, Body, Param, Delete, Patch } from '@nestjs/common';

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
  async removeUser(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
