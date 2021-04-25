import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: { email: string; password: string }) {
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string) {
    return this.userRepository.findOne(email);
  }

  async updateEmail(currentEmail: string, newUser: { email: string }) {
    return this.userRepository.update(currentEmail, { email: newUser.email });
  }
  async updatePassword(email: string, newUser: { password: string }) {
    return this.userRepository.update(email, { password: newUser.password });
  }

  async remove(email: string) {
    return this.userRepository.delete(email);
  }
}
