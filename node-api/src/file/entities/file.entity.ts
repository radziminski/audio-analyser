import { ProjectFile } from './../../project/entities/project-file.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ nullable: true })
  length: number;

  @Column({ nullable: true })
  size: number;

  @Column({ name: 'mime_type', nullable: true })
  mimeType: string;

  @Column({ nullable: true })
  encoding: string;

  @OneToMany(() => ProjectFile, (projectFile) => projectFile.file)
  projectFiles: ProjectFile[];
}
