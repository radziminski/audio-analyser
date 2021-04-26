import { DB_TABLES } from '../../constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: DB_TABLES.ProjectFile })
export class ProjectUser {
  @Column()
  @PrimaryColumn()
  id: number;

  @Column({ name: 'file_id' })
  fileId: string;

  @Column({ name: 'project_id' })
  projectId: string;
}
