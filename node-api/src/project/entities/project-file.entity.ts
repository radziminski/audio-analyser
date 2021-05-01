import { Project } from './project.entity';
import { DB_TABLES } from '../../constants';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';

@Entity({ name: DB_TABLES.ProjectFile })
export class ProjectFile {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => File, (file) => file.projectFiles)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @ManyToOne(() => Project, (project) => project.files)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
