import { DB_TABLES } from './../../constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: DB_TABLES.ProjectUser })
export class ProjectUser {
  @Column()
  @PrimaryColumn()
  id: number;

  @Column({ name: 'user_profile_id' })
  userProfileId: string;

  @Column({ name: 'project_id' })
  projectId: string;
}
