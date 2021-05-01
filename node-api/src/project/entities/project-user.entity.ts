import { User } from './../../user/entities/user.entity';
import { Project } from './project.entity';
import { DB_TABLES } from './../../constants';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: DB_TABLES.ProjectUser })
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, (user) => user.projectUsers)
  // user: User;

  // @ManyToOne(() => Project, (project) => project.users)
  // project: Project;
}
