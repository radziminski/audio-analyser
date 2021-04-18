import { CreateUserProfileDto } from './dto/create-user-profile.dto';
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

  findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  findOne(id: string): Promise<UserProfile> {
    return this.userProfileRepository.findOne(id);
  }

  create(user: CreateUserProfileDto): Promise<UserProfile> {
    return this.userProfileRepository.save({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    });
  }

  async remove(id: string): Promise<void> {
    await this.userProfileRepository.delete(id);
  }
}
