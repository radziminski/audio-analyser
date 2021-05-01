import { ProjectFile } from './../../project/entities/project-file.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
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

  @OneToMany(() => ProjectFile, (projectFile) => projectFile.file)
  projectFiles: ProjectFile[];
}
