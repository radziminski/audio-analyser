import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserRole } from '../common/types';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(user: { email: string; password: string; role?: string }) {
    return this.userRepository.save({
      ...user,
      role: user.role ?? UserRole.User,
    });
  }

  async createWithProfile(
    user: {
      email: string;
      password: string;
      role?: string;
    },
    profile: {
      firstName: string;
      lastName: string;
    },
  ) {
    const userProfile = new Profile();
    userProfile.firstName = profile.firstName;
    userProfile.lastName = profile.lastName;

    return this.userRepository.save({
      ...user,
      role: user.role ?? UserRole.User,
      profile: userProfile,
    });
  }

  async findOne(email: string) {
    return this.userRepository.findOne({
      relations: ['profile'],
      where: { email },
    });
  }

  async updateOne(email: string, newUser: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
    if (!user) throw new BadRequestException({ message: 'User not found' });

    return this.userRepository.save({
      ...user,
      profile: { firstName: newUser.first_name, lastName: newUser.last_name },
    });
  }

  async updatePassword(email: string, newUser: { password: string }) {
    return this.userRepository.update(email, { password: newUser.password });
  }

  async removeByEmail(email: string) {
    return this.userRepository.delete({ email });
  }

  // ANY USER

  async findAll() {
    return this.userRepository.find();
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
