import { ProjectUser } from './../../project/entities/project-user.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';

import { DB_TABLES } from '../../constants';

@Entity({ name: DB_TABLES.User })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // @Column()
  // role: string;

  // @OneToOne(() => UserProfile, { cascade: true })
  // @JoinColumn()
  // profile: UserProfile;

  // @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
  // projectUsers: ProjectUser[];
}
