import { ProjectFile } from './../../project/entities/project-file.entity';
import { DB_TABLES } from './../../constants';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity({ name: DB_TABLES.File })
export class File {
  @Column()
  @PrimaryColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column()
  length: number;

  @Column()
  size: number;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column()
  encoding: string;

  @OneToMany(() => ProjectFile, (projectFile) => projectFile.fileId)
  projectFiles: ProjectFile[];
}
