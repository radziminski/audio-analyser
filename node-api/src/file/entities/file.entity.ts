import { DB_TABLES } from './../../constants';
import { Entity, Column, PrimaryColumn } from 'typeorm';

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
  createdAt: number;

  @Column()
  length: number;

  @Column()
  size: number;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column()
  encoding: string;
}
