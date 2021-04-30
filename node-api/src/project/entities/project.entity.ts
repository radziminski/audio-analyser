import { ProjectFile } from './project-file.entity';
import { ProjectUser } from './project-user.entity';
import { DB_TABLES } from './../../constants';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: DB_TABLES.Project })
export class Project {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'edited_at' })
  editedAt: string;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.userProfileId)
  users: ProjectUser[];

  @OneToMany(() => ProjectFile, (projectFile) => projectFile.fileId)
  files: ProjectFile[];
}
