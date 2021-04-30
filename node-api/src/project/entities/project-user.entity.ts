import { Project } from './project.entity';
import { DB_TABLES } from './../../constants';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { UserProfile } from '../../user-profile/entities/user-profile.entity';

@Entity({ name: DB_TABLES.ProjectUser })
export class ProjectUser {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile, (user) => user.projectUsers)
  @JoinColumn({ name: 'user_profile_id' })
  userProfileId: number;

  @ManyToOne(() => Project, (project) => project.users)
  @JoinColumn({ name: 'project_id' })
  projectId: number;
}
