import { UserRole } from './../common/types/index';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';

import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  async findOne(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: {
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<UserProfile> {
    return this.userProfileRepository.save({ ...user, role: UserRole.User });
  }

  async remove(email: string): Promise<void> {
    await this.userProfileRepository.delete({ email });
  }
}
