import { ProjectUser } from './../../project/entities/project-user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { DB_TABLES } from '../../constants';

@Entity({ name: DB_TABLES.UserProfile })
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User, (user) => user.email)
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  role: string;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.userProfileId)
  projectUsers: ProjectUser[];
}
