import { Profile } from './profile.entity';
import { ProjectUser } from './../../project/entities/project-user.entity';
import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'user_auth' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.user, {
    cascade: true,
  })
  projectUsers: ProjectUser[];
}
